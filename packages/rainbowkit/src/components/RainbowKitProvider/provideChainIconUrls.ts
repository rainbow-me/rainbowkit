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
    'https://cloudflare-ipfs.com/ipfs/QmVUztw7AXEqh9yFEAUZarG6LYzYFbYAwkxgx2myXgBi7L',
  avalanche:
    'https://cloudflare-ipfs.com/ipfs/QmX5GEd2Siv5qpamrujYZjXEAkbEueQK8fvNpEXtiBpjRm',
  mainnet:
    'https://cloudflare-ipfs.com/ipfs/QmV1rDdxo8PzgnMJHG8E2jHsBU1AxyE2T68tm4yv9jKMGh',
  optimisticEthereum:
    'https://cloudflare-ipfs.com/ipfs/QmeK3XmVA5vCpzBWoaQLm4o4QdDZV5z4EcABPGhcQtK8Bo',
  polygonMainnet:
    'https://cloudflare-ipfs.com/ipfs/QmdyoFWCpGCaxmtsYw6FFpuVBv6LCHTzZPYeZagvKYB964',

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
