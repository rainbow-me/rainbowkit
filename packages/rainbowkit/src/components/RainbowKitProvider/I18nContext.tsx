import React, { ReactNode, createContext, useMemo } from 'react';

import { I18n } from 'i18n-js';
import { type Locale, en_US } from '../../locales';
import { detectedBrowserLocale } from '../../utils/locale';

// en is the default and fallback locale
export const _i18n = new I18n({ en: en_US, 'en-US': en_US });
_i18n.defaultLocale = 'en-US';
_i18n.locale = 'en-US';
_i18n.enableFallback = true;

export const I18nContext = createContext<typeof _i18n>(_i18n);

interface I18nProviderProps {
  children: ReactNode;
  locale?: Locale;
}

export const I18nProvider = ({ children, locale }: I18nProviderProps) => {
  const browserLocale: Locale = useMemo(
    () => detectedBrowserLocale() as Locale,
    [],
  );

  const i18n = useMemo(() => {
    if (locale) {
      _i18n.locale = locale;
    } else if (!locale && browserLocale) {
      _i18n.locale = browserLocale;
    }

    return _i18n;
  }, [locale, browserLocale]);

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};

I18nProvider.i18n = _i18n;
