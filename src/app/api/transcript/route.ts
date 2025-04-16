import { NextResponse } from "next/server";
import { google } from "googleapis";
import { fetchTranscript } from "@/lib/transcript";
import { getVideoId } from "@/lib/youtube";

interface TranscriptSegment {
  text: string;
  offset: number;
  duration: number;
}

interface VideoMetadata {
  id: string;
  videoId: string;
  title: string;
  channelTitle: string;
  publishDate: string;
  views: string;
  likes: string;
  duration: string;
  description: string;
  hasTranscript: boolean;
  language?: string;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Define the cache response type.
interface CacheResponse {
  transcript: TranscriptSegment[];
  metadata: VideoMetadata;
}

// Simple in-memory cache for API responses.
const apiCache: Record<string, { timestamp: number; data: CacheResponse }> = {};
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const videoId = getVideoId(url);

    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // Check cache first.
    const now = Date.now();
    if (apiCache[videoId] && now - apiCache[videoId].timestamp < CACHE_EXPIRY) {
      console.log("API: Using cached data for", videoId);
      return NextResponse.json(apiCache[videoId].data);
    }

    // Run YouTube API fetch and transcript fetch in parallel.
    const [videoData, transcriptResult] = await Promise.allSettled([
      // Fetch video details via the YouTube API.
      (async () => {
        const youtube = google.youtube("v3");
        const videoResponse = await youtube.videos.list({
          key: process.env.YOUTUBE_API_KEY,
          part: ["snippet", "statistics", "contentDetails"],
          id: [videoId],
        });
        return videoResponse.data.items?.[0];
      })(),

      // Fetch the transcript.
      (async () => {
        try {
          return await fetchTranscript(url);
        } catch (error) {
          console.error("Transcript error:", error);
          return null;
        }
      })(),
    ]);

    // If video data is not found, return an error.
    if (videoData.status !== "fulfilled" || !videoData.value) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const video = videoData.value;
    let transcript: TranscriptSegment[] = [];
    let hasTranscript = false;
    let title = video.snippet?.title || "";
    let detectedLanguage = "en";

    // Process transcript result.
    if (transcriptResult.status === "fulfilled" && transcriptResult.value) {
      const transcriptData = transcriptResult.value;
      hasTranscript = true;
      transcript = transcriptData.transcript;
      if (transcriptData.title) {
        title = transcriptData.title;
      }
      if (transcriptData.language) {
        detectedLanguage = transcriptData.language;
      }
    }

    const metadata: VideoMetadata = {
      id: videoId,
      videoId: videoId,
      title: title,
      channelTitle: video.snippet?.channelTitle || "",
      publishDate: video.snippet?.publishedAt || "",
      views: video.statistics?.viewCount || "0",
      likes: video.statistics?.likeCount || "0",
      duration: video.contentDetails?.duration || "",
      description: video.snippet?.description || "",
      hasTranscript,
      language: detectedLanguage,
    };

    const responseData = { transcript, metadata };

    // Update the cache.
    apiCache[videoId] = {
      timestamp: now,
      data: responseData,
    };

    // Optionally limit cache size.
    const cacheKeys = Object.keys(apiCache);
    if (cacheKeys.length > 100) {
      const oldestKeys = cacheKeys
        .map((key) => ({ key, timestamp: apiCache[key].timestamp }))
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, 20)
        .map((item) => item.key);
      oldestKeys.forEach((key) => delete apiCache[key]);
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 });
  }
}
