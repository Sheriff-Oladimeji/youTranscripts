"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getVideoId } from "@/lib/youtube";
import { useTranscriptStore } from "@/store/transcript-store";

interface TranscriptInputFormProps {
  buttonText?: string;
  className?: string;
}

export default function TranscriptInputForm({
  buttonText = "Generate Transcript",
  className = "",
}: TranscriptInputFormProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { clearTranscript } = useTranscriptStore();

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
    <div className={`w-full ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          type="text"
          placeholder="Paste YouTube URL here..."
          className="flex-1 h-12 bg-white backdrop-blur-sm border-gray-400 border-2 py-4 text-black placeholder:text-black dark:placeholder:text-white placeholder:font-medium"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <Button
          type="submit"
          className="h-12 px-8 bg-black hover:bg-gray-800 text-white font-bold"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : buttonText}
        </Button>
      </form>
    </div>
  );
}
