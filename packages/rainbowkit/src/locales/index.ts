import type * as I18nTypes from 'i18n-js';
import { I18n } from 'i18n-js/dist/require/index.js';

import en_US from './en_US.json';

export type Locale =
  | 'ar'
  | 'ar-AR'
  | 'en'
  | 'en-US'
  | 'es'
  | 'es-419'
  | 'fr'
  | 'fr-FR'
  | 'hi'
  | 'hi-IN'
  | 'id'
  | 'id-ID'
  | 'ja'
  | 'ja-JP'
  | 'ko'
  | 'ko-KR'
  | 'pt'
  | 'pt-BR'
  | 'ru'
  | 'ru-RU'
  | 'th'
  | 'th-TH'
  | 'tr'
  | 'tr-TR'
  | 'zh'
  | 'zh-CN';

// biome-ignore format: locale keys
export const i18n: I18nTypes.I18n = new I18n({
  'en': en_US,
  'en-US': en_US,
});

i18n.defaultLocale = 'en-US';
i18n.locale = 'en-US';
i18n.enableFallback = true;

const fetchLocale = async (locale: Locale): Promise<any> => {
  switch (locale) {
    case 'ar':
    case 'ar-AR':
      return (await import('./ar_AR.json')).default;
    case 'en':
    case 'en-US':
      return (await import('./en_US.json')).default;
    case 'es':
    case 'es-419':
      return (await import('./es_419.json')).default;
    case 'fr':
    case 'fr-FR':
      return (await import('./fr_FR.json')).default;
    case 'hi':
    case 'hi-IN':
      return (await import('./hi_IN.json')).default;
    case 'id':
    case 'id-ID':
      return (await import('./id_ID.json')).default;
    case 'ja':
    case 'ja-JP':
      return (await import('./ja_JP.json')).default;
    case 'ko':
    case 'ko-KR':
      return (await import('./ko_KR.json')).default;
    case 'pt':
    case 'pt-BR':
      return (await import('./pt_BR.json')).default;
    case 'ru':
    case 'ru-RU':
      return (await import('./ru_RU.json')).default;
    case 'th':
    case 'th-TH':
      return (await import('./th_TH.json')).default;
    case 'tr':
    case 'tr-TR':
      return (await import('./tr_TR.json')).default;
    case 'zh':
    case 'zh-CN':
      return (await import('./zh_CN.json')).default;
    default:
      return (await import('./en_US.json')).default;
  }
};

export async function setLocale(locale: Locale) {
  const localeFile = (await fetchLocale(locale)) as string;
  // vitest test bundler transforms json into object, but rainbowkit bundler transforms json into text
  i18n.translations[locale] =
    typeof localeFile === 'string' ? JSON.parse(localeFile) : localeFile;
  i18n.locale = locale;
}
