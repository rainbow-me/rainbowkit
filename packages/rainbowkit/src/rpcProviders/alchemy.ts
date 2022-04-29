import {
  AlchemyProvider,
  AlchemyWebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from 'wagmi';
import { RpcProvider } from './RpcProvider';

export const alchemy = (
  defaultChains: Chain[],
  alchemyId: string
): RpcProvider<AlchemyProvider, AlchemyWebSocketProvider> => {
  const chains = defaultChains.map(chain => {
    if (chain.rpcUrls.alchemy) {
      chain.rpcUrls.default = `${chain.rpcUrls.alchemy}/${alchemyId}`;
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
