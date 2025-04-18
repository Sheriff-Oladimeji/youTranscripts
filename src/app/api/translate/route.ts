// app/api/translate/route.ts
// ---------------------------

import { NextResponse } from "next/server";
import { chunkText } from "@/lib/utils";

interface RequestBody {
  text: string;
  target_lang: string;
}

/**
 * Translate a short piece of text using Google’s free endpoint.
 */
async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  const url =
    `https://translate.googleapis.com/translate_a/single?` +
    `client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Google Translate failed");
  const data = await res.json();

  let out = "";
  if (Array.isArray(data[0])) {
    for (const part of data[0]) {
      out += part[0] || "";
    }
  }
  return out;
}

/**
 * Translate long text by chunking into safe lengths
 * and preserving your segment markers.
 */
async function translateLongText(
  text: string,
  targetLang: string
): Promise<string> {
  const marker = "__SEGMENT_MARKER_12345__";

  // 1) Break text into ≤ 4 500‑char chunks
  const chunks = chunkText(text, marker, 4500);

  // 2) Translate each chunk with Google → fallback to MyMemory
  const translatedChunks = await Promise.all(
    chunks.map((chunk) =>
      translateText(chunk, targetLang).catch(async (err) => {
        console.warn("Google failed, falling back:", err);
        const memRes = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            chunk
          )}&langpair=auto|${targetLang}`
        );
        const memData = await memRes.json();
        if (!memData?.responseData?.translatedText) {
          throw new Error("MyMemory fallback failed");
        }
        return memData.responseData.translatedText;
      })
    )
  );

  // 3) Re‑insert markers
  return translatedChunks.join(marker);
}

export async function POST(request: Request) {
  try {
    const { text, target_lang } = (await request.json()) as RequestBody;
    if (!text || !target_lang) {
      return NextResponse.json(
        { error: "Missing text or target_lang" },
        { status: 400 }
      );
    }

    // Always use the long translator, which will chunk internally
    const translatedText = await translateLongText(text, target_lang);
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Error in /api/translate:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// (Optional) force Node.js runtime if you need larger body‑size allowance
export const config = {
  runtime: "nodejs",
};
