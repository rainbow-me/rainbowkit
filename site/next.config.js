const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
// TODO: update import https://github.com/contentlayerdev/contentlayer/issues/140
const { withContentlayer } = require('next-contentlayer');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile rainbowkit + wagmi through Next so the `'use client'` chunks
  // share a single `WagmiContext` identity across server and client bundles.
  // Avoids `WagmiProviderNotFoundError` during parallel SSG on Next 16.
  transpilePackages: [
    '@rainbow-me/rainbowkit',
    'wagmi',
    '@wagmi/core',
    '@wagmi/connectors',
  ],
  logging: {
    browserToTerminal: 'warn',
  },
  i18n: {
    locales: [
      'en-US',
      'ar',
      'de',
      'es-419',
      'fr',
      'hi',
      'id',
      'ja',
      'ko',
      'ms',
      'pt-BR',
      'ru',
      'th',
      'tr',
      'ua',
      'vi',
      'zh-CN',
      'zh-HK',
      'zh-TW',
    ],
    defaultLocale: 'en-US',
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: false,
      },
      {
        source: '/docs/migrating-to-02',
        destination: '/docs/migration-guide',
        permanent: true,
      },
    ];
  },
};

module.exports = withVanillaExtract(withContentlayer(nextConfig));
