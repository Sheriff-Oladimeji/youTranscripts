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

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const videoId = getVideoId(url);

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Initialize YouTube API
    const youtube = google.youtube("v3");

    // Get video details
    const videoResponse = await youtube.videos.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ["snippet", "statistics", "contentDetails"],
      id: [videoId],
    });

    const videoData = videoResponse.data.items?.[0];

    if (!videoData) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    let transcript: TranscriptSegment[] = [];
    let hasTranscript = false;
    let title = videoData.snippet?.title || "";

    try {
      const transcriptData = await fetchTranscript(url);
      hasTranscript = true;
      transcript = transcriptData.transcript;
      // Use the title from transcript if available
      if (transcriptData.title) {
        title = transcriptData.title;
      }
    } catch (error) {
      console.error("Transcript error:", error);
      hasTranscript = false;
    }

    const metadata: VideoMetadata = {
      id: videoId,
      videoId: videoId,
      title: title,
      channelTitle: videoData.snippet?.channelTitle || "",
      publishDate: videoData.snippet?.publishedAt || "",
      views: videoData.statistics?.viewCount || "0",
      likes: videoData.statistics?.likeCount || "0",
      duration: videoData.contentDetails?.duration || "",
      description: videoData.snippet?.description || "",
      hasTranscript,
    };

    return NextResponse.json({
      transcript,
      metadata,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process video" },
      { status: 500 }
    );
  }
}
