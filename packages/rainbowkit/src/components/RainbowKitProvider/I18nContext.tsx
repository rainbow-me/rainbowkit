import React, { ReactNode, useEffect, useMemo } from 'react';

import { type Locale, i18n, setLocale } from '../../locales';
import { detectedBrowserLocale } from '../../utils/locale';

interface I18nProviderProps {
  children: ReactNode;
  locale?: Locale;
}

export const I18nProvider = ({ children, locale }: I18nProviderProps) => {
  const browserLocale: Locale = useMemo(
    () => detectedBrowserLocale() as Locale,
    [],
  );

  useEffect(() => {
    if (locale && locale !== i18n.locale) {
      setLocale(locale);
    } else if (!locale && browserLocale && browserLocale !== i18n.locale) {
      setLocale(browserLocale);
    }
  }, [locale, browserLocale]);

  return <>{children}</>;
};
