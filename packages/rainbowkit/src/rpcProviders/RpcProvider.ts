import {
  BaseProvider,
  WebSocketProvider as BaseWebSocketProvider,
} from '@ethersproject/providers';

export type RpcProvider<
  Provider extends BaseProvider = BaseProvider,
  WebSocketProvider extends BaseWebSocketProvider = BaseWebSocketProvider
> = {
  provider: ({ chainId }: { chainId?: number }) => Provider;
  rpcUrls: { [chainId: number]: string };
  webSocketProvider?: ({ chainId }: { chainId?: number }) => WebSocketProvider;
};
