import { useCallback, useEffect } from 'react';
import { Language } from '../../locales';

export const storageKey = 'rk-locale';

interface RainbowKitLanguageProp {
  language: Language;
}

const setRainbowKitLocale = ({ language }: RainbowKitLanguageProp) => {
  localStorage.setItem(storageKey, language);
};

export const useI18nLocalStorage = ({ language }: RainbowKitLanguageProp) => {
  const i18nLocalStorage = useCallback(() => {
    setRainbowKitLocale({ language });
  }, [language]);

  useEffect(() => {
    i18nLocalStorage();
  }, [language]);
};
