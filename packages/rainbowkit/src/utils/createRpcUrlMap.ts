import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

export const createRpcUrlMap = (
  chains: Chain[]
): { [chainId: number]: string } =>
  chains.reduce(
    (rpcUrlMap, chain) => ({ ...rpcUrlMap, [chain.id]: chain.rpcUrls.default }),
    {}
  );
