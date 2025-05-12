"use client";

import I18nLink from "@/components/i18n-link";
import { useT } from "@/i18n/client";
import { usePathname } from "next/navigation";

interface FooterProps {
  lng?: string;
}

export default function Footer({ lng }: FooterProps) {
  const { t } = useT();
  const pathname = usePathname();

  // Check if we're on an English-only page
  const englishOnlyPages = ["/about", "/privacy", "/contact", "/terms"];
  const isEnglishOnlyPage = englishOnlyPages.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`)
  );

  // Use English translations for English-only pages
  const getTranslation = (key: string) => {
    // If we're on an English-only page, use the English translations
    if (isEnglishOnlyPage) {
      // These are hardcoded English translations for the footer
      const englishTranslations: Record<string, string> = {
        "footer.disclaimer":
          "Legal notice: YouTranscripts is an independent service and not affiliated with YouTube or Google. Any brand name or logo shown on this site is used for illustrative purposes only and does not imply endorsement or association.",
        "footer.copyright": "© 2025 YouTranscripts. All rights reserved.",
        "header.about": "About",
        "header.terms": "Terms of Service",
        "header.privacy": "Privacy Policy",
        "header.contact": "Contact",
      };
      return englishTranslations[key] || key;
    }
    // Otherwise use the normal translation function
    return t(key);
  };

  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="w-[90%] mx-auto">
        <div className="text-sm text-muted-foreground mb-4">
          <p className="mb-4">{getTranslation("footer.disclaimer")}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {getTranslation("footer.copyright")}
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <I18nLink
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {getTranslation("header.about")}
            </I18nLink>
            <I18nLink
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {getTranslation("header.terms")}
            </I18nLink>
            <I18nLink
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {getTranslation("header.privacy")}
            </I18nLink>
            <I18nLink
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {getTranslation("header.contact")}
            </I18nLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
