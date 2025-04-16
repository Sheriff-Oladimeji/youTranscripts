"use client";

import { useTranscriptStore } from "@/store/transcript-store";

interface TranscriptHeaderProps {
  videoId: string;
  title: string;
  isLoading: boolean;
  error: string | null;
}

export default function TranscriptHeader({
  videoId,
  title,
  isLoading,
  error,
}: TranscriptHeaderProps) {
  const { channelTitle } = useTranscriptStore();

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {isLoading
          ? "Loading transcript..."
          : error
          ? "Error loading transcript"
          : title
          ? `Transcript of ${title}`
          : `Transcript of YouTube Video`}
      </h1>

      {!isLoading && !error && channelTitle && (
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="mr-2">Author:</span>
            <span className="font-medium">
              {channelTitle || "YouTube Creator"}
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
