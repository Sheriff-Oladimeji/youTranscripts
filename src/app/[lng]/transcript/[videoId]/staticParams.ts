import { languages } from "@/i18n/settings";

export async function generateStaticParams() {
  // For transcript pages, we only generate the language routes
  // The videoId will be dynamic
  return languages.map((lng) => ({ lng }));
}
