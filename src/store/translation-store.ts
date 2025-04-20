import { create } from "zustand";
import { TranscriptItem } from "./transcript-store";
import { toast } from "sonner";

// Language options
export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "ko", name: "Korean" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "pl", name: "Polish" },
  { code: "th", name: "Thai" },
];

interface TranslationState {
  originalTranscript: TranscriptItem[];
  translatedTranscript: TranscriptItem[];
  currentLanguage: string;
  originalLanguage: string;
  isTranslating: boolean;
  error: string | null;
  progress: number;
  translationController: AbortController | null;

  setOriginalTranscript: (
    transcript: TranscriptItem[],
    detectedLanguage?: string
  ) => void;
  translateTo: (
    language: string,
    transcript?: TranscriptItem[]
  ) => Promise<void>;
  cancelTranslation: () => void;
  reset: () => void;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  // Initial state
  originalTranscript: [],
  translatedTranscript: [],
  currentLanguage: "en",
  originalLanguage: "en",
  isTranslating: false,
  error: null,
  progress: 0,
  translationController: null,

  // Set the original transcript
  setOriginalTranscript: (transcript, detectedLanguage) => {
    const language = detectedLanguage || "en";
    set({
      originalTranscript: transcript,
      translatedTranscript: transcript, // Initially, translated = original
      originalLanguage: language,
      currentLanguage: language,
      error: null,
    });
  },

  // Cancel any ongoing translation
  cancelTranslation: () => {
    const { translationController } = get();
    if (translationController) {
      translationController.abort();
    }

    if (get().isTranslating) {
      set({
        isTranslating: false,
        error: "Translation cancelled by user",
        progress: 0,
        translationController: null,
      });
      toast.info("Translation cancelled");
    }
  },

  // Translate to a specific language
  translateTo: async (language, transcript) => {
    const { originalTranscript, originalLanguage, isTranslating } = get();
    const transcriptToTranslate = transcript || originalTranscript;

    // If already translating, prevent starting another translation
    if (isTranslating) {
      toast.error("Translation already in progress");
      return;
    }

    // Clear previous errors and old translation
    set({
      error: null,
      progress: 0,
      translatedTranscript: [],
      translationController: new AbortController(),
    });

    const SEGMENT_MARKER = "<<<SEGMENT_MARKER_12345>>>";

    // If selecting the original language or transcript is empty, revert to original
    if (language === originalLanguage || transcriptToTranslate.length === 0) {
      set({
        translatedTranscript: originalTranscript,
        currentLanguage: originalLanguage,
        isTranslating: false,
        error: null,
        progress: 0,
        translationController: null,
      });

      if (language === originalLanguage) {
        const languageName =
          languages.find((l) => l.code === originalLanguage)?.name ||
          originalLanguage;
        toast.info(`Reverted to original language (${languageName})`);
      }
      return;
    }

    // Start translation
    set({ isTranslating: true, error: null, progress: 0 });
    const languageName =
      languages.find((l) => l.code === language)?.name || language;
    toast.info(`Translating to ${languageName}...`);

    try {
      // Different strategy for very large transcripts vs smaller ones
      const isLargeTranscript = transcriptToTranslate.length > 50;

      if (isLargeTranscript) {
        // For large transcripts, we'll translate in batches
        await translateLargeTranscript(
          transcriptToTranslate,
          language,
          SEGMENT_MARKER
        );
      } else {
        // For smaller transcripts, combine and translate all at once
        await translateSmallTranscript(
          transcriptToTranslate,
          language,
          SEGMENT_MARKER
        );
      }

      // Set translation is complete (already updated in the specific methods)
      if (get().isTranslating) {
        // Only show success if not cancelled
        toast.success(`Translation to ${languageName} complete!`);
      }
    } catch (error) {
      console.error("Error translating transcript:", error);
      // Only handle non-abort errors
      if (error instanceof Error) {
        if (error.name !== "AbortError") {
          set({
            error: error.message,
            isTranslating: false,
            progress: 0,
            translationController: null,
          });
          toast.error(`Translation failed: ${error.message}`);
        }
      } else {
        // Unknown error shape
        set({
          error: "Failed to translate transcript",
          isTranslating: false,
          progress: 0,
          translationController: null,
        });
        toast.error("Translation failed: Unknown error");
      }
    }
  },

