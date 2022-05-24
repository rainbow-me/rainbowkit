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
  TProvider extends providers.BaseProvider,
  TWebSocketProvider extends providers.WebSocketProvider,
  TChain extends Chain = Chain
>(
  defaultChains: TChain[],
  providers: ChainProvider<TProvider, TWebSocketProvider, TChain>[],
  { minQuorum = 1, stallTimeout, targetQuorum = 1 }: ConfigureChainsConfig = {}
) => {
  return wagmiConfigureChains(defaultChains, providers, {
    minQuorum,
    stallTimeout,
    targetQuorum,
  });
};
