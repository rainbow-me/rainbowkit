import {
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { ApiProvider } from './ApiProvider';

export const fallback = (): ApiProvider<
  StaticJsonRpcProvider,
  WebSocketProvider
> => {
  return function (chain) {
    if (!chain.rpcUrls.default) return null;
    return {
      chain,
      provider: () =>
        new StaticJsonRpcProvider(chain.rpcUrls.default, chain.id),
    };
  };
};
