const { withWagmiAliases } = require('../../scripts/nextWagmiAliases.cjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withWagmiAliases(nextConfig, __dirname);
