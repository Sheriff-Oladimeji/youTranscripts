import { NextResponse } from "next/server";

// Define request body type
interface RequestBody {
  text: string;
  target_lang: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { text, target_lang } = body;

    if (!text || !target_lang) {
      return NextResponse.json(
        { error: "Missing text or target_lang" },
        { status: 400 }
      );
    }

    // Log the size of the request to help debug large transcripts
    console.log(
      `Translation request size: ${text.length} characters, target: ${target_lang}`
    );

    const translatedText = await translateText(text, target_lang);
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Error in /api/translate:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Translates a single piece of text with retries and fallback.
 * @param text - The text to translate.
 * @param targetLang - The target language code (e.g., "es" for Spanish).
 * @param retries - Number of retry attempts (default: 3).
 * @param delay - Initial delay between retries in milliseconds (default: 1000).
 * @returns The translated text.
 * @throws Error if all translation attempts fail.
 */
async function translateWithRetry(
  text: string,
  targetLang: string,
  retries = 3,
  delay = 1000
): Promise<string> {
  // Handle empty text case
  if (!text.trim()) {
    return "";
  }

  let currentDelay = delay;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Attempt translation with Google Translate
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(url, {
        // Add timeout to prevent hanging on large requests
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Google Translate error: ${response.status}`);
      }

      const data = await response.json();
      let translatedText = "";

      if (data && Array.isArray(data[0])) {
        for (const part of data[0]) {
          if (part[0]) translatedText += part[0];
        }
        return translatedText;
      }
      throw new Error("Unexpected response from Google Translate");
    } catch (error) {
      console.error(`Google Translate attempt ${attempt} failed:`, error);
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        // Exponential backoff
        currentDelay *= 2;
        continue;
      }

      // Fallback to MyMemory if Google Translate fails after retries
      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            text
          )}&langpair=auto|${targetLang}`,
          {
            // Add timeout to prevent hanging
            signal: AbortSignal.timeout(15000),
          }
        );

        if (!response.ok) {
          throw new Error(`MyMemory error: ${response.status}`);
        }

        const data = await response.json();
        if (data?.responseData?.translatedText) {
          return data.responseData.translatedText;
        }
        throw new Error("Invalid response from MyMemory");
      } catch (fallbackError) {
        console.error(`MyMemory fallback failed:`, fallbackError);
        throw new Error("All translation services failed");
      }
    }
  }
  throw new Error("Translation failed after all retries");
}

/**
 * Translates text, handling long texts by splitting into chunks.
 * @param text - The text to translate, possibly containing segment markers.
 * @param targetLang - The target language code.
 * @returns The translated text with segments rejoined.
 */
async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  // Improved segment marker that's unlikely to appear in normal text
  const SEGMENT_MARKER = "<<<SEGMENT_MARKER_12345>>>";
  const MAX_CHUNK_SIZE = 4800; // Google Translate has a ~5000 char limit

  // If the text contains our specific segment marker, handle it specially
  if (text.includes(SEGMENT_MARKER)) {
    return translateWithSegmentMarkers(text, targetLang, SEGMENT_MARKER);
  }

  // If text is short enough, translate directly
  if (text.length <= MAX_CHUNK_SIZE) {
    return translateWithRetry(text, targetLang);
  }

  // For long texts, split into logical chunks to avoid breaking sentences
  return translateLongText(text, targetLang, MAX_CHUNK_SIZE);
}

/**
 * Translates long text by intelligently chunking it.
 * @param text - The long text to translate.
 * @param targetLang - The target language code.
 * @param maxChunkSize - Maximum size for each chunk.
 * @returns The translated text with chunks rejoined.
 */
async function translateLongText(
  text: string,
  targetLang: string,
  maxChunkSize: number
): Promise<string> {
  // Start by splitting on paragraph breaks to preserve structure
  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = "";

  // Group paragraphs into chunks
  for (const paragraph of paragraphs) {
    // If adding this paragraph would make the chunk too large
    if (
      currentChunk.length + paragraph.length + 2 > maxChunkSize &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk);
      currentChunk = paragraph;
    } else {
      // Otherwise add to current chunk
      if (currentChunk.length > 0) {
        currentChunk += "\n\n";
      }
      currentChunk += paragraph;
    }
  }

  // Add the last chunk if it has content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  console.log(`Split long text into ${chunks.length} chunks for translation`);

  // Translate each chunk with proper error handling and rate limiting
  const translatedChunks: string[] = [];
  let failedChunks = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(
      `Translating chunk ${i + 1}/${chunks.length} (${chunk.length} chars)`
    );

    try {
      const translatedChunk = await translateWithRetry(chunk, targetLang);
      translatedChunks.push(translatedChunk);
    } catch (error) {
      console.error(`Error translating chunk ${i + 1}:`, error);
      // If translation fails, use original text for that chunk
      translatedChunks.push(chunk);
      failedChunks++;
    }

    // Add delay between chunks to avoid rate limiting (for longer transcripts)
    if (i < chunks.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  if (failedChunks > 0) {
    console.warn(
      `${failedChunks} out of ${chunks.length} chunks failed to translate`
    );
  }

  // Join all translated chunks back together
  return translatedChunks.join("\n\n");
}

/**
 * Translates text with explicit segment markers.
 * @param text - The text containing segment markers.
 * @param targetLang - The target language code.
 * @param marker - The segment marker used to split the text.
 * @returns The translated text with segments rejoined.
 */
async function translateWithSegmentMarkers(
  text: string,
  targetLang: string,
  marker: string
): Promise<string> {
  // Split the text by marker
  const segments = text.split(marker);
  const translatedSegments: string[] = [];
  let failedSegments = 0;

  console.log(`Translating ${segments.length} marked segments`);

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i].trim();

    // Skip empty segments
    if (!segment) {
      translatedSegments.push("");
      continue;
    }

    try {
      // Break down large segments further if needed
      if (segment.length > 4800) {
        const translatedLongSegment = await translateLongText(
          segment,
          targetLang,
          4800
        );
        translatedSegments.push(translatedLongSegment);
      } else {
        const translatedSegment = await translateWithRetry(segment, targetLang);
        translatedSegments.push(translatedSegment);
      }
    } catch (error) {
      console.error(`Error translating segment ${i + 1}:`, error);
      // Use original segment if translation fails
      translatedSegments.push(segment);
      failedSegments++;
    }

    // Add delay between segments to respect rate limits
    if (i < segments.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  if (failedSegments > 0) {
    console.warn(
      `${failedSegments} out of ${segments.length} segments failed to translate`
    );
  }

  // Rejoin segments using the same marker
  return translatedSegments.join(marker);
}
