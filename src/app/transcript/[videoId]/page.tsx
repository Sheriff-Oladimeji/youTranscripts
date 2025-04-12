"use client";

import { useEffect } from "react";
import { useTranscriptStore } from "@/store/transcript-store";
import { EmbeddedVideo } from "@/components/embedded-video";
import TranscriptViewer from "@/components/transcript/transcript-viewer";
import TranscriptHeader from "@/components/transcript/transcript-header";
import TranscriptControls from "@/components/transcript/transcript-controls";
import TranslationSettings from "@/components/transcript/translation-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { use } from "react";

export default function TranscriptPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const resolvedParams = use(params);
  const { videoId } = resolvedParams;

  const {
    fetchTranscriptData,
    isLoading,
    error,
    transcript,
    videoTitle,
    translationTarget,
  } = useTranscriptStore();

  useEffect(() => {
    if (videoId) {
      fetchTranscriptData(videoId);
    }
  }, [videoId, fetchTranscriptData]);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Video Section */}
      <EmbeddedVideo videoId={videoId} />

      <div className="w-full max-w-[800px] mx-auto px-4 py-6">
        {/* Transcript Header */}
        <TranscriptHeader
          title={videoTitle}
          isLoading={isLoading}
          error={error}
        />

        {/* Tabs for Transcript and AI */}
        <Tabs defaultValue="transcript" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
          </TabsList>

          <TabsContent value="transcript" className="space-y-4">
            {/* Transcript Controls */}
            <TranscriptControls />

            {/* Translation Settings */}
            <TranslationSettings />

            {/* Transcript Content */}
            <TranscriptViewer
              transcript={transcript}
              isLoading={isLoading}
              error={error}
              isTranslated={!!translationTarget}
            />
          </TabsContent>

          <TabsContent value="ai">
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-bold mb-4">
                AI Features Coming Soon
              </h3>
              <p>
                We&apos;re working on integrating AI features to help you
                summarize, analyze, and get more value from your transcripts.
                Stay tuned!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
