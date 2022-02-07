import { chain as wagmiChain } from 'wagmi';
import type { ChainWithIconUrl } from './ChainIconsContext';

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/private/src/constants/chains.ts
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
  | 'optimisticEthereum'
  | 'optimisticKovan'
  | 'polygonMainnet'
  | 'polygonTestnetMumbai'
  | 'rinkeby'
  | 'ropsten';

const chainIcons: Record<ChainName, string | null> = {
  arbitrumOne:
    'https://cloudflare-ipfs.com/ipfs/bafkreicg6e4twffmbrhfoq4bl7tfdkqgeew4pnd5h5lxsgvzckrosg3cra',
  avalanche:
    'https://cloudflare-ipfs.com/ipfs/bafkreihcnx7i6a3i44bqzcj6ogvlksthefftkal4q7gbbbudegalzxdap4',
  mainnet:
    'https://cloudflare-ipfs.com/ipfs/QmU1rGfe87iNEC1rComqCREDT9hX86TiysU3mqJ5iSFb6i',
  optimisticEthereum:
    'https://cloudflare-ipfs.com/ipfs/bafkreieyg2v6gxaaascecc2chrxwg26fvteyrwktf7epir7acdhkncxtrm',
  polygonMainnet:
    'https://cloudflare-ipfs.com/ipfs/bafkreidhxhnuwatm7xoiwuniiwycewblmxiu65dkklt3t3fwtx2eumbswu',

  // Omitted icons are set to 'null' so we know they've been explicitly excluded from the complete wagmi set (for now)
  ...{
    arbitrumRinkeby: null,
    avalancheFuji: null,
    goerli: null,
    hardhat: null,
    kovan: null,
    localhost: null,
    optimisticKovan: null,
    polygonTestnetMumbai: null,
    rinkeby: null,
    ropsten: null,
  },
};

const chainIconUrlsById = Object.fromEntries(
  Object.entries(chainIcons)
    .filter(([key]) => key in wagmiChain && wagmiChain[key].id !== undefined)
    .map(([key, value]) => [wagmiChain[key].id, value])
) as Record<number, string>;

/** @description Decorates an array of wagmi `Chain` objects with `iconUrl` properties if not already provided */
export const provideChainIconUrls = <Chain extends ChainWithIconUrl>(
  chains: Chain[]
): Chain[] =>
  chains.map(chain => ({
    iconUrl: chainIconUrlsById[chain.id],
    ...chain,
  }));
