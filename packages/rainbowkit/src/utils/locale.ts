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

// biome-ignore format: locale keys
export const standardizeBrowserLocale: Record<string | Locale, Locale> = {
  'ar': 'ar-AR',
  'ar-AR': 'ar-AR',
  'en': 'en-US',
  'en-US': 'en-US',
  'es': 'es-419',
  'es-419': 'es-419',
  'fr': 'fr-FR',
  'fr-FR': 'fr-FR',
  'hi': 'hi-IN',
  'hi-IN': 'hi-IN',
  'id': 'id-ID',
  'id-ID': 'id-ID',
  'ja': 'ja-JP',
  'ja-JP': 'ja-JP',
  'ko': 'ko-KR',
  'ko-KR': 'ko-KR',
  'pt': 'pt-BR',
  'pt-BR': 'pt-BR',
  'ru': 'ru-RU',
  'ru-RU': 'ru-RU',
  'th': 'th-TH',
  'th-TH': 'th-TH',
  'tr': 'tr-TR',
  'tr-TR': 'tr-TR',
  'zh': 'zh-CN',
  'zh-CN': 'zh-CN',
};
