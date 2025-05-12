import { languages, fallbackLng } from "@/i18n/settings";

export async function generateStaticParams() {
  // Filter out English (fallbackLng) since Terms page should only be in English
  return languages.filter((lng) => lng !== fallbackLng).map((lng) => ({ lng }));
}
