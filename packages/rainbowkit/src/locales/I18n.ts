interface TranslationOptions {
  rawKeyIfTranslationMissing?: boolean;
}

type GenericTranslationObject = Record<string, any>;

const defaultOptions = {
  defaultLocale: 'en',
  locale: 'en',
};

export class I18n {
  public listeners: Set<() => void> = new Set();
  public defaultLocale = defaultOptions.defaultLocale;
  public enableFallback = false;
  public locale = defaultOptions.locale;
  private cachedLocales: string[] = [];
  public translations: GenericTranslationObject = {};

  constructor(localeTranslations: Record<string, GenericTranslationObject>) {
    for (const [locale, translation] of Object.entries(localeTranslations)) {
      this.cachedLocales = [...this.cachedLocales, locale];
      this.translations = {
        ...this.translations,
        ...this.flattenTranslation(translation, locale),
      };
    }
  }

  private missingMessage(key: string): string {
    return `[missing: "${this.locale}.${key}" translation]`;
  }

  private flattenTranslation(
    translationObject: GenericTranslationObject,
    locale: string,
  ): GenericTranslationObject {
    const result: GenericTranslationObject = {};

    const flatten = (
      currentTranslationObj: GenericTranslationObject,
      parentKey: string,
    ) => {
      for (const key of Object.keys(currentTranslationObj)) {
        // Generate a new key for each iteration e.g 'en-US.connect.title'
        const newKey = `${parentKey}.${key}`;
        const currentValue = currentTranslationObj[key];

        // If more nested values are encountered in the object, then
        // the same function will be called again
        if (typeof currentValue === 'object' && currentValue !== null) {
          flatten(currentValue, newKey);
        } else {
          // Otherwise, assign the result to the final
          // object value with the new key
          result[newKey] = currentValue;
        }
      }
    };

    flatten(translationObject, locale);
    return result;
  }

  private translateWithReplacements(
    translation: string,
    replacements: Record<string, string> = {},
  ) {
    let translatedString = translation;
    for (const placeholder in replacements) {
      const replacementValue = replacements[placeholder];
      translatedString = translatedString.replace(
        `%{${placeholder}}`,
        replacementValue,
      );
    }
    return translatedString;
  }

  public t(
    key: string,
    replacements?: Record<string, string>,
    options?: TranslationOptions,
  ): string {
    const translationKey = `${this.locale}.${key}`;
    const translation = this.translations[translationKey];

    if (!translation) {
      // If fallback is enabled
      if (this.enableFallback) {
        const fallbackTranslationKey = `${this.defaultLocale}.${key}`;
        const fallbackTranslation = this.translations[fallbackTranslationKey];

        // If translation exist for the default
        // locale return it as a fallback translation
        if (fallbackTranslation) {
          return this.translateWithReplacements(
            fallbackTranslation,
            replacements,
          );
        }
      }

      // If translation is missing -> return the raw key instead.
      // This is useful if someone were to create their own RainbowKit
      // wallet with steps, but translations are missing. In this case
      // we don't want to throw missing translation message.
      if (options?.rawKeyIfTranslationMissing) return key;

      return this.missingMessage(key);
    }

    return this.translateWithReplacements(translation, replacements);
  }

  public isLocaleCached(locale: string) {
    return this.cachedLocales.includes(locale);
  }

  public updateLocale(locale: string) {
    this.locale = locale;
    this.notifyListeners();
  }

  public setTranslations(
    locale: string,
    translations: GenericTranslationObject,
  ) {
    const cachedLocale = this.isLocaleCached(locale);

    if (!cachedLocale) {
      this.cachedLocales = [...this.cachedLocales, locale];
      this.translations = {
        ...this.translations,
        ...this.flattenTranslation(translations, locale),
      };
    }

    this.locale = locale;

    this.notifyListeners();
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public onChange(fn: () => void): () => void {
    this.listeners.add(fn);

    return () => {
      this.listeners.delete(fn);
    };
  }
}
