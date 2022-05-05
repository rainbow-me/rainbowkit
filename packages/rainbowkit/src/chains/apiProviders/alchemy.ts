import { providers } from 'ethers';
import { ApiProvider } from './ApiProvider';

export const defaultAlchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';

export const alchemy = (
  alchemyId: string = defaultAlchemyId
): ApiProvider<
  providers.AlchemyProvider,
  providers.AlchemyWebSocketProvider
> => {
  return function (chain) {
    if (!chain.rpcUrls.alchemy) {
      return null;
    }

    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.alchemy}/${alchemyId}`,
        },
      },
      provider: () => new providers.AlchemyProvider(chain.id, alchemyId),
      webSocketProvider: () =>
        new providers.AlchemyWebSocketProvider(chain.id, alchemyId),
    };
  };
};
