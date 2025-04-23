"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clipboard, Globe, FileText, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getVideoId } from "@/lib/youtube";
import { useTranscriptStore } from "@/store/transcript-store";

export default function PromotionalSection() {
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
    <section className="w-full py-16 md:py-20 bg-[#f5f5f5] dark:bg-gray-900">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl">
            Instant, Free YouTube Video Transcript Generator – Copy, Translate &
            Download
          </h2>
          <p className="max-w-[800px] text-lg mb-10">
            Use our YouTube video to text converter in seconds—no signup, no
            limits, 100% free.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-10">
            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <Clipboard className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  One Click Transcripts
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Paste your YouTube URL and hit &quot;Get Transcript&quot; to
                  see the full video text instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Instant Copy & Download
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Grab any line or the entire script with a single click—perfect
                  for quotes, captions, or blog content.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <Globe className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">100+ Languages</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Translate your transcript on the spot into over 100 languages
                  for global reach.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                <Languages className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Flexible Downloads</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Export as TXT, SRT, DOCx or PDF to use in SEO, social media,
                  video captions, or study notes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
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
          </div>
        </div>
      </div>
    </section>
  );
}
