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

    // For all language changes, use a hard refresh to avoid caching issues
    // Get the path segments
    const segments = pathname.split("/").filter(Boolean);

    // The first segment should be the current language
    if (segments.length > 0 && languages.includes(segments[0])) {
      // Replace the language segment
      segments[0] = newLang;
    } else {
      // If no language segment exists, add it at the beginning
      segments.unshift(newLang);
    }

    // Reconstruct the path
    const newPathname = `/${segments.join("/")}`;

    // Use window.location for a full page refresh
    window.location.href = newPathname;
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
