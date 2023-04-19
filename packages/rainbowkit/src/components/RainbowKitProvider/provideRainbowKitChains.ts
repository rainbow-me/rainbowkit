import { isNotNullish } from '../../utils/isNotNullish';
import type { RainbowKitChain } from './RainbowKitChainContext';

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
type ChainName =
  | 'arbitrum'
  | 'arbitrumGoerli'
  | 'avalanche'
  | 'avalancheFuji'
  | 'baseGoerli'
  | 'bsc'
  | 'bscTestnet'
  | 'goerli'
  | 'hardhat'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'optimism'
  | 'optimismKovan'
  | 'optimismGoerli'
  | 'polygon'
  | 'polygonMumbai'
  | 'rinkeby'
  | 'ropsten'
  | 'sepolia';

type IconMetadata = {
  iconUrl: () => Promise<string>;
  iconBackground: string;
};

type ChainMetadata = {
  chainId: number;
} & IconMetadata;

const arbitrumIcon: IconMetadata = {
  iconBackground: '#96bedc',
  iconUrl: async () => (await import('./chainIcons/arbitrum.svg')).default,
};

const avalancheIcon: IconMetadata = {
  iconBackground: '#e84141',
  iconUrl: async () => (await import('./chainIcons/avalanche.svg')).default,
};

const baseIcon: IconMetadata = {
  iconBackground: '#0052ff',
  iconUrl: async () => (await import('./chainIcons/base.svg')).default,
};

const bscIcon: IconMetadata = {
  iconBackground: '#ebac0e',
  iconUrl: async () => (await import('./chainIcons/bsc.svg')).default,
};

const ethereumIcon: IconMetadata = {
  iconBackground: '#484c50',
  iconUrl: async () => (await import('./chainIcons/ethereum.svg')).default,
};

const hardhatIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: async () => (await import('./chainIcons/hardhat.svg')).default,
};

const optimismIcon: IconMetadata = {
  iconBackground: '#ff5a57',
  iconUrl: async () => (await import('./chainIcons/optimism.svg')).default,
};

const polygonIcon: IconMetadata = {
  iconBackground: '#9f71ec',
  iconUrl: async () => (await import('./chainIcons/polygon.svg')).default,
};

const chainMetadataByName: Record<ChainName, ChainMetadata | null> = {
  arbitrum: { chainId: 42_161, ...arbitrumIcon },
  arbitrumGoerli: { chainId: 421_613, ...arbitrumIcon },
  avalanche: { chainId: 43_114, ...avalancheIcon },
  avalancheFuji: { chainId: 43_113, ...avalancheIcon },
  baseGoerli: { chainId: 84531, ...baseIcon },
  bsc: { chainId: 56, ...bscIcon },
  bscTestnet: { chainId: 97, ...bscIcon },
  goerli: { chainId: 5, ...ethereumIcon },
  hardhat: { chainId: 31_337, ...hardhatIcon },
  kovan: { chainId: 42, ...ethereumIcon },
  localhost: { chainId: 1_337, ...ethereumIcon },
  mainnet: { chainId: 1, ...ethereumIcon },
  optimism: { chainId: 10, ...optimismIcon },
  optimismGoerli: { chainId: 420, ...optimismIcon },
  optimismKovan: { chainId: 69, ...optimismIcon },
  polygon: { chainId: 137, ...polygonIcon },
  polygonMumbai: { chainId: 80_001, ...polygonIcon },
  rinkeby: { chainId: 4, ...ethereumIcon },
  ropsten: { chainId: 3, ...ethereumIcon },
  sepolia: { chainId: 11_155_111, ...ethereumIcon },
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
