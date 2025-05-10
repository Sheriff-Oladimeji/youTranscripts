import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { fallbackLng, languages, defaultNS } from "./settings";

// Create a basic i18next instance for server-side use
const i18n = i18next.createInstance();

i18n
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    defaultNS,
    ns: [defaultNS],
    preload: languages,
  });

export default i18n;
