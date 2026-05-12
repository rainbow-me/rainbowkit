const { withWagmiAliases } = require('../../scripts/nextWagmiAliases.cjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };

    return config;
  },
};

module.exports = withWagmiAliases(nextConfig, __dirname);
