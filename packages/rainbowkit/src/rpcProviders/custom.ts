import {
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from 'wagmi';
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
    if (rpcUrls[chain.id]) chain.rpcUrls.default = rpcUrls[chain.id];
    return chain;
  });

  const provider = ({
    chainId = defaultChains[0].id,
  }: {
    chainId?: number;
  }) => {
    return new StaticJsonRpcProvider(rpcUrls[chainId], chainId);
  };

  const webSocketProvider = ({
    chainId = defaultChains[0].id,
  }: {
    chainId?: number;
  }) => {
    if (!wsRpcUrls) return new WebSocketProvider('');
    return new WebSocketProvider(wsRpcUrls[chainId], chainId);
  };

  return { chains, provider, ...(wsRpcUrls ? { webSocketProvider } : {}) };
};
