import type { RainbowKitChain } from './RainbowKitChainContext';

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
type ChainName =
  | 'arbitrumOne'
  | 'arbitrumRinkeby'
  | 'avalanche'
  | 'avalancheFuji'
  | 'goerli'
  | 'hardhat'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'optimism'
  | 'optimismKovan'
  | 'polygonMainnet'
  | 'polygonTestnetMumbai'
  | 'rinkeby'
  | 'ropsten';

const chainMetadata: Record<
  ChainName,
  { chainId: number; iconUrl: string } | null
> = {
  arbitrumOne: {
    chainId: 42_161,
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmVUztw7AXEqh9yFEAUZarG6LYzYFbYAwkxgx2myXgBi7L',
  },
  avalanche: {
    chainId: 43_114,
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmX5GEd2Siv5qpamrujYZjXEAkbEueQK8fvNpEXtiBpjRm',
  },
  mainnet: {
    chainId: 1,
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmV1rDdxo8PzgnMJHG8E2jHsBU1AxyE2T68tm4yv9jKMGh',
  },
  optimism: {
    chainId: 10,
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmeK3XmVA5vCpzBWoaQLm4o4QdDZV5z4EcABPGhcQtK8Bo',
  },
  polygonMainnet: {
    chainId: 137,
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmdyoFWCpGCaxmtsYw6FFpuVBv6LCHTzZPYeZagvKYB964',
  },

  // Omitted icons are set to 'null' so we know they've been explicitly excluded from the complete wagmi set (for now)
  ...{
    arbitrumRinkeby: null,
    avalancheFuji: null,
    goerli: null,
    hardhat: null,
    kovan: null,
    localhost: null,
    optimismKovan: null,
    polygonTestnetMumbai: null,
    rinkeby: null,
    ropsten: null,
  },
};

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

const chainIconUrlsById = Object.fromEntries(
  Object.values(chainMetadata)
    .filter(isNotNull)
    .map(({ chainId, iconUrl }) => [chainId, iconUrl])
) as Record<number, string>;

/** @description Decorates an array of wagmi `Chain` objects with RainbowKitChain properties if not already provided */
export const provideRainbowKitChains = <Chain extends RainbowKitChain>(
  chains: Chain[]
): Chain[] =>
  chains.map(chain => ({
    iconUrl: chainIconUrlsById[chain.id],
    ...chain,
  }));
