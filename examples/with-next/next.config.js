const { withWagmiAliases } = require('../../scripts/nextWagmiAliases.cjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'en-US',
  },
};

module.exports = withWagmiAliases(nextConfig, __dirname);