  // Reset the store
  reset: () => {
    const { translationController } = get();
    if (translationController) {
      translationController.abort();
    }

    set({
      originalTranscript: [],
      translatedTranscript: [],
      currentLanguage: "en",
      originalLanguage: "en",
      isTranslating: false,
      error: null,
      progress: 0,
      translationController: null,
    });
  },
}));

/**
 * Helper function to translate small transcripts all at once
 */
async function translateSmallTranscript(
  transcript: TranscriptItem[],
  targetLanguage: string,
  segmentMarker: string
) {
  // Combine transcript segments into a single string with markers
  const combinedText = transcript.map((item) => item.text).join(segmentMarker);

  // If too long for single API call, fallback directly to batch
  const MAX_API_CHARS = 4000;
  if (combinedText.length > MAX_API_CHARS) {
    console.warn("Combined text too long, falling back to batch translation");
    return await translateLargeTranscript(transcript, targetLanguage, segmentMarker);
  }

  try {
    const controller = useTranslationStore.getState().translationController;

    // Send request to the translation API
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: combinedText,
        target_lang: targetLanguage,
      }),
      signal: controller?.signal,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Translation failed");
    }

    const data = await response.json();
    const translatedSegments = data.translatedText.split(segmentMarker);

    // Map translated segments back to transcript items
    const translatedTranscript = transcript.map((segment, index) => ({
      ...segment,
      text: translatedSegments[index] || segment.text, // Fallback to original text
    }));

    // Update the store
    useTranslationStore.setState({
      translatedTranscript,
      currentLanguage: targetLanguage,
      isTranslating: false,
      progress: 100,
      translationController: null,
    });
  } catch (error) {
    console.warn("translateSmallTranscript failed, falling back to batch translation:", error);
    // Fallback to batch translation for reliability
    return await translateLargeTranscript(transcript, targetLanguage, segmentMarker);
  }
}

/**
 * Helper function to translate large transcripts in batches
 */
async function translateLargeTranscript(
  transcript: TranscriptItem[],
  targetLanguage: string,
  segmentMarker: string
) {
  const batchSize = 15;
  const batches: TranscriptItem[][] = [];
  for (let i = 0; i < transcript.length; i += batchSize) {
    batches.push(transcript.slice(i, i + batchSize));
  }
  const controller = useTranslationStore.getState().translationController;

  try {
    // initialize progress
    useTranslationStore.setState({ progress: 0 });
    const total = batches.length;
    let completed = 0;
    const batchPromises = batches.map((batch) => {
      const textPayload = batch.map((item) => item.text).join(segmentMarker);
      return fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textPayload, target_lang: targetLanguage }),
        signal: controller?.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Batch translation failed");
          return res.json();
        })
        .then((data) => {
          const parts = data.translatedText.split(segmentMarker);
          const translated = batch.map((item, idx) => ({
            ...item,
            text: parts[idx] || item.text,
          }));
          completed++;
          useTranslationStore.setState({
            progress: Math.round((completed / total) * 100),
          });
          return translated;
        });
    });
    const results = await Promise.all(batchPromises);
    const translatedItems = results.flat();
    useTranslationStore.setState({
      translatedTranscript: translatedItems,
      currentLanguage: targetLanguage,
      isTranslating: false,
      progress: 100,
      translationController: null,
    });
  } catch (error) {
    console.error("Error in parallel translation:", error);
    useTranslationStore.setState({
      translatedTranscript: transcript,
      currentLanguage: targetLanguage,
      isTranslating: false,
      progress: 100,
      translationController: null,
    });
  }
}
