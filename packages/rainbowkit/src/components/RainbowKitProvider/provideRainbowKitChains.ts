import { isNotNullish } from '../../utils/isNotNullish';
import type { RainbowKitChain } from './RainbowKitChainContext';

// Sourced from https://github.com/wevm/viem/tree/main/src/chains/definitions
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
type ChainName =
  | 'arbitrum'
  | 'arbitrumGoerli'
  | 'arbitrumSepolia'
  | 'avalanche'
  | 'avalancheFuji'
  | 'base'
  | 'baseGoerli'
  | 'baseSepolia'
  | 'blast'
  | 'blastSepolia'
  | 'bsc'
  | 'bscTestnet'
  | 'celo'
  | 'celoAlfajores'
  | 'cronos'
  | 'cronosTestnet'
  | 'flow'
  | 'flowTestnet'
  | 'gnosis'
  | 'goerli'
  | 'hardhat'
  | 'holesky'
  | 'hyperevm'
  | 'ink'
  | 'inkSepolia'
  | 'kaia'
  | 'kairos'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'manta'
  | 'mantaSepolia'
  | 'mantaTestnet'
  | 'mantle'
  | 'mantleTestnet'
  | 'optimism'
  | 'optimismGoerli'
  | 'optimismKovan'
  | 'optimismSepolia'
  | 'polygon'
  | 'polygonAmoy'
  | 'polygonMumbai'
  | 'rinkeby'
  | 'ronin'
  | 'ropsten'
  | 'sanko'
  | 'scroll'
  | 'scrollSepolia'
  | 'sepolia'
  | 'unichain'
  | 'unichainSepolia'
  | 'xdc'
  | 'xdcTestnet'
  | 'zetachain'
  | 'zetachainAthensTestnet'
  | 'zkSync'
  | 'zkSyncTestnet'
  | 'zora'
  | 'zoraSepolia'
  | 'zoraTestnet'
  | 'linea'
  | 'lineaGoerli'
  | 'lineaSepolia'
  | 'gravity'
  | 'gravitySepolia'
  | 'degen';

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

const celoIcon: IconMetadata = {
  iconBackground: '#FCFF52',
  iconUrl: async () => (await import('./chainIcons/celo.svg')).default,
};

const cronosIcon: IconMetadata = {
  iconBackground: '#002D74',
  iconUrl: async () => (await import('./chainIcons/cronos.svg')).default,
};

const ethereumIcon: IconMetadata = {
  iconBackground: '#484c50',
  iconUrl: async () => (await import('./chainIcons/ethereum.svg')).default,
};

const flowIcon: IconMetadata = {
  iconBackground: 'transparent',
  iconUrl: async () => (await import('./chainIcons/flow.svg')).default,
};

const gnosisIcon: IconMetadata = {
  iconBackground: '#04795c',
  iconUrl: async () => (await import('./chainIcons/gnosis.svg')).default,
};

const hardhatIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: async () => (await import('./chainIcons/hardhat.svg')).default,
};

const hyperevmIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/hyperevm.svg')).default,
};

const inkIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/ink.svg')).default,
};

const kaiaIcon: IconMetadata = {
  iconBackground: 'transparent',
  iconUrl: async () => (await import('./chainIcons/kaia.svg')).default,
};

const mantaIcon: IconMetadata = {
  iconBackground: '#ffffff',
  iconUrl: async () => (await import('./chainIcons/manta.svg')).default,
};

const mantleIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/mantle.svg')).default,
};

const optimismIcon: IconMetadata = {
  iconBackground: '#ff5a57',
  iconUrl: async () => (await import('./chainIcons/optimism.svg')).default,
};

const polygonIcon: IconMetadata = {
  iconBackground: '#9f71ec',
  iconUrl: async () => (await import('./chainIcons/polygon.svg')).default,
};

const roninIcon: IconMetadata = {
  iconBackground: '#1273EA',
  iconUrl: async () => (await import('./chainIcons/ronin.svg')).default,
};

const sankoIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/sanko.svg')).default,
};

const scrollIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/scroll.svg')).default,
};

const unichainIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/unichain.svg')).default,
};

const xdcIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: async () => (await import('./chainIcons/xdc.svg')).default,
};

const zetachainIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/zetachain.svg')).default,
};

const zkSyncIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: async () => (await import('./chainIcons/zkSync.svg')).default,
};

const zoraIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/zora.svg')).default,
};

