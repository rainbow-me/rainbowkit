import {
  InfuraProvider,
  InfuraWebSocketProvider,
} from '@ethersproject/providers';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { RpcProvider } from './RpcProvider';

export const infura = (
  defaultChains: Chain[],
  infuraId: string
): RpcProvider<InfuraProvider, InfuraWebSocketProvider> => {
  const chains = defaultChains.map(chain => {
    if (chain.rpcUrls.infura) {
      chain.rpcUrls.default = `${chain.rpcUrls.infura}/${infuraId}`;
    }
    return chain;
  });

  const provider = ({ chainId }: { chainId?: number }) => {
    return new InfuraProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      infuraId
    );
  };

  const webSocketProvider = ({ chainId }: { chainId?: number }) => {
    return new InfuraWebSocketProvider(
      chains.some(x => x.id === chainId) ? chainId : chains[0].id,
      infuraId
    );
  };

  return { chains, provider, webSocketProvider };
};
