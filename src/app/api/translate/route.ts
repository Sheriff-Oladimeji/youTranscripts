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
 * Translates text using free translation APIs (Google Translate with fallback to MyMemory).
 * @param text - The text to translate.
 * @param targetLang - The target language code.
 * @returns The translated text.
 */
async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  // For long texts, we need to split it into chunks to avoid URL length limitations
  // and potential issues with the translation APIs
  if (text.length > 5000) {
    return translateLongText(text, targetLang);
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    let translatedText = "";
    if (data && Array.isArray(data[0])) {
      for (const part of data[0]) {
        if (part[0]) translatedText += part[0];
      }
      return translatedText;
    }
    throw new Error("Unexpected response format from Google Translate");
  } catch (error) {
    console.error("Google Translate failed:", error);

    // Fallback to MyMemory API
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=auto|${targetLang}`
      );
      const data = await response.json();
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
      throw new Error("Invalid response from MyMemory API");
    } catch (fallbackError) {
      console.error("MyMemory API failed:", fallbackError);
      throw new Error("All translation services failed");
    }
  }
}

/**
 * Handles translation of long text by splitting it into chunks
 * and preserving special markers.
 */
async function translateLongText(
  text: string,
  targetLang: string
): Promise<string> {
  // Check if the text contains our segment markers
  const hasSegmentMarkers = text.includes("###SEGMENT###");

  // If it has segment markers, we need to preserve them during translation
  if (hasSegmentMarkers) {
    // Split by segment markers
    const segments = text.split("\n\n###SEGMENT###\n\n");

    // Translate each segment individually
    const translatedSegments = await Promise.all(
      segments.map((segment) => translateText(segment, targetLang))
    );

    // Rejoin with the same markers
    return translatedSegments.join("\n\n###SEGMENT###\n\n");
  }

  // For regular long text without markers, split by paragraphs
  const paragraphs = text.split("\n\n");
  const translatedParagraphs = await Promise.all(
    paragraphs.map((paragraph) => translateText(paragraph, targetLang))
  );

  return translatedParagraphs.join("\n\n");
}
