import {
  InfuraProvider,
  InfuraWebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from 'wagmi';
import { RpcProvider } from './RpcProvider';

export const infura = (
  infuraId: string,
  { chains }: { chains: Chain[] }
): RpcProvider<InfuraProvider, InfuraWebSocketProvider> => {
  const provider = ({ chainId }: { chainId?: number }) => {
    return new InfuraProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      infuraId
    );
  };

  const rpcUrls: { [chainId: number]: string } = {};
  for (const chain of chains) {
    rpcUrls[chain.id] = chain.rpcUrls.infura
      ? `${chain.rpcUrls.infura}/${infuraId}`
      : chain.rpcUrls.default;
  }

  const webSocketProvider = ({ chainId }: { chainId?: number }) => {
    return new InfuraWebSocketProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      infura
    );
  };

  return { provider, rpcUrls, webSocketProvider };
};
