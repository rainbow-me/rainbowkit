import { I18n as _I18N } from 'i18n-js';
import React, { createContext, ReactNode, useMemo } from 'react';
import { Language, getLocalStorageLocale, i18n as _i18n } from '../../locales';

export const I18nContext = createContext<_I18N>(_i18n);

const useI18n = () => {
  const i18n = useMemo(() => {
    const locale = getLocalStorageLocale() || Language.EN_US;
    _i18n.locale = locale;
    return _i18n;
  }, []);

  return {
    i18n,
  };
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const { i18n } = useI18n();

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};
