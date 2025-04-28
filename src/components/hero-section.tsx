"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Languages, Globe, Clipboard } from "lucide-react";
import { toast } from "sonner";
import { getVideoId } from "@/lib/youtube";

export default function HeroSection() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    <section className="w-full py-4 sm:py-6 md:py-12 lg:py-16 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
      <div className="w-[95%] sm:w-[90%] mx-auto flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 max-w-4xl">
          Free Youtube Transcript Generator
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl px-2 sm:px-0">
          Use our free YouTube transcript extractor and Convert any YouTube
          video to Text in one click
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 mb-8 mx-auto"
        >
          <Input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="flex-1 h-12 bg-white backdrop-blur-sm border-gray-400 border-2 py-4 text-black placeholder:text-black dark:placeholder:text-white placeholder:font-medium text-sm sm:text-base"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <Button
            type="submit"
            className="h-12 px-4 sm:px-8 bg-black hover:bg-gray-800 text-white font-bold w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Your Transcript"}
          </Button>
        </form>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8 mb-6 w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Clipboard className="h-5 w-5 min-w-[20px]" />
            <span className="text-base">One-Click Copy and Download</span>
          </div>
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Languages className="h-5 w-5 min-w-[20px]" />
            <span className="text-base">Supports Translation</span>
          </div>
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Globe className="h-5 w-5 min-w-[20px]" />
            <span className="text-base">Multiple Languages</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mx-auto mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 min-w-[20px] text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base">Trusted by 535k+ Users Worldwide</span>
        </div>

        <div className="text-base mb-4 mx-auto">
          No Signup & Free Unlimited Usage
        </div>
      </div>
    </section>
  );
}
