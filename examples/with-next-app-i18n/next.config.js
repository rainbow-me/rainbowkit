
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = withNextIntl(config);
