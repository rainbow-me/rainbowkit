import {
  InfuraProvider,
  InfuraWebSocketProvider,
} from '@ethersproject/providers';
import { ApiProvider } from './ApiProvider';

export const infura = (
  infuraId: string
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
