import { Locale } from '../locales';

// Detect user locale from browser
export const getDetectedBrowserLocale = () => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    if (navigator.languages?.length) {
      return navigator.languages[0];
    }

    if (navigator.language) {
      return navigator.language;
    }
  }
};

export const locales = [
  'en-US',
  'es-419',
  'fr-FR',
  'ja-JP',
  'pt-BR',
  'zh-CN',
  'id-ID',
  'hi-IN',
  'tr-TR',
  'ru-RU',
];

// We will get locale from browser and return the locale which we support
export const isBrowserLocaleSupported = (locale: string) => {
  return locales.includes(locale as Locale);
};
