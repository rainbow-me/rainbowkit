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

export const standardizeBrowserLocale = (
  locale: string,
): Locale | undefined => {
  if (isIncluded(['en-US', 'en'], locale)) {
    return 'en-US';
  }

  if (isIncluded(['es', 'es-419'], locale)) {
    return 'es-419';
  }

  if (isIncluded(['fr', 'fr-FR'], locale)) {
    return 'fr-FR';
  }

  if (isIncluded(['pt', 'pt-BR'], locale)) {
    return 'pt-BR';
  }

  if (isIncluded(['pt', 'pt-BR'], locale)) {
    return 'pt-BR';
  }

  if (isIncluded(['zh', 'zh-CN'], locale)) {
    return 'zh-CN';
  }

  if (isIncluded(['id', 'id-ID'], locale)) {
    return 'id-ID';
  }

  if (isIncluded(['hi', 'hi-IN'], locale)) {
    return 'hi-IN';
  }

  if (isIncluded(['tr', 'tr-TR'], locale)) {
    return 'tr-TR';
  }

  if (isIncluded(['ru', 'ru-RU'], locale)) {
    return 'ru-RU';
  }
};
