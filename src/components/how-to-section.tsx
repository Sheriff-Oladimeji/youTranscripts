"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVideoId } from "@/lib/youtube";

export default function HowToSection() {
  const [demoUrl, setDemoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <section
      className="w-full py-16 md:py-20 bg-white dark:bg-gray-800"
      id="how-to"
    >
      <div className="w-[90%] mx-auto">
        <div className="text-foreground p-8 md:p-12 mb-8">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl">
              Generate Free YouTube Transcripts in Seconds 🎥
            </h2>
            <p className="max-w-[800px] text-lg mb-10">
              Convert any YouTube video into fully editable, SEO-friendly
              text—no signup, no limits, and 100% free.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
              How it works:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 h-14 w-14 text-center">
                  <span className="text-2xl">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Paste & Go</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Drop your YouTube URL, click Generate My Free Transcript.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 h-14 w-14 text-center">
                  <span className="text-2xl">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Edit & Translate</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Remove unwanted bits, choose from 100+ languages, and polish
                  for SEO.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4 h-14 w-14 text-center">
                  <span className="text-2xl">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Download & Share</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Export as TXT, SRT, or PDF—perfect for captions, quotes, blog
                  posts, and social media.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg mb-8">
            Trusted by over 100,000 creators for fast, accurate YouTube
            transcript extraction.
          </p>

          <div className="max-w-3xl mx-auto bg-[#f5f5f5] dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);
                const videoId = getVideoId(demoUrl);
                if (videoId) {
                  router.push(`/transcript/${videoId}`);
                } else {
                  toast.error("Please enter a valid YouTube URL");
                  setIsLoading(false);
                }
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Paste YouTube URL here..."
                  className="flex-1 h-12 bg-white backdrop-blur-sm border-gray-400 border-2 py-4 text-black placeholder:text-black placeholder:font-medium"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                />
                <Button
                  type="submit"
                  className="h-12 px-8 bg-black hover:bg-gray-800 text-white font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Generate My Free Transcript"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
