import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { DocsLayout } from '../components/DocsLayout/DocsLayout';
import { vars } from '../css/vars.css';
import 'focus-visible';
import '../css/global.css';

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

  useEffect(() => {
    const body = document.body;
    const tasteTheRainbow = () =>
      body.style.setProperty('--selectionColor', getColor());

    body.addEventListener('mousedown', tasteTheRainbow);

    return () => body.removeEventListener('mousedown', tasteTheRainbow);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-mode', isDocs ? 'light' : 'dark');
  }, [isDocs]);

  return (
    <>
      {isDocs ? (
        <DocsLayout>
          <Component {...pageProps} />
        </DocsLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default App;
