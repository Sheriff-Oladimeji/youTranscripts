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
];

interface TranslationState {
  // State
  originalTranscript: TranscriptItem[];
  translatedTranscript: TranscriptItem[];
  currentLanguage: string;
  originalLanguage: string;
  isTranslating: boolean;
  error: string | null;

  // Actions
  setOriginalTranscript: (
    transcript: TranscriptItem[],
    detectedLanguage?: string
  ) => void;
  translateTo: (
    language: string,
    transcript?: TranscriptItem[]
  ) => Promise<void>;
  reset: () => void;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  // Initial state
  originalTranscript: [],
  translatedTranscript: [],
  currentLanguage: "en", // Default to English
  originalLanguage: "en", // Default to English, will be updated when transcript is set
  isTranslating: false,
  error: null,

  // Set the original transcript
  setOriginalTranscript: (transcript, detectedLanguage) => {
    const language = detectedLanguage || "en";
    set({
      originalTranscript: transcript,
      translatedTranscript: transcript, // Initially, translated = original
      originalLanguage: language,
      currentLanguage: language,
    });
  },

  // Translate to a specific language
  translateTo: async (language, transcript) => {
    const { originalTranscript, originalLanguage } = get();
    const transcriptToTranslate = transcript || originalTranscript;

    // If selecting the original language or the transcript is empty, just revert to original
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
    set({ isTranslating: true, error: null });

    const languageName =
      languages.find((l) => l.code === language)?.name || language;
    toast.info(`Translating to ${languageName}...`);

    try {
      // Combine all text into a single string with markers to split later
      const combinedText = transcriptToTranslate
        .map((item) => item.text)
        .join("\n\n###SEGMENT###\n\n");

      // Make a single API call for the entire transcript
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: combinedText,
          target_lang: language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Translation failed");
      }

      const data = await response.json();

      // Split the translated text back into segments
      const translatedSegments = data.translatedText.split(
        "\n\n###SEGMENT###\n\n"
      );

      // Create a new transcript with translations
      if (translatedSegments.length !== transcriptToTranslate.length) {
        throw new Error("Translation segments don't match original transcript");
      }

      const translatedTranscript = transcriptToTranslate.map(
        (segment, index) => ({
          ...segment,
          text: translatedSegments[index], // Replace text with translation
        })
      );

      // Update the state
      set({
        translatedTranscript,
        currentLanguage: language,
        isTranslating: false,
      });

      // Show success toast
      toast.success(`Translation to ${languageName} complete!`);
    } catch (error) {
      console.error("Error translating transcript:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to translate transcript",
        isTranslating: false,
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
    });
  },
}));
