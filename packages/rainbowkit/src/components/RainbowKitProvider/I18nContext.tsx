import { I18n as _I18N } from 'i18n-js';
import React, { ReactNode, createContext, useMemo } from 'react';
import { Locale, i18n as _i18n } from '../../locales';
import { detectedBrowserLocale } from '../../utils/locale';

export const I18nContext = createContext<_I18N>(_i18n);

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