const lineaIcon: IconMetadata = {
  iconBackground: '#ffffff',
  iconUrl: async () => (await import('./chainIcons/linea.svg')).default,
};

const gravityIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/gravity.svg')).default,
};

const degenIcon: IconMetadata = {
  iconBackground: '#000000',
  iconUrl: async () => (await import('./chainIcons/degen.svg')).default,
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
  celo: { chainId: 42220, name: 'Celo', ...celoIcon },
  celoAlfajores: { chainId: 44787, name: 'Celo Alfajores', ...celoIcon },
  cronos: { chainId: 25, ...cronosIcon },
  cronosTestnet: { chainId: 338, ...cronosIcon },
  flow: { chainId: 747, ...flowIcon },
  flowTestnet: { chainId: 545, ...flowIcon },
  goerli: { chainId: 5, ...ethereumIcon },
  gnosis: { chainId: 100, name: 'Gnosis', ...gnosisIcon },
  hardhat: { chainId: 31_337, ...hardhatIcon },
  holesky: { chainId: 17000, ...ethereumIcon },
  hyperevm: { chainId: 999, ...hyperevmIcon },
  ink: { chainId: 57073, ...inkIcon },
  inkSepolia: { chainId: 763373, ...inkIcon },
  kovan: { chainId: 42, ...ethereumIcon },
  kaia: { chainId: 8_217, name: 'Kaia', ...kaiaIcon },
  kairos: { chainId: 1_001, name: 'Kairos', ...kaiaIcon },
  localhost: { chainId: 1_337, ...ethereumIcon },
  mainnet: { chainId: 1, name: 'Ethereum', ...ethereumIcon },
  manta: { chainId: 169, name: 'Manta', ...mantaIcon },
  mantaSepolia: { chainId: 3_441_006, ...mantaIcon },
  mantaTestnet: { chainId: 3_441_005, ...mantaIcon },
  mantle: { chainId: 5000, ...mantleIcon },
  mantleTestnet: { chainId: 5001, ...mantleIcon },
  optimism: { chainId: 10, name: 'Optimism', ...optimismIcon },
  optimismGoerli: { chainId: 420, ...optimismIcon },
  optimismKovan: { chainId: 69, ...optimismIcon },
  optimismSepolia: { chainId: 11155420, ...optimismIcon },
  polygon: { chainId: 137, name: 'Polygon', ...polygonIcon },
  polygonAmoy: { chainId: 80002, ...polygonIcon },
  polygonMumbai: { chainId: 80_001, ...polygonIcon },
  rinkeby: { chainId: 4, ...ethereumIcon },
  ropsten: { chainId: 3, ...ethereumIcon },
  ronin: { chainId: 2020, ...roninIcon },
  sanko: { chainId: 1996, name: 'Sanko', ...sankoIcon },
  sepolia: { chainId: 11_155_111, ...ethereumIcon },
  scroll: { chainId: 534352, ...scrollIcon },
  scrollSepolia: { chainId: 534351, ...scrollIcon },
  unichain: { chainId: 130, ...unichainIcon },
  unichainSepolia: { chainId: 1301, ...unichainIcon },
  xdc: { chainId: 50, name: 'XinFin', ...xdcIcon },
  xdcTestnet: { chainId: 51, ...xdcIcon },
  zetachain: { chainId: 7000, name: 'ZetaChain', ...zetachainIcon },
  zetachainAthensTestnet: {
    chainId: 7001,
    name: 'Zeta Athens',
    ...zetachainIcon,
  },
  zkSync: { chainId: 324, name: 'zkSync', ...zkSyncIcon },
  zkSyncTestnet: { chainId: 280, ...zkSyncIcon },
  zora: { chainId: 7777777, name: 'Zora', ...zoraIcon },
  zoraSepolia: { chainId: 999999999, ...zoraIcon },
  zoraTestnet: { chainId: 999, ...zoraIcon },
  linea: { chainId: 59144, name: 'Linea', ...lineaIcon },
  lineaGoerli: { chainId: 59140, name: 'Linea Goerli', ...lineaIcon },
  lineaSepolia: { chainId: 59141, name: 'Linea Sepolia', ...lineaIcon },
  gravity: { chainId: 1625, name: 'Gravity', ...gravityIcon },
  gravitySepolia: { chainId: 13505, name: 'Gravity Sepolia', ...gravityIcon },
  degen: { chainId: 666666666, name: 'Degen', ...degenIcon },
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
