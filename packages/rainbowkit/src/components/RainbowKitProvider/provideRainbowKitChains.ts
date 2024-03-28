import { isNotNullish } from '../../utils/isNotNullish';
import { RainbowKitChain } from './RainbowKitChainContext';

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
type ChainName =
  | 'arbitrum'
  | 'arbitrumGoerli'
  | 'arbitrumSepolia'
  | 'avalanche'
  | 'avalancheFuji'
  | 'cronos'
  | 'cronosTestnet'
  | 'base'
  | 'baseGoerli'
  | 'baseSepolia'
  | 'blast'
  | 'blastSepolia'
  | 'bsc'
  | 'bscTestnet'
  | 'goerli'
  | 'hardhat'
  | 'holesky'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'optimism'
  | 'optimismKovan'
  | 'optimismGoerli'
  | 'optimismSepolia'
  | 'polygon'
  | 'polygonMumbai'
  | 'rinkeby'
  | 'ropsten'
  | 'ronin'
  | 'sepolia'
  | 'xdc'
  | 'xdcTestnet'
  | 'zkSync'
  | 'zkSyncTestnet'
  | 'zora'
  | 'zoraSepolia'
  | 'zoraTestnet';

type IconMetadata = {
  iconUrl: () => Promise<string>;
  iconBackground: string;
};

type ChainMetadata = {
  chainId: number;
  name?: string;
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

const blastIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/blast.svg')).default,
};

const bscIcon: IconMetadata = {
  iconBackground: '#ebac0e',
  iconUrl: async () => (await import('./chainIcons/bsc.svg')).default,
};

const cronosIcon: IconMetadata = {
  iconBackground: '#002D74',
  iconUrl: async () => (await import('./chainIcons/cronos.svg')).default,
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

const xdcIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: async () => (await import('./chainIcons/xdc.svg')).default,
};

const zkSyncIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: async () => (await import('./chainIcons/zkSync.svg')).default,
};

const zoraIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/zora.svg')).default,
};

const roninIcon: IconMetadata = {
  iconBackground: '#1273EA',
  iconUrl: async () => (await import('./chainIcons/ronin.svg')).default,
};

const chainMetadataByName: Record<ChainName, ChainMetadata | null> = {
  arbitrum: { chainId: 42_161, name: 'Arbitrum', ...arbitrumIcon },
  arbitrumGoerli: { chainId: 421_613, ...arbitrumIcon },
  arbitrumSepolia: { chainId: 421_614, ...arbitrumIcon },
  avalanche: { chainId: 43_114, ...avalancheIcon },
  avalancheFuji: { chainId: 43_113, ...avalancheIcon },
  base: { chainId: 8453, name: 'Base', ...baseIcon },
  baseGoerli: { chainId: 84531, ...baseIcon },
  baseSepolia: { chainId: 84532, ...baseIcon },
  blast: { chainId: 81457, name: 'Blast', ...blastIcon },
  blastSepolia: { chainId: 168_587_773, ...blastIcon },
  bsc: { chainId: 56, name: 'BSC', ...bscIcon },
  bscTestnet: { chainId: 97, ...bscIcon },
  cronos: { chainId: 25, ...cronosIcon },
  cronosTestnet: { chainId: 338, ...cronosIcon },
  goerli: { chainId: 5, ...ethereumIcon },
  hardhat: { chainId: 31_337, ...hardhatIcon },
  holesky: { chainId: 17000, ...ethereumIcon },
  kovan: { chainId: 42, ...ethereumIcon },
  localhost: { chainId: 1_337, ...ethereumIcon },
  mainnet: { chainId: 1, name: 'Ethereum', ...ethereumIcon },
  optimism: { chainId: 10, name: 'Optimism', ...optimismIcon },
  optimismGoerli: { chainId: 420, ...optimismIcon },
  optimismKovan: { chainId: 69, ...optimismIcon },
  optimismSepolia: { chainId: 11155420, ...optimismIcon },
  polygon: { chainId: 137, name: 'Polygon', ...polygonIcon },
  polygonMumbai: { chainId: 80_001, ...polygonIcon },
  rinkeby: { chainId: 4, ...ethereumIcon },
  ropsten: { chainId: 3, ...ethereumIcon },
  ronin: { chainId: 2020, ...roninIcon },
  sepolia: { chainId: 11_155_111, ...ethereumIcon },
  xdc: { chainId: 50, name: 'XinFin', ...xdcIcon },
  xdcTestnet: { chainId: 51, ...xdcIcon },
  zkSync: { chainId: 324, name: 'zkSync', ...zkSyncIcon },
  zkSyncTestnet: { chainId: 280, ...zkSyncIcon },
  zora: { chainId: 7777777, name: 'Zora', ...zoraIcon },
  zoraSepolia: { chainId: 999999999, ...zoraIcon },
  zoraTestnet: { chainId: 999, ...zoraIcon },
};

const chainMetadataById = Object.fromEntries(
  Object.values(chainMetadataByName)
    .filter(isNotNullish)
    .map(({ chainId, ...metadata }) => [chainId, metadata]),
);

/** @description Decorates an array of wagmi `Chain` objects with RainbowKitChain property overrides */
export const provideRainbowKitChains = <Chain extends RainbowKitChain>(
  chains: readonly [Chain, ...Chain[]],
): Chain[] =>
  chains.map((chain) => {
    const defaultMetadata = chainMetadataById[chain.id] ?? {};
    return {
      ...chain,
      name: defaultMetadata.name ?? chain.name, // favor colloquial names
      iconUrl: chain.iconUrl ?? defaultMetadata.iconUrl,
      iconBackground: chain.iconBackground ?? defaultMetadata.iconBackground,
    } as Chain;
  });
