import { useState, useEffect } from 'react';
import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import type { Chain } from 'wagmi';
import type { QueryClient } from 'react-query';
import type { Client, WebSocketProvider } from '@wagmi/core';
import type {
  FallbackProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers';

export function useSetupWagmi({
  appName = 'Example',
  alchemyId,
  enablePublicTestnets,
}: {
  appName?: string;
  alchemyId?: string;
  enablePublicTestnets?: string;
}) {
  const [chains, setChains] = useState<Chain[]>();
  const [client, setClient] = useState<
    Client<StaticJsonRpcProvider | FallbackProvider, WebSocketProvider> & {
      queryClient: QueryClient;
    }
  >();

  useEffect(() => {
    const testChains =
      enablePublicTestnets === 'true'
        ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
        : [];

    const { chains, provider } = configureChains(
      [
        chain.mainnet,
        chain.polygon,
        chain.optimism,
        chain.arbitrum,
        ...testChains,
      ],
      [alchemyProvider({ alchemyId }), publicProvider()]
    );

    const { connectors } = getDefaultWallets({ appName, chains });

    const wagmiClient = createClient({
      provider,
      connectors,
      autoConnect: true,
    });

    setChains(chains);
    setClient(wagmiClient);
  }, [appName, alchemyId, enablePublicTestnets]);

  return { client, chains };
}
