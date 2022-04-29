import {
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { RpcProvider } from './RpcProvider';

export const custom = (
  defaultChains: Chain[],
  {
    rpcUrls,
    wsRpcUrls,
  }: {
    rpcUrls: { [chainId: number]: string };
    wsRpcUrls?: { [chainId: number]: string };
  }
): RpcProvider<StaticJsonRpcProvider, WebSocketProvider> => {
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
    ...(wsRpcUrls
      ? {
          webSocketProvider: ({ chainId = defaultChains[0].id }) =>
            new WebSocketProvider(wsRpcUrls[chainId], chainId),
        }
      : {}),
  };
};
