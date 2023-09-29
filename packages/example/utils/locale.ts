import { Locale } from "@rainbow-me/rainbowkit";
// Detect user locale from browser
export const getDetectedBrowserLocale = () => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    if (navigator.languages?.length) {
      return navigator.languages[0];
    }

    if (navigator.language) {
      return navigator.language;
    }
  }
};

// We will get locale from browser and return the locale which we support
export const getSupportedLocaleFromBrowser = (locale: string) => {
  switch (locale) {
    case "en-US":
      return Locale.EN_US;

    case "es-419":
      return Locale.ES_419;

    case "fr-FR":
      return Locale.FR_FR;

    case "ja-JP":
      return Locale.JA_JP;

    case "pt-BR":
      return Locale.PT_BR;

    case "zh-CN":
      return Locale.ZH_CN;

    case "id-ID":
      return Locale.ID_ID;

    case "hi-IN":
      return Locale.HI_IN;

    case "tr-TR":
      return Locale.TR_TR;

    case "ru-RU":
      return Locale.TR_TR;

    default:
      return Locale.EN_US;
  }
};
