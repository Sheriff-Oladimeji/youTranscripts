import { create } from "zustand";

export interface TranscriptItem {
  text: string;
  duration: number;
  offset: number;
  translatedText?: string;
}

interface TranscriptState {
  videoId: string | null;
  videoTitle: string;
  channelTitle: string;
  publishDate: string;
  views: string;
  likes: string;
  duration: string;
  description: string;
  transcript: TranscriptItem[];
  originalTranscript: TranscriptItem[];
  isLoading: boolean;
  error: string | null;
  selectedLanguage: string;
  detectedLanguage: string;
  translationTarget: string | null;
  isTranslating: boolean;

  // Actions
  setVideoId: (videoId: string) => void;
  fetchTranscriptData: (videoId: string) => Promise<void>;
  setSelectedLanguage: (language: string) => void;
  setTranslationTarget: (language: string | null) => void;
  translateTranscript: (language: string) => Promise<void>;
  clearTranscript: () => void;
}

export const useTranscriptStore = create<TranscriptState>((set, get) => ({
  videoId: null,
  videoTitle: "",
  channelTitle: "",
  publishDate: "",
  views: "0",
  likes: "0",
  duration: "",
  description: "",
  transcript: [],
  originalTranscript: [],
  isLoading: false,
  error: null,
  selectedLanguage: "en",
  detectedLanguage: "en",
  translationTarget: null,
  isTranslating: false,

  setVideoId: (videoId) => set({ videoId }),

  fetchTranscriptData: async (videoId) => {
    set({ isLoading: true, error: null });

    try {
      // Construct a URL from the videoId
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      // Use browser's fetch API to call our own API
      const response = await fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch transcript");
      }

      const data = await response.json();

      // Get the detected language from the API response
      const detectedLanguage = data.metadata.language || "en";

      // Make sure we have a title
      let videoTitle = data.metadata.title;

      // Additional safeguard for title
      if (!videoTitle || videoTitle.trim() === "") {
        videoTitle = `YouTube Video (${videoId})`;
        console.log(
          "Store: Title was empty, using default with videoId:",
          videoTitle
        );
      }

      console.log("Setting video title in store:", videoTitle);

      set({
        videoId,
        videoTitle,
        channelTitle: data.metadata.channelTitle || "",
        publishDate: data.metadata.publishDate || "",
        views: data.metadata.views || "0",
        likes: data.metadata.likes || "0",
        duration: data.metadata.duration || "",
        description: data.metadata.description || "",
        transcript: data.transcript,
        originalTranscript: data.transcript,
        selectedLanguage: detectedLanguage,
        detectedLanguage: detectedLanguage,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching transcript:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch transcript",
        isLoading: false,
      });
    }
  },

  setSelectedLanguage: (language) => set({ selectedLanguage: language }),

  setTranslationTarget: (language) => {
    set({
      translationTarget: language,
      isTranslating: !!language,
    });

    if (language) {
      get().translateTranscript(language);
    } else {
      // Restore original transcript
      set({ transcript: get().originalTranscript });
    }
  },

  translateTranscript: async (language) => {
    const { transcript: currentTranscript } = get();
    set({ isTranslating: true, error: null });

    try {
      // Combine all text into a single string with markers to split later
      // This reduces the number of API calls significantly
      const combinedText = currentTranscript
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
      if (translatedSegments.length !== currentTranscript.length) {
        throw new Error("Translation segments don't match original transcript");
      }

      const translatedTranscript = currentTranscript.map((segment, index) => ({
        ...segment,
        translatedText: translatedSegments[index],
        text: translatedSegments[index], // Replace text with translation
      }));

      // Update the transcript with translations
      set({
        transcript: translatedTranscript,
        isTranslating: false,
      });

      // We can't directly import toast here, so we'll use a custom event
      // to notify the UI that translation is complete
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("translation-complete", {
            detail: { language },
          })
        );
      }
    } catch (error) {
      console.error("Error translating transcript:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to translate transcript",
        isTranslating: false,
        // Keep the original transcript if translation fails
        transcript: get().originalTranscript,
      });
    }
  },

  clearTranscript: () =>
    set({
      transcript: [],
      originalTranscript: [],
      videoTitle: "",
      channelTitle: "",
      publishDate: "",
      views: "0",
      likes: "0",
      duration: "",
      description: "",
      error: null,
      selectedLanguage: "en",
      detectedLanguage: "en",
      translationTarget: null,
    }),
}));
