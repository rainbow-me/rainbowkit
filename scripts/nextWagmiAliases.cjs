const path = require('node:path');

function resolvePackageDir(packageName, lookupPaths) {
  return path.dirname(
    require.resolve(`${packageName}/package.json`, { paths: lookupPaths }),
  );
}

function withWagmiAliases(nextConfig, appDir) {
  const wagmiPath = resolvePackageDir('wagmi', [appDir]);
  const wagmiCorePath = resolvePackageDir('@wagmi/core', [wagmiPath]);
  const wagmiEntry = require.resolve('wagmi', { paths: [appDir] });
  const wagmiChainsEntry = require.resolve('wagmi/chains', { paths: [appDir] });
  const wagmiConnectorsEntry = require.resolve('wagmi/connectors', {
    paths: [appDir],
  });
  const wagmiCoreEntry = require.resolve('@wagmi/core', { paths: [wagmiPath] });
  const wagmiCoreChainsEntry = require.resolve('@wagmi/core/chains', {
    paths: [wagmiPath],
  });

  return {
    ...nextConfig,
    webpack: (config, options) => {
      const resolvedConfig = nextConfig.webpack?.(config, options) ?? config;
      resolvedConfig.resolve = resolvedConfig.resolve ?? {};
      resolvedConfig.resolve.alias = {
        ...resolvedConfig.resolve.alias,
        '@wagmi/core$': wagmiCoreEntry,
        '@wagmi/core/chains$': wagmiCoreChainsEntry,
        '@wagmi/core': wagmiCorePath,
        wagmi$: wagmiEntry,
        'wagmi/chains$': wagmiChainsEntry,
        'wagmi/connectors$': wagmiConnectorsEntry,
        wagmi: wagmiPath,
      };
      return resolvedConfig;
    },
  };
}

module.exports = { withWagmiAliases };
