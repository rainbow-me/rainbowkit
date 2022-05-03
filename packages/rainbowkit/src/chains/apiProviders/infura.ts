import {
  InfuraProvider,
  InfuraWebSocketProvider,
} from '@ethersproject/providers';
import { ApiProvider } from './ApiProvider';

export const defaultInfuraId = '84842078b09946638c03157f83405213';

export const infura = (
  infuraId: string = defaultInfuraId
): ApiProvider<InfuraProvider, InfuraWebSocketProvider> => {
  return function (chain) {
    if (!chain.rpcUrls.infura) return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.infura}/${infuraId}`,
        },
      },
      provider: () => new InfuraProvider(chain.id, infuraId),
      webSocketProvider: () => new InfuraWebSocketProvider(chain.id, infuraId),
    };
  };
};
