const path = require('node:path');

const wagmiPath = path.dirname(
  require.resolve('wagmi/package.json', { paths: [__dirname] }),
);
const wagmiCorePath = path.dirname(
  require.resolve('@wagmi/core/package.json', { paths: [wagmiPath] }),
);
const wagmiEntry = require.resolve('wagmi', { paths: [__dirname] });
const wagmiChainsEntry = require.resolve('wagmi/chains', {
  paths: [__dirname],
});
const wagmiConnectorsEntry = require.resolve('wagmi/connectors', {
  paths: [__dirname],
});
const wagmiCoreEntry = require.resolve('@wagmi/core', { paths: [wagmiPath] });
const wagmiCoreChainsEntry = require.resolve('@wagmi/core/chains', {
  paths: [wagmiPath],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@wagmi/core$': wagmiCoreEntry,
      '@wagmi/core/chains$': wagmiCoreChainsEntry,
      '@wagmi/core': wagmiCorePath,
      wagmi$: wagmiEntry,
      'wagmi/chains$': wagmiChainsEntry,
      'wagmi/connectors$': wagmiConnectorsEntry,
      wagmi: wagmiPath,
    };
    return config;
  },
};

module.exports = nextConfig;
