import {
  AlchemyProvider,
  AlchemyWebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { ApiProvider } from './ApiProvider';

export const alchemy = (
  defaultChains: Chain[],
  alchemyId: string
): Required<ApiProvider<AlchemyProvider, AlchemyWebSocketProvider>> => {
  const chains = defaultChains.map(chain => {
    if (chain.rpcUrls.alchemy) {
      return {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.alchemy}/${alchemyId}`,
        },
      };
    }
    return chain;
  });

  const provider = ({ chainId }: { chainId?: number }) => {
    return new AlchemyProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      alchemyId
    );
  };

  const webSocketProvider = ({ chainId }: { chainId?: number }) => {
    return new AlchemyWebSocketProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      alchemyId
    );
  };

  return { chains, provider, webSocketProvider };
};
