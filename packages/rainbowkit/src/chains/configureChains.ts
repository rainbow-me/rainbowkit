import { providers } from 'ethers';
import { ChainProvider, configureChains as wagmiConfigureChains } from 'wagmi';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

type ConfigureChainsConfig = {
  stallTimeout?: number;
} & (
  | {
      targetQuorum?: number;
      minQuorum?: never;
    }
  | {
      targetQuorum: number;
      minQuorum?: number;
    }
);

export const configureChains = <
  Provider extends providers.BaseProvider,
  WebSocketProvider extends providers.WebSocketProvider
>(
  defaultChains: Chain[],
  providers: ChainProvider<Provider, WebSocketProvider>[],
  { minQuorum = 1, stallTimeout, targetQuorum = 1 }: ConfigureChainsConfig = {}
) => {
  const { chains, provider, webSocketProvider } = wagmiConfigureChains(
    defaultChains,
    providers,
    {
      minQuorum,
      stallTimeout,
      targetQuorum,
    }
  );
  return { chains: chains as Chain[], provider, webSocketProvider };
};
