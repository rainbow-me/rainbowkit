import '@rainbow-me/rainbowkit/styles.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { DocsLayout } from '../components/DocsLayout/DocsLayout';
import { GuidesLayout } from '../components/GuidesLayout/GuidesLayout';

import '../css/docsSearch.css';
import '../css/global.css';
import { vars } from '../css/vars.css';

// Dynamically import Provider with ssr: false to avoid wagmi v3 SSG errors
// wagmi v3 requires all hooks to be used within WagmiProvider context
const Provider = dynamic(
  () => import('components/Provider/Provider').then((mod) => mod.Provider),
  { ssr: false },
);

const highlightColors = [
  vars.colors.orange,
  vars.colors.blue,
  vars.colors.pink,
  vars.colors.purple,
  vars.colors.red,
  vars.colors.green,
];

function getColor() {
  return highlightColors[Math.floor(Math.random() * highlightColors.length)];
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isDocs = router.pathname.includes('/docs');
  const isGuides = router.pathname.includes('/guides');

  useEffect(() => {
    const body = document.body;

    const uniqueColors = (function* () {
      let lastColor = getColor();
      while (true) {
        const color = getColor();
        if (color !== lastColor) {
          lastColor = color;
          yield color;
        }
      }
    })();

    const tasteTheRainbow = () =>
      body.style.setProperty('--selectionColor', uniqueColors.next().value);

    body.addEventListener('mousedown', tasteTheRainbow);

    return () => body.removeEventListener('mousedown', tasteTheRainbow);
  }, []);

  useEffect(() => {
    document.body.setAttribute(
      'data-mode',
      isDocs || isGuides ? 'light' : 'dark',
    );
  }, [isDocs, isGuides]);

  const content = isDocs ? (
    <DocsLayout>
      <Component {...pageProps} />
    </DocsLayout>
  ) : isGuides ? (
    <GuidesLayout>
      <Component {...pageProps} />
    </GuidesLayout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone="America/New_York" // Required to not get warnings
      >
        <Provider>{content}</Provider>
      </NextIntlClientProvider>
      <SpeedInsights />
    </>
  );
}

export default App;
