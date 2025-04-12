"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVideoId } from "@/lib/youtube";

export default function HowToSection() {
  const [demoUrl, setDemoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <section className="w-full py-12 bg-background" id="how-to">
      <div className="w-[90%] mx-auto">
        <div className="bg-pink-100 dark:bg-pink-950/30 text-foreground rounded-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center">
            How to Generate a YouTubeTranscriptTool{" "}
            <Video className="ml-2 h-6 w-6" />
          </h2>

          <ol className="space-y-4 max-w-[800px] mx-auto list-decimal list-inside mb-8">
            <li className="text-lg">
              Paste the YouTube video link and click &quot;Get Transcript.&quot;
            </li>
            <li className="text-lg">
              Customize your transcript by removing unwanted sections and
              selecting your language.
            </li>
            <li className="text-lg">
              Explore our AI Prompt Library and take your transcript to the next
              level!
            </li>
          </ol>

          <p className="text-lg font-medium text-center mb-6">
            Try it below 👇
          </p>

          <div className="bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto">
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
                  className="flex-1 h-12 bg-white py-4 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                />
                <Button
                  type="submit"
                  className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Get Free Transcript"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
