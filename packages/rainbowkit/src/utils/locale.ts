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

export const isIncluded = (keys: string[], key: string) => {
  return keys.includes(key);
};

// biome-ignore format: locale keys
export const standardizeBrowserLocale: Record<string | Locale, Locale> = {
  'en': 'en-US',
  'en-US': 'en-US',
  'es': 'es-419',
  'es-419': 'es-419',
  'fr': 'fr-FR',
  'fr-FR': 'fr-FR',
  'ja': 'ja-JP',
  'ja-JP': 'ja-JP',
  'pt': 'pt-BR',
  'pt-BR': 'pt-BR',
  'zh': 'zh-CN',
  'zh-CN': 'zh-CN',
  'id': 'id-ID',
  'id-ID': 'id-ID',
  'hi': 'hi-IN',
  'hi-IN': 'hi-IN',
  'tr': 'tr-TR',
  'tr-TR': 'tr-TR',
  'ru': 'ru-RU',
  'ru-RU': 'ru-RU',
};
