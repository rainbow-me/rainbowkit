import {
  AlchemyProvider,
  AlchemyWebSocketProvider,
} from '@ethersproject/providers';
import { ApiProvider } from './ApiProvider';

export const alchemy = (
  alchemyId: string
): ApiProvider<AlchemyProvider, AlchemyWebSocketProvider> => {
  return function (chain) {
    if (!chain.rpcUrls.alchemy) return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.alchemy}/${alchemyId}`,
        },
      },
      provider: () => new AlchemyProvider(chain.id, alchemyId),
      webSocketProvider: () =>
        new AlchemyWebSocketProvider(chain.id, alchemyId),
    };
  };
};
