import { I18n as _I18N } from 'i18n-js';
import React, { createContext, ReactNode, useMemo } from 'react';
import { i18n as _i18n, Language } from '../../locales';

export const I18nContext = createContext<_I18N>(_i18n);

interface I18nHookProps {
  language: Language;
}

const useI18n = ({ language }: I18nHookProps) => {
  const i18n = useMemo(() => {
    _i18n.locale = language;
    return _i18n;
  }, [language]);

  return {
    i18n,
  };
};

interface I18nProviderProps {
  language: Language;
  children: ReactNode;
}

export const I18nProvider = ({ children, language }: I18nProviderProps) => {
  const { i18n } = useI18n({ language });

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};
