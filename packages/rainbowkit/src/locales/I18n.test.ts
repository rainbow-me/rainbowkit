import { describe, expect, it } from 'vitest';
import { I18n } from './I18n';

describe('I18n', () => {
  describe('t (translate)', () => {
    const testBasicTranslation = (
      locale: string,
      translations: Record<string, string>,
      key: string,
    ) => {
      const i18n = new I18n({ [locale]: translations });
      i18n.locale = locale;

      it(`should translate '${locale}' locale for '${key}'`, () => {
        expect(i18n.t(key)).toBe(translations[key]);
      });
    };

    // Basic translation for 'hello' key
    testBasicTranslation('en-US', { hello: 'hello' }, 'hello');
    testBasicTranslation('ru-RU', { hello: 'привет' }, 'hello');
    testBasicTranslation('ja-JP', { hello: 'こんにちは' }, 'hello');
    testBasicTranslation('ar-AR', { hello: 'مرحبًا' }, 'hello');

    it("should translate 'en-US' if 'ja-JP' translation is missing (fallback enabled)", () => {
      const i18n = new I18n({
        'en-US': {
          hello: 'hello',
        },
        'ja-JP': {
          apple: 'りんご',
        },
      });

      i18n.enableFallback = true;
      // defaultLocale will be used
      // as fallback translation
      i18n.defaultLocale = 'en-US';
      i18n.locale = 'ja-JP';

      expect(i18n.t('hello')).toBe('hello');
    });

    it('should return missing message if translation does not exist', () => {
      const i18n = new I18n({
        'ja-JP': {
          hello: 'こんにちは',
        },
      });

      i18n.locale = 'ja-JP';

      expect(i18n.t('xyz')).toBe(`[missing: "ja-JP.xyz" translation]`);
    });

    it('should return missing message if no locale present', () => {
      const i18n = new I18n({});

      i18n.locale = 'ja-JP';

      expect(i18n.t('xyz')).toBe(`[missing: "ja-JP.xyz" translation]`);
    });

    it("should return missing message if 'ja-JP' has missing translation (fallback disabled)", () => {
      const i18n = new I18n({
        'en-US': {
          hello: 'hello',
        },
        'ja-JP': {
          apple: 'りんご',
        },
      });

      i18n.defaultLocale = 'en-US';
      i18n.locale = 'ja-JP';

      expect(i18n.t('hello')).toBe(`[missing: "ja-JP.hello" translation]`);
    });

    it('should translate with replacement', () => {
      const i18n = new I18n({
        'en-US': {
          hello: 'hello %{firstName} %{lastName}',
        },
      });

      i18n.locale = 'en-US';

      expect(i18n.t('hello', { firstName: 'john', lastName: 'doe' })).toBe(
        'hello john doe',
      );
    });
  });

  describe('onChange', () => {
    it('should call onChange function if locale is updated', () => {
      const i18n = new I18n({
        'en-US': {
          hello: 'hello',
        },
      });

      let called = false;

      i18n.onChange(() => {
        called = true;
      });

      i18n.setTranslations('ru-RU', {
        hello: 'привет',
      });

      expect(called).toBe(true);
    });

    it('should unsubscribe onChange if cleanup function is called', () => {
      const i18n = new I18n({
        'en-US': {
          hello: 'hello',
        },
      });

      let called = false;

      const unsubscribe = i18n.onChange(() => {
        called = true;
      });

      unsubscribe(); // Unsubscribe immediately

      i18n.setTranslations('ru-RU', {
        hello: 'привет',
      });

      expect(called).toBe(false);
    });
  });
});
