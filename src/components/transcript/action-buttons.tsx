"use client";

import { useState, useEffect, useRef } from "react";
import { useTranscriptStore } from "@/store/transcript-store";
import {
  Brain,
  MessageSquare,
  Copy,
  Shield,
  ExternalLink,
  Languages,
  Download,
  FileText,
  FileType,
} from "lucide-react";
import { toast } from "sonner";
import {
  formatTranscriptForDownload,
  generateUniqueId,
  downloadTextFile,
} from "@/lib/utils";

interface ActionButtonsProps {
  videoId?: string; // Make it optional to maintain backward compatibility
  onTranslateClick: () => void;
}

export default function ActionButtons({
  videoId, // We don't use this prop currently, but keep it for type compatibility
  onTranslateClick,
}: ActionButtonsProps) {
  const { transcript, videoTitle } = useTranscriptStore();
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside and keyboard events to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFormatOptions(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowFormatOptions(false);
      }
    }

    // Add event listeners when dropdown is open
    if (showFormatOptions) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showFormatOptions]);

  const handleCopyTranscript = () => {
    const text = transcript.map((item) => item.text).join(" ");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Transcript copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy transcript:", err);
        toast.error("Failed to copy transcript. Please try again.");
      });
  };

  return (
    <div className="space-y-3 mb-6">
      {/* Copy Transcript Button */}
      <button
        className="w-full py-4 px-6 bg-[#FFD700] hover:bg-[#FFCC00] text-black font-medium rounded-lg flex items-center justify-center gap-2"
        onClick={handleCopyTranscript}
        disabled={transcript.length === 0}
      >
        <Copy className="h-5 w-5 mr-2" />
        <span>Copy Transcript</span>
      </button>

      {/* Download Transcript Button with Format Options */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="w-full py-4 px-6 bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium rounded-lg flex items-center justify-center gap-2"
          onClick={() => setShowFormatOptions(!showFormatOptions)}
          disabled={transcript.length === 0}
        >
          <Download className="h-5 w-5 mr-2" />
          <span>Download Transcript</span>
        </button>

        {/* Format Options Dropdown */}
        {showFormatOptions && transcript.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Select Format:
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* TXT Format */}
              <button
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => {
                  // Generate a unique filename
                  const filename = generateUniqueId();

                  // Format the transcript content as TXT
                  const content = formatTranscriptForDownload(
                    transcript,
                    videoTitle,
                    "txt"
                  );

                  // Download the file
                  downloadTextFile(content, filename, "txt");

                  // Show success toast and close dropdown
                  toast.success("Transcript downloaded as TXT!");
                  setShowFormatOptions(false);
                }}
              >
                <FileText className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium">Plain Text (.txt)</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  - Simple text format
                </span>
              </button>

              {/* PDF Format */}
              <button
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => {
                  const filename = generateUniqueId();
                  const content = formatTranscriptForDownload(
                    transcript,
                    videoTitle,
                    "pdf"
                  );
                  downloadTextFile(content, filename, "pdf");
                  toast.success("Transcript downloaded as PDF!");
                  setShowFormatOptions(false);
                }}
              >
                <FileType className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium">PDF Document (.pdf)</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  - Printable document
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Language & Translation Settings Button */}
      <button
        className="w-full py-4 px-6 bg-[#FFAC5F] hover:bg-[#FF9933] text-black font-medium rounded-lg flex items-center justify-center gap-2"
        onClick={onTranslateClick}
      >
        <Languages className="h-5 w-5 mr-2" />
        <span>Language & Translation Settings</span>
      </button>

      {/* Chat with Video Button */}
      <button
        className="w-full py-4 px-6 bg-[#FFAC5F] hover:bg-[#FF9933] text-black font-medium rounded-lg flex items-center gap-2"
        onClick={() => toast.info("This feature is coming soon!")}
      >
        <div className="flex items-center justify-center flex-1">
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Chat With This Video</span>
          <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">
            free
          </span>
        </div>
        <ExternalLink className="h-5 w-5" />
      </button>

      {/* Summarize Button */}
      <button
        className="w-full py-4 px-6 bg-[#00AAFF] hover:bg-[#0099EE] text-white font-medium rounded-lg flex items-center gap-2"
        onClick={() => toast.info("This feature is coming soon!")}
      >
        <div className="flex items-center justify-center flex-1">
          <Brain className="h-5 w-5 mr-2" />
          <span>Summarize</span>
          <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">
            free
          </span>
        </div>
        <ExternalLink className="h-5 w-5" />
      </button>

      {/* Remove Sponsor Button */}
      <button
        className="w-full py-4 px-6 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-medium rounded-lg flex items-center justify-center gap-2"
        onClick={() => toast.info("This feature is coming soon!")}
      >
        <Shield className="h-5 w-5 mr-2" />
        <span>Remove Sponsor, Interaction and More</span>
      </button>
    </div>
  );
}
