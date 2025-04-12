import { NextResponse } from "next/server";
import { getVideoId } from "@/lib/youtube";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: "Missing videoId parameter" },
        { status: 400 }
      );
    }

    try {
      // Fetch video details from YouTube's oEmbed API
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const oembedResponse = await fetch(oembedUrl);
      
      if (!oembedResponse.ok) {
        throw new Error("Failed to fetch video details");
      }
      
      const oembedData = await oembedResponse.json();
      
      // Extract channel information
      // Note: oEmbed doesn't provide channel ID directly, so we're just getting the author name
      return NextResponse.json({
        channelTitle: oembedData.author_name || "YouTube Creator",
        // We don't have the channel ID from oEmbed, so we'd need to use YouTube API
        // For now, we'll return an empty string
        channelId: ""
      });
    } catch (error) {
      console.error("Error fetching video details:", error);
      return NextResponse.json(
        { 
          channelTitle: "YouTube Creator",
          channelId: ""
        }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
