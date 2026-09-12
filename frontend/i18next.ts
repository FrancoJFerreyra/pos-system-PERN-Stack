import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { DEFAULT_LANGUAGE_KEY } from "./src/shared/lib/storage";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: localStorage.getItem(DEFAULT_LANGUAGE_KEY) || "en",
    debug: false,
    defaultNS: "common",
    ns: ["common", "products"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      requestOptions: {
        mode: "cors",
        credentials: "same-origin",
        cache: "no-store",
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
