import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@rainbow-me/rainbowkit';
import { Providers } from './providers';

export function generateStaticParams() {
  return [{ locale: 'en-US' }, { locale: 'zh-CN' }];
}

// Dynamic metadata with locale
export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title')
  };
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
  }
) {
  const { children } = props;
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
