"use client";

import { useTranscriptStore } from "@/store/transcript-store";
import { useT } from "@/i18n/client";

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
  const { t } = useT();

  return (
    <div className="mb-3">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {isLoading ? (
          t("transcript.header.loading")
        ) : error ? (
          t("transcript.header.error")
        ) : title ? (
          <>
            <span className="font-bold">{t("transcript.header.of")} </span>
            <span className="font-normal">&ldquo;{title}&rdquo;</span>
          </>
        ) : (
          <>
            <span className="font-bold">{t("transcript.header.of")} </span>
            <span className="font-normal">{t("transcript.header.video")}</span>
          </>
        )}
      </h1>

      {!isLoading && !error && channelTitle && (
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="mr-2">{t("transcript.header.author")}</span>
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
