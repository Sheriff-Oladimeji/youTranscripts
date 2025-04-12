import { Innertube } from "youtubei.js/web";

interface TranscriptItem {
  text: string;
  duration: number;
  offset: number;
}

export const getYouTubeVideoId = (input: string): string => {
  const regExp: RegExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:.*[?&]v=|(?:v|e(?:mbed)?)\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match: RegExpMatchArray | null = input.match(regExp);

  return match && match[1] ? match[1] : input;
};

export const fetchTranscript = async (
  url: string
): Promise<{ title: string; transcript: TranscriptItem[] }> => {
  const videoId = getYouTubeVideoId(url);

  const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: false,
    enable_safety_mode: false,
  });

  try {
    const info = await youtube.getInfo(videoId);
    const title = info.basic_info?.title || "";
    const transcriptData = await info.getTranscript();

    if (!transcriptData?.transcript?.content?.body?.initial_segments) {
      throw new Error("No transcript available for this video");
    }

    // Get video duration in seconds
    const videoDuration = info.basic_info?.duration || 0;

    // Extract segments with text
    const segments = transcriptData.transcript.content.body.initial_segments
      .filter((segment: any) => segment.snippet?.text)
      .map((segment: any) => segment.snippet.text);

    // Calculate approximate timestamps based on text length and video duration
    let totalTextLength = segments.reduce(
      (sum: number, text: string) => sum + text.length,
      0
    );
    let currentOffset = 0;

    const transcript = segments.map((text: string, index: number) => {
      // Calculate segment duration based on text length proportion
      const segmentProportion = text.length / totalTextLength;
      const duration = Math.round(videoDuration * segmentProportion * 1000); // Convert to ms
      const offset = currentOffset;

      // Update offset for next segment
      currentOffset += duration;

      // For the last segment, ensure it ends at video duration
      if (index === segments.length - 1) {
        return {
          text,
          duration: Math.max(0, videoDuration * 1000 - offset),
          offset,
        };
      }

      return {
        text,
        duration,
        offset,
      };
    });

    return { title, transcript };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};
