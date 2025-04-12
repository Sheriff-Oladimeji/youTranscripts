import { NextResponse } from "next/server";
import { fetchTranscript } from "@/lib/transcript";
import { getVideoId } from "@/lib/youtube";

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

    try {
      const transcriptData = await fetchTranscript(url);

      return NextResponse.json({
        transcript: transcriptData.transcript,
        metadata: {
          id: videoId,
          videoId: videoId,
          title: transcriptData.title,
          language: transcriptData.language,
          hasTranscript: true,
        },
      });
    } catch (error) {
      console.error("Transcript error:", error);
      return NextResponse.json(
        { error: "No transcript available for this video" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process video" },
      { status: 500 }
    );
  }
}
