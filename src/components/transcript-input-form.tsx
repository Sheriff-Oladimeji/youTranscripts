"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getVideoId } from "@/lib/youtube";
import { useTranscriptStore } from "@/store/transcript-store";
import { useT } from "@/i18n/client";
import { fallbackLng } from "@/i18n/settings";

interface TranscriptInputFormProps {
  buttonText?: string;
  className?: string;
  lng?: string;
}

export default function TranscriptInputForm({
  buttonText,
  className = "",
  lng,
}: TranscriptInputFormProps) {
  const { t } = useT();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { clearTranscript } = useTranscriptStore();

  // Use the provided buttonText or get it from translations
  const submitButtonText = buttonText || t("transcriptGenerator.button");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim the URL to remove any whitespace
    const trimmedUrl = youtubeUrl.trim();

    if (!trimmedUrl) {
      toast.error(t("transcriptGenerator.error"));
      return;
    }

    setIsLoading(true);

    try {
      const videoId = getVideoId(trimmedUrl);
      if (videoId) {
        console.log(
          "Valid YouTube URL detected, navigating to transcript page"
        );

        // Clear the transcript store and wait for it to complete
        await clearTranscript();
        console.log("Transcript store cleared, now navigating");

        // For English (or no language specified), use root route
        // For other languages, include the language prefix
        const path =
          !lng || lng === fallbackLng
            ? `/transcript/${videoId}`
            : `/${lng}/transcript/${videoId}`;

        // Reset loading state and navigate
        setIsLoading(false);
        router.push(path);
      } else {
        console.error("Invalid YouTube URL:", trimmedUrl);
        toast.error(t("transcriptGenerator.error"));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error processing URL:", error);
      toast.error(t("transcriptGenerator.error"));
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder={t("transcriptGenerator.placeholder")}
          className="flex-1 h-12 bg-white backdrop-blur-sm border-gray-400 border-2 py-4 text-black placeholder:text-black dark:placeholder:text-white placeholder:font-medium"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <Button
          type="submit"
          className="h-12 px-8 bg-black hover:bg-gray-800 text-white font-bold"
          disabled={isLoading}
        >
          {isLoading ? t("transcriptGenerator.generating") : submitButtonText}
        </Button>
      </form>
    </div>
  );
}
