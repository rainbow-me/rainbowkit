import {
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';
import { RpcProvider } from './RpcProvider';

export const custom = ({
  defaultChainId,
  rpcUrls,
  wsRpcUrls,
}: {
  defaultChainId: number;
  rpcUrls: { [chainId: number]: string };
  wsRpcUrls?: { [chainId: number]: string };
}): RpcProvider<StaticJsonRpcProvider, WebSocketProvider> => {
  const provider = ({ chainId = defaultChainId }: { chainId?: number }) => {
    return new StaticJsonRpcProvider(rpcUrls[chainId], chainId);
  };

  const webSocketProvider = ({
    chainId = defaultChainId,
  }: {
    chainId?: number;
  }) => {
    if (!wsRpcUrls) return new WebSocketProvider('');
    return new WebSocketProvider(wsRpcUrls[chainId], chainId);
  };

  return { provider, rpcUrls, ...(wsRpcUrls ? { webSocketProvider } : {}) };
};
