"use client";

import I18nLink from "@/components/i18n-link";
import { useT } from "@/i18n/client";

interface FooterProps {
  lng?: string;
}

export default function Footer({ lng }: FooterProps) {
  const { t } = useT();
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="w-[90%] mx-auto">
        <div className="text-sm text-muted-foreground mb-4">
          <p className="mb-4">
            Disclaimer: YouTranscripts is an independent service and is not
            associated or affiliated with YouTube or Google. Any brand names or
            logos displayed on this site are used for illustrative purposes only
            and do not imply endorsement or partnership.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <I18nLink
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("header.about")}
            </I18nLink>
            <I18nLink
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("header.terms")}
            </I18nLink>
            <I18nLink
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("header.privacy")}
            </I18nLink>
            <I18nLink
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("header.contact")}
            </I18nLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
