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

export async function POST(request: Request) {
  try {
    // Log the request content type
    console.log("Request content type:", request.headers.get("content-type"));

    // Safely parse the request body
    let requestBody;
    try {
      requestBody = await request.json();
      console.log("Request body parsed successfully:", requestBody);
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { url } = requestBody;

    if (!url) {
      console.error("Missing URL in request body");
      return NextResponse.json(
        { error: "Missing URL in request" },
        { status: 400 }
      );
    }

    const videoId = getVideoId(url);

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Fetch video details and transcript in parallel
    const [videoData, transcriptResult] = await Promise.allSettled([
      (async () => {
        const youtube = google.youtube("v3");
        const videoResponse = await youtube.videos.list({
          key: process.env.YOUTUBE_API_KEY,
          part: ["snippet", "statistics", "contentDetails"],
          id: [videoId],
        });
        return videoResponse.data.items?.[0];
      })(),
      (async () => {
        try {
          return await fetchTranscript(url);
        } catch (error) {
          console.error("Transcript error:", error);
          return null;
        }
      })(),
    ]);

    if (videoData.status !== "fulfilled" || !videoData.value) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const video = videoData.value;
    // Initialize transcript with explicit type to avoid implicit any
    let transcript: TranscriptSegment[] = [];
    let hasTranscript = false;
    let title = video.snippet?.title || "";
    let detectedLanguage = "en";

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

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process video" },
      { status: 500 }
    );
  }
}
