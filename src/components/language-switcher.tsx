"use client";

import { useParams, usePathname } from "next/navigation";
import { languages } from "@/i18n/settings";
import { useT } from "@/i18n/client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher() {
  const { t } = useT();
  const params = useParams();
  const pathname = usePathname();
  const currentLang = (params?.lng as string) || "en";

  // Check if we're on an English-only page
  const englishOnlyPages = ["/about", "/privacy", "/contact", "/terms"];
  const isEnglishOnlyPage = englishOnlyPages.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`)
  );

  // Don't render the language switcher on English-only pages
  if (isEnglishOnlyPage) {
    return null;
  }

  const handleLanguageChange = (newLang: string) => {
    if (newLang === currentLang) return;

    // Set the language cookie
    document.cookie = `i18next=${newLang};path=/;max-age=31536000`;

    // Get the path segments
    const segments = pathname.split("/").filter(Boolean);

    // Handle transcript pages specially
    const isTranscriptPage = segments.includes("transcript");

    // Special handling for English
    if (newLang === "en") {
      let newPath = "/";
      if (segments.length > 0) {
        // If we're in a transcript page, keep that path
        if (isTranscriptPage) {
          const videoId = segments[segments.length - 1];
          newPath = `/transcript/${videoId}`;
        } else {
          // For other pages, remove the language prefix if it exists
          if (languages.includes(segments[0])) {
            segments.shift();
          }
          newPath = `/${segments.join("/")}`;
        }
      }
      window.location.href = newPath;
      return;
    }

    // For non-English languages
    let newPath = `/${newLang}`;
    if (segments.length > 0) {
      if (isTranscriptPage) {
        // For transcript pages, ensure correct path structure
        const videoId = segments[segments.length - 1];
        newPath = `/${newLang}/transcript/${videoId}`;
      } else {
        // For other pages, handle normally
        if (languages.includes(segments[0])) {
          segments[0] = newLang;
        } else {
          segments.unshift(newLang);
        }
        newPath = `/${segments.join("/")}`;
      }
    }

    window.location.href = newPath;
  };

  // Map language codes to display names and flags
  const languageInfo: Record<string, { name: string; flag: string }> = {
    en: { name: "English", flag: "/flags/us.svg" },
    es: { name: "Español", flag: "/flags/es.svg" },
    pt: { name: "Português", flag: "/flags/pt.svg" },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-full border-gray-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 dark:border-gray-800 dark:bg-gray-950/50 dark:hover:bg-gray-950/80 px-3 h-9"
        >
          <div className="relative w-5 h-5 overflow-hidden rounded-full">
            <Image
              src={languageInfo[currentLang].flag}
              alt={languageInfo[currentLang].name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">
            {languageInfo[currentLang].name}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[150px] p-1 rounded-xl border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              lang === currentLang
                ? "bg-gray-100 font-medium dark:bg-gray-800/60"
                : "hover:bg-gray-100 dark:hover:bg-gray-800/60"
            }`}
          >
            <div className="relative w-5 h-5 overflow-hidden rounded-full">
              <Image
                src={languageInfo[lang].flag}
                alt={languageInfo[lang].name}
                fill
                className="object-cover"
              />
            </div>
            <span>{languageInfo[lang].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
