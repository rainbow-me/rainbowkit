import {
  AlchemyProvider,
  AlchemyWebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from 'wagmi';
import { RpcProvider } from './RpcProvider';

export const alchemy = (
  alchemyId: string,
  { chains }: { chains: Chain[] }
): RpcProvider<AlchemyProvider, AlchemyWebSocketProvider> => {
  const provider = ({ chainId }: { chainId?: number }) => {
    return new AlchemyProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      alchemyId
    );
  };

  const rpcUrls: { [chainId: number]: string } = {};
  for (const chain of chains) {
    rpcUrls[chain.id] = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
      : chain.rpcUrls.default;
  }

  const webSocketProvider = ({ chainId }: { chainId?: number }) => {
    return new AlchemyWebSocketProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      alchemyId
    );
  };

  return { provider, rpcUrls, webSocketProvider };
};
