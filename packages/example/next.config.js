const path = require('node:path');

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [
    'next-auth',
    '@rainbow-me/rainbowkit',
    '@rainbow-me/rainbow-button',
    'wagmi',
    '@wagmi/core',
    '@wagmi/connectors',
  ],
  reactStrictMode: true,
  // Force a single resolution for wagmi packages so rainbowkit's bundled
  // `'use client'` chunks and the page's direct wagmi imports share one
  // `WagmiContext` identity across SSG worker bundles.
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      wagmi: path.dirname(require.resolve('wagmi/package.json')),
      '@wagmi/core': path.dirname(require.resolve('@wagmi/core/package.json')),
      '@wagmi/connectors': path.dirname(
        require.resolve('@wagmi/connectors/package.json'),
      ),
    };
    return config;
  },
  i18n: {
    defaultLocale: 'en-US',
    locales: [
      'ar-AR',
      'de-DE',
      'en-US',
      'es-419',
      'fr-FR',
      'hi-IN',
      'id-ID',
      'ja-JP',
      'ko-KR',
      'ms-MY',
      'pt-BR',
      'ru-RU',
      'th-TH',
      'tr-TR',
      'uk-UA',
      'vi-VN',
      'zh-CN',
      'zh-HK',
      'zh-TW',
    ],
  },
};
