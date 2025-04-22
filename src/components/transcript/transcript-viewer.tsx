"use client";

import React from "react";
import { TranscriptItem } from "@/store/transcript-store";
import { useTranslationStore } from "@/store/translation-store";
import { ArrowUp } from "lucide-react";

interface TranscriptViewerProps {
  transcript: TranscriptItem[];
  isLoading: boolean;
  error: string | null;
}

export default function TranscriptViewer({
  transcript,
  isLoading,
  error,
}: TranscriptViewerProps) {
  const { translatedTranscript, isTranslating } = useTranslationStore();

  if (isLoading || isTranslating) {
    return (
      <div className="p-6 bg-muted rounded-lg animate-pulse">
        {isTranslating && (
          <div className="mb-4 p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
            <p className="text-sm font-medium flex items-center">
              <span className="inline-block animate-pulse mr-2">⏳</span>
              Translating transcript... This may take a moment.
            </p>
          </div>
        )}
        <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-muted-foreground/20 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-muted-foreground/20 rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-muted-foreground/20 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-muted-foreground/20 rounded w-4/5"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
        <p className="font-medium">Failed to load transcript</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (transcript.length === 0) {
    return (
      <div className="p-6 bg-muted rounded-lg">
        <p className="text-center text-muted-foreground">
          No transcript available for this video.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-6">
      <div className="p-6 bg-muted rounded-lg">
        {/* Machine translation notice removed */}
        <div className="transcript-container">
          <p className="leading-relaxed text-base">
            {(translatedTranscript.length > 0
              ? translatedTranscript
              : transcript
            ).map((item, index) => (
              <span key={index}>{item.text} </span>
            ))}
          </p>

          {/* Back To Top Button */}
          <div className="mt-6 mb-2 flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 dark:bg-[#FFD700] dark:hover:bg-[#FFCC00] dark:text-black text-white font-medium rounded-lg py-3 px-6 w-full max-w-md transition-all duration-300 ease-in-out shadow-md"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
              <span>Back To Top</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
