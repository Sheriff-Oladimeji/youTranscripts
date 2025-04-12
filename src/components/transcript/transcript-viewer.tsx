"use client";

import React from "react";
import { TranscriptItem } from "@/store/transcript-store";

interface TranscriptViewerProps {
  videoId: string;
  transcript: TranscriptItem[];
  isLoading: boolean;
  error: string | null;
  isTranslated: boolean;
}

export default function TranscriptViewer({
  videoId,
  transcript,
  isLoading,
  error,
  isTranslated,
}: TranscriptViewerProps) {
  // No sticky video functionality

  if (isLoading) {
    return (
      <div className="p-6 bg-muted rounded-lg animate-pulse">
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
        {isTranslated && (
          <div className="mb-4 p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded">
            <p className="text-sm">
              This is a machine translation and may not be 100% accurate.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {transcript.map((item, index) => (
            <p key={index} className="leading-relaxed text-base">
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
