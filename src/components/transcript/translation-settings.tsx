"use client";

import { useEffect, useState } from "react";
import { useTranscriptStore } from "@/store/transcript-store";
import { useTranslationStore, languages } from "@/store/translation-store";
import { Globe, Check, Loader2, Info, ChevronDown } from "lucide-react";
import { useT } from "@/i18n/client";

export default function TranslationSettings() {
  const { transcript, detectedLanguage } = useTranscriptStore();
  const {
    translateTo,
    currentLanguage,
    originalLanguage,
    isTranslating,
    error,
    setOriginalTranscript,
    progress,
    cancelTranslation,
  } = useTranslationStore();
  const { t } = useT();

  // Debug logging for language detection
  useEffect(() => {
    console.log("TranslationSettings - Detected language:", detectedLanguage);
    console.log("TranslationSettings - Original language:", originalLanguage);
    console.log("TranslationSettings - Current language:", currentLanguage);

    // Log the first few transcript items to check content
    if (transcript.length > 0) {
      console.log(
        "TranslationSettings - Transcript sample:",
        transcript.slice(0, 3)
      );
    }
  }, [transcript, detectedLanguage, originalLanguage, currentLanguage]);

  // Sync the transcript with the translation store
  useEffect(() => {
    if (transcript.length > 0) {
      // Use the detected language from the transcript store
      setOriginalTranscript(transcript, detectedLanguage);
    }
  }, [transcript, detectedLanguage, setOriginalTranscript]);

  // Get the name of the original language
  const originalLanguageName =
    languages.find((lang) => lang.code === originalLanguage)?.name ||
    "Original";

  // Get the name of the current language
  const currentLanguageName =
    languages.find((lang) => lang.code === currentLanguage)?.name || "Original";

  // Track the target language during translation
  const [targetLanguage, setTargetLanguage] = useState(currentLanguage);

  // Get the name of the target language
  const targetLanguageName =
    languages.find((lang) => lang.code === targetLanguage)?.name || "Original";

  return (
    <div className="p-5 bg-[#222] dark:bg-[#111] rounded-lg mb-6 border border-gray-700 shadow-lg">
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm font-medium">
            {t("transcript.translationSettings.error")} {error}
          </p>
        </div>
      )}

      <div className="flex items-center mb-5">
        <Globe className="h-5 w-5 mr-2 text-white" />
        <h3 className="text-lg font-medium text-white">
          {t("transcript.translationSettings.title")}
        </h3>
      </div>

      {/* Language detection info */}
      <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start">
          <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">
              {t("transcript.translationSettings.detected")}{" "}
              {originalLanguageName}
            </p>
            <p className="text-xs mt-1">
              {t("transcript.translationSettings.autoDetected")}
              {detectedLanguage !== "en" && (
                <span className="block mt-1 font-medium">
                  {t("transcript.translationSettings.originalLanguage")} (
                  {originalLanguageName}).
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-[#333] to-[#2a2a2a] dark:from-[#222] dark:to-[#1a1a1a] p-4 rounded-xl shadow-inner">
          <div className="w-full sm:w-[80%]">
            <div className="flex items-center w-full">
              <Globe className="h-5 w-5 mr-3 text-blue-400" />
              <div className="relative flex-1">
                <select
                  id="language-selector"
                  className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-600 bg-[#222] dark:bg-[#111] text-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={currentLanguage}
                  onChange={(e) => {
                    if (e.target.value) {
                      setTargetLanguage(e.target.value);
                      translateTo(e.target.value);
                    }
                  }}
                  disabled={isTranslating}
                >
                  {/* Original language option */}
                  <option value={originalLanguage}>
                    {originalLanguageName} (
                    {t("transcript.translationSettings.original")})
                  </option>

                  {/* Divider */}
                  <option disabled className="bg-gray-700">
                    ───────────────
                  </option>

                  {/* Other languages */}
                  {languages
                    .filter((lang) => lang.code !== originalLanguage)
                    .map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <button
            className={`w-full  sm:w-[20%] h-12 px-4 py-2 flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ${
              isTranslating
                ? "bg-gray-600 cursor-not-allowed"
                : currentLanguage === originalLanguage
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
            onClick={() => {
              if (isTranslating) {
                // Cancel translation if already in progress
                cancelTranslation();
              } else {
                const select = document.getElementById(
                  "language-selector"
                ) as HTMLSelectElement;
                if (select && select.value) {
                  setTargetLanguage(select.value);
                  translateTo(select.value);
                }
              }
            }}
            disabled={false} // Never disabled so we can cancel
          >
            {isTranslating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("transcript.translationSettings.cancel")}
              </>
            ) : currentLanguage === originalLanguage ? (
              <>
                <Check className="h-4 w-4" />
                {t("transcript.translationSettings.original")}
              </>
            ) : (
              <>{t("transcript.translationSettings.translate")}</>
            )}
          </button>
        </div>

        {/* Current language indicator */}
        {!isTranslating && (
          <div className="mt-3 text-sm text-gray-300 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            {t("transcript.translationSettings.currentlyViewing")}{" "}
            <span className="font-medium ml-1">{currentLanguageName}</span>
            {currentLanguage !== originalLanguage && (
              <button
                onClick={() => {
                  setTargetLanguage(originalLanguage);
                  translateTo(originalLanguage);
                }}
                className="ml-3 text-xs text-blue-400 hover:text-blue-300 underline"
              >
                {t("transcript.translationSettings.resetToOriginal")}
              </button>
            )}
          </div>
        )}

        {isTranslating && (
          <div className="mt-4">
            {/* Translation Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm flex items-center text-blue-300">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {t("transcript.translationSettings.translatingTo")}{" "}
              {targetLanguageName}... {progress}%{" "}
              {t("transcript.translationSettings.complete")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
