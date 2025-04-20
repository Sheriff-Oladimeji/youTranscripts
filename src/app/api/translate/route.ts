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
    const data = await openTranslator.TranslateLanguageData({
      listOfWordsToTranslate: [text] as string[],
      fromLanguage: "auto" as any,
      toLanguage: targetLang as any,
    });
    const items = Array.isArray(data) ? data : [data];
    const flat: string[] = [];
    items.forEach((it: unknown) => {
      if (typeof it === 'string') {
        flat.push(it);
      } else if (typeof it === 'object' && it !== null && 'translation' in it) {
        const t = (it as any).translation;
        if (Array.isArray(t)) flat.push(...t);
        else flat.push(String(t));
      }
    });
    // Filter out stray two-letter language codes (e.g. 'en', 'hi')
    const translations = flat.filter(str => !/^[a-z]{2}$/i.test(str));
    return translations.join(' ');
  } catch (primaryErr) {
    console.warn("open-google-translator primary failed, falling back to google-translate-api:", primaryErr);
    try {
      const { text: translated } = await googleTranslate(text, { to: targetLang });
      return translated;
    } catch (fallbackErr) {
      console.error("googleTranslate fallback failed:", fallbackErr);
      throw new Error("Translation failed");
    }
  }
}

/**
 * Translates text by splitting into size-limited chunks to avoid timeouts.
 */
async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text.trim()) return "";
  // First handle our segment markers to preserve segment boundaries
  const SEGMENT_MARKER = "<<<SEGMENT_MARKER_12345>>>";
  if (text.includes(SEGMENT_MARKER)) {
    const segments = text.split(SEGMENT_MARKER);
    const translatedSegments = await Promise.all(
      segments.map((seg) =>
        seg.trim() ? translateText(seg, targetLang) : Promise.resolve("")
      )
    );
    // Rejoin using segment markers so translation-store can correctly split
    return translatedSegments.join(SEGMENT_MARKER);
  }
  const MAX_CHARS = 1000;
  if (text.length <= MAX_CHARS) {
    return await translateWithRetry(text, targetLang);
  }
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += MAX_CHARS) {
    chunks.push(text.slice(i, i + MAX_CHARS));
  }
  const parts = await Promise.all(chunks.map((c) => translateWithRetry(c, targetLang)));
  return parts.join('');
}
