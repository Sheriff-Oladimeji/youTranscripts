"use client";

import { useEffect, useState } from "react";

interface TranscriptHeaderProps {
  videoId: string;
  title: string;
  isLoading: boolean;
  error: string | null;
}

interface ChannelInfo {
  channelTitle: string;
  channelId: string;
}

export default function TranscriptHeader({
  videoId,
  title,
  isLoading,
  error,
}: TranscriptHeaderProps) {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [isLoadingChannel, setIsLoadingChannel] = useState(false);

  useEffect(() => {
    const fetchChannelInfo = async () => {
      if (!videoId || isLoading || error) return;

      setIsLoadingChannel(true);
      try {
        const response = await fetch(`/api/channel?videoId=${videoId}`);
        if (response.ok) {
          const data = await response.json();
          setChannelInfo({
            channelTitle: data.channelTitle || "YouTube Creator",
            channelId: data.channelId || "",
          });
        }
      } catch (error) {
        console.error("Error fetching channel info:", error);
      } finally {
        setIsLoadingChannel(false);
      }
    };

    fetchChannelInfo();
  }, [videoId, isLoading, error]);

  // Like and Subscribe functions removed

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {isLoading
          ? "Loading transcript..."
          : error
          ? "Error loading transcript"
          : title
          ? `Transcript of ${title}`
          : `Transcript of YouTube Video`}
      </h1>

      {!isLoading && !error && (
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="mr-2">Author:</span>
            <span className="font-medium">
              {isLoadingChannel
                ? "Loading..."
                : channelInfo?.channelTitle || "YouTube Creator"}
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
