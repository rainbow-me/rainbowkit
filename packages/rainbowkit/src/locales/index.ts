import { I18n } from 'i18n-js';
import en_US from './en_US.json';
import es_419 from './es_419.json';
import fr_FR from './fr_FR.json';
import hi_IN from './hi_IN.json';
import id_ID from './id_ID.json';
import ja_JP from './ja_JP.json';
import pt_BR from './pt_BR.json';
import ru_RU from './ru_RU.json';
import tr_TR from './tr_TR.json';
import zh_CN from './zh_CN.json';

export type Locale =
  | 'en-US'
  | 'es-419'
  | 'fr-FR'
  | 'ja-JP'
  | 'pt-BR'
  | 'zh-CN'
  | 'id-ID'
  | 'hi-IN'
  | 'tr-TR'
  | 'ru-RU';

export const i18n = new I18n({
  ['en-US']: en_US,
  ['es-419']: es_419,
  ['fr-FR']: fr_FR,
  ['hi-IN']: hi_IN,
  ['id-ID']: id_ID,
  ['ja-JP']: ja_JP,
  ['pt-BR']: pt_BR,
  ['ru-RU']: ru_RU,
  ['tr-TR']: tr_TR,
  ['zh-CN']: zh_CN,
});

// Configure languages
i18n.defaultLocale = 'en-US';
i18n.locale = 'en-US';
i18n.enableFallback = true;