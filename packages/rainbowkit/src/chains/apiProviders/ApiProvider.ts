import {
  BaseProvider,
  WebSocketProvider as BaseWebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';

export type ApiProvider<
  Provider extends BaseProvider = BaseProvider,
  WebSocketProvider extends BaseWebSocketProvider = BaseWebSocketProvider
> = (chain: Chain) => {
  chain: Chain;
  provider: () => Provider;
  webSocketProvider?: () => WebSocketProvider;
} | null;
