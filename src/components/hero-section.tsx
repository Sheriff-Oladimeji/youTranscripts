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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#b63e33] to-[#b63e33] dark:from-[#b63e33] dark:to-[#b63e33] text-white">
      <div className="w-[90%] mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 max-w-4xl">
          Free Youtube Transcript Generator
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl">
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
            className="flex-1 h-12 bg-white backdrop-blur-sm border-gray-400 border-2 py-4 text-black placeholder:text-black placeholder:font-medium"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <Button
            type="submit"
            className="h-12 px-8 bg-black hover:bg-gray-800 text-white font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Transcript"}
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-6 w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Clipboard className="h-5 w-5" />
            <span>One-Click Copy and Download</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            <span>Supports Translation</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>Multiple Languages</span>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-4 mb-6">
          <div className="flex items-center justify-center w-full mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-white/90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-medium text-white/90">
              Trusted by{" "}
            </span>
            <span className="text-lg font-bold ml-1">535k+ </span>
            <span className="text-lg font-medium text-white/90 ml-1">
              Users Worldwide
            </span>
          </div>
          <div className="text-center text-white/80 text-sm">
            No Signup & Free Unlimited Usage
          </div>
        </div>
      </div>
    </section>
  );
}
