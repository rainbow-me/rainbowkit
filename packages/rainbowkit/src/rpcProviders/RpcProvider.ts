import {
  BaseProvider,
  WebSocketProvider as BaseWebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from 'wagmi';

export type RpcProvider<
  Provider extends BaseProvider = BaseProvider,
  WebSocketProvider extends BaseWebSocketProvider = BaseWebSocketProvider
> = {
  chains: Chain[];
  provider: ({ chainId }: { chainId?: number }) => Provider;
  webSocketProvider?: ({ chainId }: { chainId?: number }) => WebSocketProvider;
};
