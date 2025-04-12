"use client";

import { useState } from "react";
import { useTranscriptStore } from "@/store/transcript-store";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

// Language options for demonstration
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "ko", name: "Korean" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "pl", name: "Polish" },
];

export default function TranslationSettings() {
  const { setTranslationTarget, translationTarget } = useTranscriptStore();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleTranslate = () => {
    if (selectedLanguage) {
      setTranslationTarget(selectedLanguage);
    }
  };

  const handleCancelTranslation = () => {
    setTranslationTarget(null);
    setSelectedLanguage("");
  };

  return (
    <div className="p-5 bg-[#FFF4E6] dark:bg-[#3A2A15] rounded-lg mb-6 border border-[#FFAC5F] dark:border-[#FFAC5F]/30">
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
              value="en"
              disabled
            >
              <option value="en">English</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
              <span className="inline-block px-2 py-1 bg-[#FFAC5F]/20 rounded text-[#FF9933] dark:text-[#FFAC5F]">
                Auto-detected
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="translate" className="block text-sm font-medium mb-1">
            Translate to
          </label>
          <div className="flex gap-2">
            <select
              id="translate"
              className="flex-1 h-10 px-3 rounded-md border border-[#FFAC5F]/50 bg-white dark:bg-[#1F1F1F]"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              disabled={!!translationTarget}
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            {translationTarget ? (
              <Button
                onClick={handleCancelTranslation}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleTranslate}
                className="bg-[#FFAC5F] hover:bg-[#FF9933] text-black font-medium"
                disabled={!selectedLanguage}
              >
                Translate
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
