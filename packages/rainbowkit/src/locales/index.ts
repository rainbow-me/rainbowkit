import type * as I18nTypes from 'i18n-js';
import { I18n } from 'i18n-js/dist/require/index.js';

import ar_AR from './ar_AR.json';
import en_US from './en_US.json';
import es_419 from './es_419.json';
import fr_FR from './fr_FR.json';
import hi_IN from './hi_IN.json';
import id_ID from './id_ID.json';
import ja_JP from './ja_JP.json';
import ko_KR from './ko_KR.json';
import pt_BR from './pt_BR.json';
import ru_RU from './ru_RU.json';
import th_TH from './th_TH.json';
import tr_TR from './tr_TR.json';
import zh_CN from './zh_CN.json';

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
  'ar': ar_AR,
  'ar-AR': ar_AR,
  'en': en_US,
  'en-US': en_US,
  'es': es_419,
  'es-419': es_419,
  'fr': fr_FR,
  'fr-FR': fr_FR,
  'hi': hi_IN,
  'hi-IN': hi_IN,
  'id': id_ID,
  'id-ID': id_ID,
  'ja': ja_JP,
  'ja-JP': ja_JP,
  'ko': ko_KR,
  'ko-KR': ko_KR,
  'pt': pt_BR,
  'pt-BR': pt_BR,
  'ru': ru_RU,
  'ru-RU': ru_RU,
  'th': th_TH,
  'th-TH': th_TH,
  'tr': tr_TR,
  'tr-TR': tr_TR,
  'zh': zh_CN,
  'zh-CN': zh_CN,
});

i18n.defaultLocale = 'en-US';
i18n.locale = 'en-US';
i18n.enableFallback = true;
