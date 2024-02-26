const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('"./lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
