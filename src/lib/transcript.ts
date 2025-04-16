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

// Cache for Innertube instances to avoid recreating them
let youtubeInstance: any = null;

// Helper function to check for language-specific character sets
function detectLanguageFromCharacters(text: string): string | null {
  // Define character ranges for different languages
  const charRanges = {
    zh: /[\u4E00-\u9FFF]/g, // Chinese
    ja: /[\u3040-\u309F\u30A0-\u30FF]/g, // Japanese Hiragana and Katakana
    ko: /[\uAC00-\uD7AF\u1100-\u11FF]/g, // Korean Hangul
    ru: /[\u0400-\u04FF]/g, // Cyrillic (Russian)
    ar: /[\u0600-\u06FF]/g, // Arabic
    hi: /[\u0900-\u097F]/g, // Devanagari (Hindi)
    th: /[\u0E00-\u0E7F]/g, // Thai
  };

  // Count characters in each range
  const counts: Record<string, number> = {};

  for (const [lang, regex] of Object.entries(charRanges)) {
    const matches = text.match(regex);
    counts[lang] = matches ? matches.length : 0;
  }

  // Find the language with the most character matches
  let bestLang = null;
  let bestCount = 0;

  for (const [lang, count] of Object.entries(counts)) {
    if (count > bestCount && count > 5) {
      // Require at least 5 characters to be confident
      bestCount = count;
      bestLang = lang;
    }
  }

  console.log("Character-based language detection counts:", counts);
  return bestLang;
}

// Simple language detection based on common words
function detectLanguageFromText(text: string): string {
  // First try character-based detection for non-Latin scripts
  const charBasedLang = detectLanguageFromCharacters(text);
  if (charBasedLang) {
    console.log(`Detected language ${charBasedLang} based on character sets`);
    return charBasedLang;
  }

  // Fall back to word-based detection for Latin-script languages
  // Convert to lowercase for better matching
  const lowerText = text.toLowerCase();

  // Count words of different languages
  const langSignatures = {
    en: ["the", "and", "is", "in", "to", "it", "that", "of", "you", "for"],
    es: ["el", "la", "los", "las", "y", "que", "es", "en", "de", "por"],
    fr: ["le", "la", "les", "un", "une", "des", "et", "est", "que", "dans"],
    de: ["der", "die", "das", "und", "ist", "in", "zu", "den", "für", "mit"],
    it: ["il", "la", "i", "le", "e", "che", "di", "in", "per", "un"],
    pt: ["o", "a", "os", "as", "e", "que", "em", "para", "por", "com"],
    ru: ["и", "в", "на", "с", "по", "не", "что", "это", "как", "от"],
    ja: ["です", "は", "を", "に", "が", "の", "た", "て", "で", "も"],
    zh: ["的", "是", "在", "了", "和", "我", "有", "这", "不", "你"],
    ar: ["في", "من", "على", "هذا", "أن", "مع", "لا", "هو", "أو", "بشكل"],
    hi: ["के", "में", "है", "का", "और", "से", "को", "नहीं", "कि", "पर"],
    ko: ["이", "는", "그", "에", "서", "있", "없", "하", "지", "아"],
    tr: ["bir", "ve", "bu", "için", "o", "de", "ne", "var", "daha", "kadar"],
    nl: ["de", "het", "een", "in", "van", "en", "is", "op", "dat", "te"],
    sv: ["och", "att", "det", "i", "en", "jag", "på", "är", "för", "som"],
    pl: ["i", "w", "na", "z", "do", "to", "się", "nie", "jest", "o"],
  };

  // Count occurrences of signature words for each language
  const scores: Record<string, number> = {};

  for (const [lang, words] of Object.entries(langSignatures)) {
    scores[lang] = 0;
    for (const word of words) {
      // Count how many times this word appears
      const regex = new RegExp(`\\b${word}\\b`, "g");
      const matches = lowerText.match(regex);
      if (matches) {
        scores[lang] += matches.length;
      }
    }
  }

  // Find language with highest score
  let bestLang = "en";
  let bestScore = 0;

  for (const [lang, score] of Object.entries(scores)) {
    console.log(`Language ${lang} score: ${score}`);
    if (score > bestScore) {
      bestScore = score;
      bestLang = lang;
    }
  }

  return bestScore > 0 ? bestLang : "en";
}

