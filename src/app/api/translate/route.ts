import { NextResponse } from "next/server";
import { translate as googleTranslate } from '@vitalets/google-translate-api';
import openTranslator from 'open-google-translator';

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
 * Translates text via local package with fallback.
 */
async function translateWithRetry(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text.trim()) return "";
  try {
    const { text: translated } = await googleTranslate(text, { to: targetLang });
    return translated;
  } catch (err) {
    console.warn("Primary translate failed, falling back:", err);
    try {
      // allow string codes despite strict type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await openTranslator.TranslateLanguageData({
        listOfWordsToTranslate: [text],
        fromLanguage: "auto" as any,
        toLanguage: targetLang as any,
      });
      return data[0]?.translation || text;
    } catch (fallbackErr) {
      console.error("Fallback translate failed:", fallbackErr);
      throw new Error("Translation failed");
    }
  }
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
