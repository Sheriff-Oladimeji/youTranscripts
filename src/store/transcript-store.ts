import { create } from "zustand";

export interface TranscriptItem {
  text: string;
  duration: number;
  offset: number;
}

interface TranscriptState {
  videoId: string | null;
  videoTitle: string;
  transcript: TranscriptItem[];
  isLoading: boolean;
  error: string | null;
  selectedLanguage: string;
  translationTarget: string | null;
  isTranslating: boolean;

  // Actions
  setVideoId: (videoId: string) => void;
  fetchTranscriptData: (videoId: string) => Promise<void>;
  setSelectedLanguage: (language: string) => void;
  setTranslationTarget: (language: string | null) => void;
  clearTranscript: () => void;
}

export const useTranscriptStore = create<TranscriptState>((set) => ({
  videoId: null,
  videoTitle: "",
  transcript: [],
  isLoading: false,
  error: null,
  selectedLanguage: "en",
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

      set({
        videoId,
        videoTitle: data.metadata.title,
        transcript: data.transcript,
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

  setTranslationTarget: (language) =>
    set({
      translationTarget: language,
      isTranslating: !!language,
    }),

  clearTranscript: () =>
    set({
      transcript: [],
      videoTitle: "",
      error: null,
    }),
}));
