import {
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { ApiProvider } from './ApiProvider';

export const jsonRpc = (
  getRpcUrls: (chain: Chain) => { rpcUrl: string; webSocketRpcUrl?: string }
): ApiProvider<StaticJsonRpcProvider, WebSocketProvider> => {
  return function (chain) {
    const { rpcUrl, webSocketRpcUrl } = getRpcUrls(chain);
    if (rpcUrl === '') return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: rpcUrl,
        },
      },
      provider: () => new StaticJsonRpcProvider(rpcUrl, chain.id),
      ...(webSocketRpcUrl && {
        webSocketProvider: () =>
          new WebSocketProvider(webSocketRpcUrl, chain.id),
      }),
    };
  };
};
