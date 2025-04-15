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

// Add fetch for YouTube Data API title as a fallback
async function fetchYouTubeTitleWithAPI(videoId: string): Promise<string> {
  try {
    // Use the API key from environment variables if available
    const apiKey = process.env.YOUTUBE_API_KEY || (typeof process !== 'undefined' && process.env && process.env.YOUTUBE_API_KEY);
    if (!apiKey) return "";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
    const res = await fetch(apiUrl);
    if (!res.ok) return "";
    const data = await res.json();
    return data.items?.[0]?.snippet?.title || "";
  } catch (err) {
    console.error("YouTube Data API fallback failed:", err);
    return "";
  }
}

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

    // Extract title from basic_info with more robust approach
    let title = "";

    try {
      // First try to get title from basic_info
      if (info.basic_info?.title) {
        title = info.basic_info.title;
        console.log("Title from basic_info:", title);
      } else {
        const infoAny = info as any;
        if (typeof infoAny.title === "string") {
          title = infoAny.title;
          console.log("Title from info.title:", title);
        } else if (infoAny.page?.title) {
          title = infoAny.page.title;
          console.log("Title from info.page.title:", title);
        } else if (infoAny.primary_info?.title) {
          title = infoAny.primary_info.title;
          console.log("Title from info.primary_info.title:", title);
        } else if (infoAny.video_details?.title) {
          title = infoAny.video_details.title;
          console.log("Title from info.video_details.title:", title);
        } else if (infoAny.metadata?.title) {
          title = infoAny.metadata.title;
          console.log("Title from info.metadata.title:", title);
        }
      }
      if (!title || title.trim() === "") {
        // Try to fetch from YouTube Data API as fallback
        title = await fetchYouTubeTitleWithAPI(videoId);
        if (title) {
          console.log("Title from YouTube Data API fallback:", title);
        } else {
          title = `YouTube Video (${videoId})`;
          console.log("Title was empty, using default with videoId:", title);
        }
      }
    } catch (error) {
      console.error("Error extracting title:", error);
      // Try to fetch from YouTube Data API as fallback
      title = await fetchYouTubeTitleWithAPI(videoId);
      if (title) {
        console.log("Title from YouTube Data API fallback:", title);
      } else {
        title = `YouTube Video (${videoId})`;
        console.log("Error occurred, using default title with videoId:", title);
      }
    }

    // Log the final title for debugging
    console.log("Final video title from YouTube API:", title);

    // Get the transcript data
    const transcriptData = await info.getTranscript();

    // Get the language of the transcript
    let language = "en"; // Default to English

    try {
      const transcriptObj = transcriptData?.transcript as any;
      if (transcriptObj?.header?.language_menu?.items?.length > 0) {
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

    const videoDuration = info.basic_info?.duration || 0;
    const segments = transcriptData.transcript.content.body.initial_segments
      .filter((segment: any) => segment.snippet?.text)
      .map((segment: any) => segment.snippet.text);
    const totalTextLength = segments.reduce(
      (sum: number, text: string) => sum + text.length,
      0
    );
    let currentOffset = 0;
    const transcript = segments.map((text: string, index: number) => {
      const segmentProportion = text.length / totalTextLength;
      const duration = Math.round(videoDuration * segmentProportion * 1000);
      const offset = currentOffset;
      currentOffset += duration;
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
