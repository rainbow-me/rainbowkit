import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { http, type Chain } from 'viem';
import { WagmiProvider, createConfig } from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon, zora } from 'wagmi/chains';
import { MockParameters, mock } from 'wagmi/connectors';
import { RainbowKitProvider } from '../src/components/RainbowKitProvider/RainbowKitProvider';
import type { RainbowKitProviderProps } from '../src/components/RainbowKitProvider/RainbowKitProvider';
import { connectorsForWallets } from '../src/wallets/connectorsForWallets';
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
    mockFeatures?: MockParameters['features'];
    props?: Omit<RainbowKitProviderProps, 'children'>;
  },
) {
  const supportedChains = options?.chains || defaultChains;

  const { wallets } = getDefaultWallets();

  const config = createConfig({
    chains: supportedChains,
    connectors: options?.mock
      ? [
          mock({
            ...(options?.mockFeatures
              ? { features: options?.mockFeatures }
              : {}),
            accounts: [
              '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
              '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
              '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
            ],
          }),
        ]
      : connectorsForWallets(wallets, {
          appName: 'rainbowkit.com',
          projectId: process.env.WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
        }),
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
      [zora.id]: http(),
    },
  });

  return render(component, {
    wrapper: ({ children }) => (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider {...options?.props}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    ),
  });
}
