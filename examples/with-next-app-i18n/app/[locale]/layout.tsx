'use client';

import type { Locale } from '@rainbow-me/rainbowkit';
import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={{}}
          timeZone='America/New_York' // Required to not get warnings
        >
          <Providers locale={locale}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
