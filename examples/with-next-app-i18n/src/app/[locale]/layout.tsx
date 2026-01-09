import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@rainbow-me/rainbowkit';
import { Providers } from './providers';

// Force dynamic rendering for all pages to avoid SSG errors with wagmi v3
// wagmi v3 requires hooks to be used within WagmiProvider context,
// which isn't available during static generation
export const dynamic = 'force-dynamic';

// Dynamic metadata with locale
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale as Locale;

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title'),
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  const locale = params.locale as Locale;

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
