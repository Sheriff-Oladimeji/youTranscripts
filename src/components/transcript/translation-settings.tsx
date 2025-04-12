"use client";

import { useEffect } from "react";
import { useTranscriptStore } from "@/store/transcript-store";
import { useTranslationStore, languages } from "@/store/translation-store";

import { Globe } from "lucide-react";

export default function TranslationSettings() {
  const { transcript } = useTranscriptStore();
  const {
    translateTo,
    currentLanguage,
    originalLanguage,
    isTranslating,
    error,
    setOriginalTranscript,
  } = useTranslationStore();

  // Sync the transcript with the translation store
  useEffect(() => {
    if (transcript.length > 0) {
      // For demo purposes, we're assuming English as the detected language
      // In a real app, you would get this from the API or use language detection
      setOriginalTranscript(transcript, "en");
    }
  }, [transcript, setOriginalTranscript]);

  return (
    <div className="p-5 bg-[#FFF4E6] dark:bg-[#3A2A15] rounded-lg mb-6 border border-[#FFAC5F] dark:border-[#FFAC5F]/30">
      {error && (
        <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded">
          <p className="text-sm font-medium">Translation error: {error}</p>
        </div>
      )}
      <div className="flex items-center mb-4">
        <Globe className="h-5 w-5 mr-2 text-[#FF9933]" />
        <h3 className="text-lg font-medium">Language & Translation Settings</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="language" className="block text-sm font-medium mb-1">
            Language
          </label>
          <div className="relative">
            <select
              id="language"
              className="w-full h-10 px-3 rounded-md border border-[#FFAC5F]/50 bg-white dark:bg-[#1F1F1F]"
              value={currentLanguage}
              onChange={(e) => translateTo(e.target.value)}
              disabled={isTranslating}
            >
              {/* Put original language first */}
              {languages
                .filter((lang) => lang.code === originalLanguage)
                .map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} (Original)
                  </option>
                ))}

              {/* Then all other languages */}
              {languages
                .filter((lang) => lang.code !== originalLanguage)
                .map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
            </select>
          </div>

          {isTranslating && (
            <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
              <p className="text-sm flex items-center">
                <span className="inline-block animate-pulse mr-2">⏳</span>
                Translating... Please wait
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
