"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface BookmarkPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookmarkPopup({ isOpen, onClose }: BookmarkPopupProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Check if user is on macOS
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMac(userAgent.indexOf("mac") !== -1);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md mx-4 shadow-xl">
        {/* Success notification */}
        <div className="bg-[#e8f5e9] p-6 rounded-t-lg flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-1 text-center">
            Transcript copied to clipboard!
          </h2>
        </div>

        {/* Bookmark card */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-b-lg">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <h3 className="text-xl font-bold mb-3">
            Bookmark YouTranscripts for Next Time
          </h3>

          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Need another transcript later? Save this page now and reach it in
            one click.
          </p>

          <p className="mb-4 font-medium">
            Press{" "}
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {isMac ? "⌘" : "Ctrl"} + D
            </span>{" "}
            {isMac ? "(Mac)" : "(Windows)"}
            {!isMac ? " or " : ""}
            {!isMac ? (
              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-1">
                ⌘ + D
              </span>
            ) : (
              ""
            )}
            {!isMac ? " (Mac)" : ""}
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xl">⏱️</span>
              <div>
                <span className="font-medium">Save time:</span> Jump straight to
                transcripts—skip search.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <span className="font-medium">Stay in flow:</span> Keep your
                creative rhythm unbroken.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">📈</span>
              <div>
                <span className="font-medium">Work smarter:</span> Your goto
                tool, one shortcut away.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
