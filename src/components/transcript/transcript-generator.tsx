"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranscriptStore } from "@/store/transcript-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVideoId } from "@/lib/youtube";
import { toast } from "sonner";
import { useT } from "@/i18n/client";

interface TranscriptGeneratorProps {
  lng?: string;
}

export default function TranscriptGenerator({ lng }: TranscriptGeneratorProps) {
  const { t } = useT();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { clearTranscript } = useTranscriptStore();
  const router = useRouter();

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
        clearTranscript();
        // If we have a language parameter, include it in the URL
        const path = lng
          ? `/${lng}/transcript/${videoId}`
          : `/transcript/${videoId}`;
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
    <div className="w-full bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] py-6 border-b border-red-400/20 dark:border-red-800/30">
      <div className="max-w-[800px] mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Input
            type="text"
            placeholder={t("transcriptGenerator.placeholder")}
            className="flex-1 h-12 bg-white backdrop-blur-sm border-gray-400 border-2 py-4 text-black placeholder:text-black placeholder:font-medium"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <Button
            type="submit"
            className="h-12 px-8 bg-black hover:bg-gray-800 text-white font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : t("transcriptGenerator.button")}
          </Button>
        </form>
      </div>
    </div>
  );
}
