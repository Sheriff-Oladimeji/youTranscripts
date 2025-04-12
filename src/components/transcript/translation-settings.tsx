"use client";

import { useEffect } from "react";
import { useTranscriptStore } from "@/store/transcript-store";
import { useTranslationStore, languages } from "@/store/translation-store";

import { Globe } from "lucide-react";

export default function TranslationSettings() {
  const { transcript, detectedLanguage } = useTranscriptStore();
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
      // Use the detected language from the transcript store
      setOriginalTranscript(transcript, detectedLanguage);
    }
  }, [transcript, detectedLanguage, setOriginalTranscript]);

  return (
    <div className="p-5 bg-[#222] dark:bg-[#111] rounded-lg mb-6 border border-gray-700">
      {error && (
        <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded">
          <p className="text-sm font-medium">Translation error: {error}</p>
        </div>
      )}
      <div className="flex items-center mb-4">
        <Globe className="h-5 w-5 mr-2 text-white" />
        <h3 className="text-lg font-medium text-white">
          Language & Translation Settings
        </h3>
      </div>

      <div className="space-y-4">
        {/* Original Language Row */}
        <div className="flex items-center gap-2 bg-[#333] dark:bg-[#222] p-3 rounded-lg">
          <div className="flex-grow">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              <select
                id="original-language"
                className="w-full h-10 px-3 rounded-md border border-gray-600 bg-[#222] dark:bg-[#111] text-white"
                value={originalLanguage}
                disabled={true}
              >
                {languages
                  .filter((lang) => lang.code === originalLanguage)
                  .map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={() => translateTo(originalLanguage)}
            disabled={currentLanguage === originalLanguage || isTranslating}
          >
            Change Language
          </button>
        </div>

        {/* Translation Row */}
        <div className="flex items-center gap-2 bg-[#333] dark:bg-[#222] p-3 rounded-lg">
          <div className="flex-grow">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-orange-400" />
              <select
                id="translate-to"
                className="w-full h-10 px-3 rounded-md border border-gray-600 bg-[#222] dark:bg-[#111] text-white"
                value={
                  currentLanguage !== originalLanguage ? currentLanguage : ""
                }
                onChange={(e) => e.target.value && translateTo(e.target.value)}
                disabled={isTranslating}
              >
                <option value="">Translate to</option>
                {languages
                  .filter((lang) => lang.code !== originalLanguage)
                  .map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
            onClick={() => {
              const select = document.getElementById(
                "translate-to"
              ) as HTMLSelectElement;
              if (select && select.value) {
                translateTo(select.value);
              }
            }}
            disabled={isTranslating}
          >
            Translate
          </button>
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
  );
}
