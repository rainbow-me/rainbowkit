import type { Chain } from 'wagmi/chains';

export const chainToExplorerUrl = (chain?: Chain): string | undefined =>
  chain?.blockExplorers?.default?.url; // using wagmi's built-in Chain.blockExplorers and grab the default URL
