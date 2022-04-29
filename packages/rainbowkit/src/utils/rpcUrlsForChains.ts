import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

export const rpcUrlsForChains = (
  chains: Chain[]
): { [chainId: number]: string } =>
  chains.reduce(
    (rpcUrlMap, chain) => ({ ...rpcUrlMap, [chain.id]: chain.rpcUrls.default }),
    {}
  );