export const fetchTranscript = async (
  url: string
): Promise<{
  title: string;
  transcript: TranscriptItem[];
  language: string;
}> => {
  const videoId = getYouTubeVideoId(url);

  // Create or reuse the Innertube instance
  if (!youtubeInstance) {
    try {
      console.time("Innertube creation");
      youtubeInstance = await Innertube.create({
        lang: "en", // Use "en" for better compatibility
        location: "US",
        retrieve_player: false,
        enable_safety_mode: false,
      });
      console.timeEnd("Innertube creation");
    } catch (error) {
      console.error("Error creating Innertube instance:", error);
      throw new Error("Failed to initialize YouTube API");
    }
  }

  try {
    console.time("Transcript fetch");

    // Get video info
    console.log(`Fetching info for video ID: ${videoId}`);
    const info = await youtubeInstance.getInfo(videoId);
    if (!info) {
      throw new Error("Failed to get video information");
    }

    const title = info.basic_info?.title || "";
    console.log(`Video title: ${title}`);

    // Before getting the transcript, try to get all available transcripts
    console.log("Checking available transcripts...");
    let availableTranscripts;
    try {
      // This is speculative - check if this method exists in the API
      if (typeof info.getAvailableTranscripts === "function") {
        availableTranscripts = await info.getAvailableTranscripts();
        console.log("Available transcripts:", availableTranscripts);
      } else {
        console.log("getAvailableTranscripts method not available");
      }
    } catch (err) {
      console.log("Could not get available transcripts:", err);
    }

    // Try to get the transcript
    console.log("Fetching transcript...");
    let transcriptData;
    try {
      transcriptData = await info.getTranscript();
      if (!transcriptData) {
        throw new Error("Transcript data is null or undefined");
      }
    } catch (transcriptError) {
      console.error(
        "Error fetching transcript with primary method:",
        transcriptError
      );

      // Try alternative method
      try {
        console.log("Trying alternative transcript fetch method...");
        // Some videos might have transcripts in a different format or location
        // Try to get captions directly if available
        if (info.captions && typeof info.captions.get === "function") {
          const captionTracks = await info.captions.get();
          if (captionTracks && captionTracks.length > 0) {
            console.log(`Found ${captionTracks.length} caption tracks`);
            // Use the first caption track
            const firstTrack = captionTracks[0];
            const captionData = await firstTrack.fetch();

            if (
              captionData &&
              captionData.segments &&
              captionData.segments.length > 0
            ) {
              transcriptData = {
                transcript: {
                  segments: captionData.segments,
                  language: firstTrack.language_code || "en",
                },
              };
              console.log(
                `Successfully fetched ${captionData.segments.length} segments via alternative method`
              );
            } else {
              throw new Error("No caption segments found");
            }
          } else {
            throw new Error("No caption tracks found");
          }
        } else {
          throw new Error("Captions API not available");
        }
      } catch (alternativeError) {
        console.error(
          "Error with alternative transcript method:",
          alternativeError
        );
        throw new Error("No transcript available for this video");
      }
    }

    console.timeEnd("Transcript fetch");

    // Detailed logging of transcript data structure
    console.log(
      "Full transcript data structure:",
      JSON.stringify(transcriptData, null, 2)
    );

    // Try multiple approaches to detect language
    let detectedLanguage = "en"; // Default to English

    // Method 1: Try to get language from transcript header
    if (transcriptData?.transcript?.content?.header?.languageCode) {
      detectedLanguage = transcriptData.transcript.content.header.languageCode;
      console.log(
        "Language detected from header.languageCode:",
        detectedLanguage
      );
    } else if (transcriptData?.transcript?.content?.header?.language) {
      detectedLanguage = transcriptData.transcript.content.header.language;
      console.log("Language detected from header.language:", detectedLanguage);
    }

    // Method 2: Try to get language from available transcript list
    if (
      detectedLanguage === "en" &&
      transcriptData?.transcript_selector?.available_transcripts
    ) {
      // Get the first transcript in the list (usually the default/original one)
      const firstTranscript = Object.keys(
        transcriptData.transcript_selector.available_transcripts
      )[0];
      if (firstTranscript && firstTranscript !== "en") {
        detectedLanguage = firstTranscript;
        console.log(
          "Language detected from available_transcripts:",
          detectedLanguage
        );
      }
    }

    // Method 3: Extract language from segments if they contain language info
    if (
      detectedLanguage === "en" &&
      transcriptData?.transcript?.content?.body?.initial_segments?.[0]
    ) {
      const firstSegment =
        transcriptData.transcript.content.body.initial_segments[0];
      if (firstSegment.language) {
        detectedLanguage = firstSegment.language;
        console.log("Language detected from first segment:", detectedLanguage);
      }
    }

    // Method 4: Try to analyze the text content to identify language
    if (
      detectedLanguage === "en" &&
      transcriptData?.transcript?.content?.body?.initial_segments
    ) {
      // Get first few segments to analyze language
      const textSample = transcriptData.transcript.content.body.initial_segments
        .slice(0, 5)
        .filter((segment: any) => segment.snippet?.text)
        .map((segment: any) => segment.snippet.text)
        .join(" ");

      // Log the text sample for manual inspection
      console.log("Text sample for language detection:", textSample);
    }

    // Method 5: Use our custom language detection as a last resort
    if (
      detectedLanguage === "en" &&
      transcriptData?.transcript?.content?.body?.initial_segments
    ) {
      // Get a larger sample for better detection
      const textSample = transcriptData.transcript.content.body.initial_segments
        .slice(0, 20)
        .filter((segment: any) => segment.snippet?.text)
        .map((segment: any) => segment.snippet.text)
        .join(" ");

      if (textSample.length > 100) {
        // Only attempt if we have enough text
        const detectedLang = detectLanguageFromText(textSample);
        if (detectedLang !== "en") {
          detectedLanguage = detectedLang;
          console.log("Language detected by custom algorithm:", detectedLang);
        }
      }
    }

    // If we have available transcripts from earlier, use that information
    if (
      detectedLanguage === "en" &&
      availableTranscripts &&
      availableTranscripts.length > 0
    ) {
      if (
        availableTranscripts[0].language_code &&
        availableTranscripts[0].language_code !== "en"
      ) {
        detectedLanguage = availableTranscripts[0].language_code;
        console.log("Language from available transcripts:", detectedLanguage);
      }
    }

    // Check if we have valid transcript data
    if (
      !transcriptData?.transcript?.content?.body?.initial_segments ||
      transcriptData.transcript.content.body.initial_segments.length === 0
    ) {
      console.error("No valid transcript segments found in standard format");

      // Try alternative transcript formats
      if (
        transcriptData?.transcript?.segments &&
        transcriptData.transcript.segments.length > 0
      ) {
        console.log("Found alternative transcript format with segments");

        // Create a compatible format
        transcriptData.transcript.content = {
          body: {
            initial_segments: transcriptData.transcript.segments.map(
              (seg: any) => ({
                snippet: { text: seg.text || seg.content || "" },
              })
            ),
          },
        };

        console.log(
          `Converted ${transcriptData.transcript.content.body.initial_segments.length} segments`
        );
      }
      // Try another alternative format
      else if (transcriptData?.captions && transcriptData.captions.length > 0) {
        console.log("Found alternative transcript format with captions");

        // Create a compatible format from captions
        const captionSegments = [];
        for (const caption of transcriptData.captions) {
          if (caption.segments && caption.segments.length > 0) {
            captionSegments.push(
              ...caption.segments.map((seg: any) => ({
                snippet: { text: seg.text || seg.content || "" },
              }))
            );
          }
        }

        if (captionSegments.length > 0) {
          transcriptData.transcript = transcriptData.transcript || {};
          transcriptData.transcript.content = {
            body: {
              initial_segments: captionSegments,
            },
          };
          console.log(`Converted ${captionSegments.length} caption segments`);
        } else {
          throw new Error("No transcript available for this video");
        }
      } else {
        // No valid transcript found in any format
        throw new Error("No transcript available for this video");
      }
    }

    // Log the number of segments found
    console.log(
      `Found ${transcriptData.transcript.content.body.initial_segments.length} transcript segments`
    );

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

    // Process transcript segments in batches for better performance
    const batchSize = 100;
    let transcript: TranscriptItem[] = [];

    for (let i = 0; i < segments.length; i += batchSize) {
      const batch = segments.slice(i, i + batchSize);

      const batchTranscript = batch.map((text: string, batchIndex: number) => {
        const index = i + batchIndex;
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

      transcript = [...transcript, ...batchTranscript];
    }

    return { title, transcript, language: detectedLanguage };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    // Reset the instance if there's an error, in case it's corrupted
    youtubeInstance = null;
    throw error;
  }
};
