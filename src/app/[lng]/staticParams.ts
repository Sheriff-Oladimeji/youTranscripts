import { languages, fallbackLng } from "@/i18n/settings";

// Only generate non-English language pages
export function generateStaticParams() {
  return languages.filter((lng) => lng !== fallbackLng).map((lng) => ({ lng }));
}
