import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

export const chainToExplorerUrl = (chain?: Chain): string | undefined =>
  chain?.blockExplorers?.[0]?.url; // using wagmi's built-in Chain.blockExplorers and grab first one's URL
