import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

export const chainToExplorerUrl = (chain?: Chain): string | undefined =>
  // @ts-expect-error
  chain?.blockExplorers?.default?.url; // using wagmi's built-in Chain.blockExplorers and grab first one's URL
