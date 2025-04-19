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
  progress: number; // Added to track progress for long translations

  setOriginalTranscript: (
    transcript: TranscriptItem[],
    detectedLanguage?: string
  ) => void;
  translateTo: (
    language: string,
    transcript?: TranscriptItem[]
  ) => Promise<void>;
  cancelTranslation: () => void; // Added for user to cancel long translations
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
    if (get().isTranslating) {
      set({
        isTranslating: false,
        error: "Translation cancelled by user",
        progress: 0,
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

    // Clear any previous errors
    set({ error: null });

    const SEGMENT_MARKER = "<<<SEGMENT_MARKER_12345>>>";

    // If selecting the original language or transcript is empty, revert to original
    if (language === originalLanguage || transcriptToTranslate.length === 0) {
      set({
        translatedTranscript: originalTranscript,
        currentLanguage: originalLanguage,
        isTranslating: false,
        error: null,
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
      const isLargeTranscript = transcriptToTranslate.length > 100;

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
      toast.success(`Translation to ${languageName} complete!`);
    } catch (error) {
      console.error("Error translating transcript:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to translate transcript",
        isTranslating: false,
        progress: 0,
      });
      toast.error(
        `Translation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  // Reset the store
  reset: () => {
    set({
      originalTranscript: [],
      translatedTranscript: [],
      currentLanguage: "en",
      originalLanguage: "en",
      isTranslating: false,
      error: null,
      progress: 0,
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

  try {
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
    });
  } catch (error) {
    throw error; // Let the main function handle the error
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
  // For very large transcripts, we'll translate in batches of 20
  const batchSize = 20;
  const batches = [];

  // Split into batches
  for (let i = 0; i < transcript.length; i += batchSize) {
    batches.push(transcript.slice(i, i + batchSize));
  }

  console.log(`Translating large transcript in ${batches.length} batches`);

  // Translated transcript items will be stored here
  const translatedItems: TranscriptItem[] = [];

  // Process each batch
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchText = batch.map((item) => item.text).join(segmentMarker);

    // Update progress
    useTranslationStore.setState({
      progress: Math.round((i / batches.length) * 100),
    });

    try {
      // Send request to the translation API
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: batchText,
          target_lang: targetLanguage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Translation failed");
      }

      const data = await response.json();
      const translatedSegments = data.translatedText.split(segmentMarker);

      // Map translated segments back to transcript items for this batch
      const translatedBatch = batch.map((segment, index) => ({
        ...segment,
        text: translatedSegments[index] || segment.text, // Fallback to original text
      }));

      // Add to our accumulated result
      translatedItems.push(...translatedBatch);

      // If we're not at the last batch, update the partially translated transcript
      if (i < batches.length - 1) {
        // Create a combined transcript with translated items so far, plus original remaining items
        const partialTranslated = [
          ...translatedItems,
          ...transcript.slice((i + 1) * batchSize),
        ];

        // Update the store with partial results
        useTranslationStore.setState({
          translatedTranscript: partialTranslated,
        });

        // Pause between batches to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`Error translating batch ${i + 1}:`, error);

      // For batch failures, we continue with the next batch, but mark failed items
      const failedBatch = batch.map((segment) => ({
        ...segment,
        text: `[Translation failed: ${segment.text}]`,
      }));

      translatedItems.push(...failedBatch);
    }

    // Check if translation was cancelled
    if (!useTranslationStore.getState().isTranslating) {
      console.log("Translation cancelled by user");
      throw new Error("Translation cancelled");
    }
  }

  // Update the store with complete results
  useTranslationStore.setState({
    translatedTranscript: translatedItems,
    currentLanguage: targetLanguage,
    isTranslating: false,
    progress: 100,
  });
}
