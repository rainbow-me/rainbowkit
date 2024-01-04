import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { http, Chain } from 'viem';
import { WagmiProvider, createConfig } from 'wagmi';
import {
  arbitrum,
  base,
  bsc,
  goerli,
  holesky,
  mainnet,
  optimism,
  polygon,
  zkSync,
  zora,
} from 'wagmi/chains';
import { MockParameters, mock } from 'wagmi/connectors';
import { RainbowKitProvider } from '../src/components/RainbowKitProvider/RainbowKitProvider';
import type { RainbowKitProviderProps } from '../src/components/RainbowKitProvider/RainbowKitProvider';
import { getDefaultWallets } from '../src/wallets/getDefaultWallets';

const defaultChains: readonly [Chain, ...Chain[]] = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
];

const queryClient = new QueryClient();

export function renderWithProviders(
  component: ReactElement,
  options?: {
    chains?: readonly [Chain, ...Chain[]];
    mock?: boolean;
    mockOptions?: MockParameters;
    props?: Omit<RainbowKitProviderProps, 'children'>;
  },
) {
  const supportedChains = options?.chains || defaultChains;

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: process.env.WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
  });

  const config = createConfig({
    chains: supportedChains,
    connectors: options?.mock
      ? [
          mock({
            accounts: [
              '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
              '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
              '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
            ],
          }),
        ]
      : connectors,
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
      [zora.id]: http(),
      [bsc.id]: http(),
      [zkSync.id]: http(),
      [goerli.id]: http(),
      [holesky.id]: http(),
    },
  });

  return render(component, {
    wrapper: ({ children }) => (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            chains={supportedChains}
            children={children}
            {...options?.props}
          />
        </QueryClientProvider>
      </WagmiProvider>
    ),
  });
}
