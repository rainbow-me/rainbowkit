import {
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { ApiProvider } from './ApiProvider';

export const custom = (
  defaultChains: Chain[],
  {
    rpcUrls,
    webSocketRpcUrls,
  }: {
    rpcUrls: { [chainId: number]: string };
    webSocketRpcUrls?: { [chainId: number]: string };
  }
): ApiProvider<StaticJsonRpcProvider, WebSocketProvider> => {
  const chains = defaultChains.map(chain => {
    if (rpcUrls[chain.id]) {
      return {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: rpcUrls[chain.id],
        },
      };
    }
    return chain;
  });

  const provider = ({
    chainId = defaultChains[0].id,
  }: {
    chainId?: number;
  }) => {
    return new StaticJsonRpcProvider(rpcUrls[chainId], chainId);
  };

  return {
    chains,
    provider,
    ...(webSocketRpcUrls
      ? {
          webSocketProvider: ({ chainId = defaultChains[0].id }) =>
            new WebSocketProvider(webSocketRpcUrls[chainId], chainId),
        }
      : {}),
  };
};
