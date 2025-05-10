import i18n from "./i18next";
import { fallbackLng, languages } from "./settings";

export async function getT(
  ns?: string | string[],
  options?: { keyPrefix?: string },
  lng?: string
) {
  // Get language from params in the server component
  const getTranslation = async (language: string = fallbackLng) => {
    // Make sure the language is supported
    const validLanguage = languages.includes(language) ? language : fallbackLng;

    // Change language if needed
    if (i18n.resolvedLanguage !== validLanguage) {
      await i18n.changeLanguage(validLanguage);
    }

    // Load namespace if needed
    if (ns && !i18n.hasLoadedNamespace(ns)) {
      await i18n.loadNamespaces(ns);
    }

    return {
      t: i18n.getFixedT(
        validLanguage,
        Array.isArray(ns) ? ns[0] : ns,
        options?.keyPrefix
      ),
      i18n,
    };
  };

  return getTranslation(lng);
}
