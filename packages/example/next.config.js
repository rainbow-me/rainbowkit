const { withWagmiAliases } = require('../../scripts/nextWagmiAliases.cjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'next-auth',
    '@rainbow-me/rainbowkit',
    '@rainbow-me/rainbow-button',
    'wagmi',
    '@wagmi/core',
    '@wagmi/connectors',
  ],
  reactStrictMode: true,
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

module.exports = withWagmiAliases(nextConfig, __dirname);
