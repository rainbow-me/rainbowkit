import { providers } from 'ethers';
import { ApiProvider } from './ApiProvider';

export const fallback = (): ApiProvider<
  providers.StaticJsonRpcProvider,
  providers.WebSocketProvider
> => {
  return function (chain) {
    if (!chain.rpcUrls.default) {
      return null;
    }

    return {
      chain,
      provider: () =>
        new providers.StaticJsonRpcProvider(chain.rpcUrls.default, chain.id),
    };
  };
};
