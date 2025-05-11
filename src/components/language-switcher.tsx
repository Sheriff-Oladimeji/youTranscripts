"use client";

import { useParams, usePathname } from "next/navigation";
import { languages } from "@/i18n/settings";
import { useT } from "@/i18n/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { t } = useT();
  const params = useParams();
  const pathname = usePathname();
  const currentLang = (params?.lng as string) || "en";

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

  // Map language codes to display names
  const languageNames: Record<string, string> = {
    en: "English",
    es: "Español",
    pt: "Português",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{languageNames[currentLang]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={lang === currentLang ? "font-bold" : ""}
          >
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
