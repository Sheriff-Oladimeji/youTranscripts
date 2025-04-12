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
    setIsLoading(true);

    const videoId = getVideoId(youtubeUrl);
    if (videoId) {
      router.push(`/transcript/${videoId}`);
    } else {
      toast.error("Please enter a valid YouTube URL");
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 text-white">
      <div className="w-[90%] mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
          YouTubeTranscriptTool
        </h1>
        <p className=" text-lg md:text-xl mb-2">
          Generate YouTube Transcript for FREE.
        </p>
        <p className=" text-lg md:text-xl mb-8">
          Access all Transcript Languages, Translate to 125+ Languages, Easy
          Copy and Edit!
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="flex-1 h-12 bg-white/10 backdrop-blur-sm border-white/20 py-4 text-white placeholder:text-white/70"
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

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <Clipboard className="h-5 w-5" />
            <span>One-click Copy</span>
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
      </div>
    </section>
  );
}
