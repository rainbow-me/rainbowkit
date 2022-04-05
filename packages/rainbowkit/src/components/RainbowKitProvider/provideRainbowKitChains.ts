import { isNotNullish } from '../../utils/isNotNullish';
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

type ChainMetadata = {
  chainId: number;
  iconUrl: () => Promise<string>;
  iconBackground: string;
};

const chainMetadataByName: Record<ChainName, ChainMetadata | null> = {
  arbitrumOne: {
    chainId: 42_161,
    iconBackground: '#96bedc',
    iconUrl: async () => (await import('./chainIcons/arbitrum.svg')).default,
  },
  avalanche: {
    chainId: 43_114,
    iconBackground: '#e84141',
    iconUrl: async () => (await import('./chainIcons/avalanche.svg')).default,
  },
  hardhat: {
    chainId: 31_337,
    iconBackground: '#f9f7ec',
    iconUrl: async () => (await import('./chainIcons/hardhat.svg')).default,
  },
  mainnet: {
    chainId: 1,
    iconBackground: '#484c50',
    iconUrl: async () => (await import('./chainIcons/ethereum.svg')).default,
  },
  optimism: {
    chainId: 10,
    iconBackground: '#ff5a57',
    iconUrl: async () => (await import('./chainIcons/optimism.svg')).default,
  },
  polygonMainnet: {
    chainId: 137,
    iconBackground: '#9f71ec',
    iconUrl: async () => (await import('./chainIcons/polygon.svg')).default,
  },

  // Omitted icons are set to 'null' so we know they've been explicitly excluded from the complete wagmi set (for now)
  ...{
    arbitrumRinkeby: null,
    avalancheFuji: null,
    goerli: null,
    kovan: null,
    localhost: null,
    optimismKovan: null,
    polygonTestnetMumbai: null,
    rinkeby: null,
    ropsten: null,
  },
};

const chainMetadataById = Object.fromEntries(
  Object.values(chainMetadataByName)
    .filter(isNotNullish)
    .map(({ chainId, ...metadata }) => [chainId, metadata])
);

/** @description Decorates an array of wagmi `Chain` objects with RainbowKitChain properties if not already provided */
export const provideRainbowKitChains = <Chain extends RainbowKitChain>(
  chains: Chain[]
): Chain[] =>
  chains.map(chain => ({
    ...(chainMetadataById[chain.id] ?? {}),
    ...chain,
  }));
