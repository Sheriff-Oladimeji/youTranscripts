import i18n from "./i18next";
import { fallbackLng, languages } from "./settings";

export async function getT(
  ns?: string | string[],
  options?: { keyPrefix?: string }
) {
  // Get language from params in the server component
  const getTranslation = async (lng: string = fallbackLng) => {
    // Make sure the language is supported
    const language = languages.includes(lng) ? lng : fallbackLng;

    // Change language if needed
    if (i18n.resolvedLanguage !== language) {
      await i18n.changeLanguage(language);
    }

    // Load namespace if needed
    if (ns && !i18n.hasLoadedNamespace(ns)) {
      await i18n.loadNamespaces(ns);
    }

    return {
      t: i18n.getFixedT(
        language,
        Array.isArray(ns) ? ns[0] : ns,
        options?.keyPrefix
      ),
      i18n,
    };
  };

  return getTranslation();
}
