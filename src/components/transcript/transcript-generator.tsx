"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranscriptStore } from "@/store/transcript-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVideoId } from "@/lib/youtube";
import { toast } from "sonner";

export default function TranscriptGenerator() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { clearTranscript } = useTranscriptStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim the URL to remove any whitespace
    const trimmedUrl = youtubeUrl.trim();

    if (!trimmedUrl) {
      toast.error("Please enter a YouTube URL");
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
        router.push(`/transcript/${videoId}`);
      } else {
        console.error("Invalid YouTube URL:", trimmedUrl);
        toast.error("Please enter a valid YouTube URL");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error processing URL:", error);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 py-6 border-b border-red-400/20 dark:border-red-800/30">
      <div className="max-w-[800px] mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="flex-1 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 py-4"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <Button
            type="submit"
            className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-black font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Get Free Transcript"}
          </Button>
        </form>
      </div>
    </div>
  );
}
