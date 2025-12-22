const createNextIntlPlugin = require('next-intl/plugin');

// Explicitly specify the i18n config path for Turbopack compatibility
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);
