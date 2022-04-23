import { BlockExplorer } from '@wagmi/core/dist/declarations/src/constants';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

export const chainToExplorerUrl = (chain?: Chain): string | undefined =>
  (chain?.blockExplorers?.default as BlockExplorer).url ??
  (chain?.blockExplorers?.default as BlockExplorer[])?.[0]?.url; // using wagmi's built-in Chain.blockExplorers and grab first one's URL
