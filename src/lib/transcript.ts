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
): Promise<{
  title: string;
  transcript: TranscriptItem[];
  language: string;
}> => {
  const videoId = getYouTubeVideoId(url);

  const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: false,
    enable_safety_mode: false,
  });

  try {
    const info = await youtube.getInfo(videoId);

    // Extract title from basic_info
    let title = "";

    if (info.basic_info?.title) {
      title = info.basic_info.title;
    } else {
      // Use type assertion to try to access other properties that might contain the title
      const infoAny = info as any;

      if (typeof infoAny.title === "string") {
        title = infoAny.title;
      } else if (infoAny.page?.title) {
        title = infoAny.page.title;
      } else {
        title = "YouTube Video";
      }
    }

    console.log("Video title from YouTube API:", title);
    // Get the transcript data
    const transcriptData = await info.getTranscript();

    // Get the language of the transcript
    let language = "en"; // Default to English

    try {
      // Try to detect language from transcript data
      // Use type assertion to access properties that might not be in the type definition
      const transcriptObj = transcriptData?.transcript as any;

      if (transcriptObj?.header?.language_menu?.items?.length > 0) {
        // Find the selected language
        const selectedLanguage = transcriptObj.header.language_menu.items.find(
          (item: any) => item.is_selected
        );

        if (selectedLanguage?.language_code) {
          language = selectedLanguage.language_code;
        }
      }
    } catch (e) {
      console.warn("Could not detect transcript language:", e);
    }

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
    const totalTextLength = segments.reduce(
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

    // Ensure title is included in the response
    console.log("Returning transcript data with title:", title);
    return {
      title,
      transcript,
      language,
    };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};
