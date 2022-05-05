import { providers } from 'ethers';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';

export type ApiProvider<
  Provider extends providers.BaseProvider = providers.BaseProvider,
  WebSocketProvider extends providers.WebSocketProvider = providers.WebSocketProvider
> = (chain: Chain) => {
  chain: Chain;
  provider: () => Provider;
  webSocketProvider?: () => WebSocketProvider;
} | null;
