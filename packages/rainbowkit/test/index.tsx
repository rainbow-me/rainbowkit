import { render } from '@testing-library/react';
import type { MockProviderOptions } from '@wagmi/core/connectors/mock';
import React, { ReactElement } from 'react';
import { http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import type { Chain } from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon, zora } from 'wagmi/chains';
import { MockConnector } from 'wagmi/connectors/mock';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider } from '../src/components/RainbowKitProvider/RainbowKitProvider';
import type { RainbowKitProviderProps } from '../src/components/RainbowKitProvider/RainbowKitProvider';
import { getDefaultWallets } from '../src/wallets/getDefaultWallets';

const defaultChains = [mainnet, polygon, optimism, arbitrum, base, zora];

export function renderWithProviders(
  component: ReactElement,
  options?: {
    chains?: Chain[];
    mock?: boolean;
    mockOptions?: MockProviderOptions;
    props?: Omit<RainbowKitProviderProps, 'children'>;
  },
) {
  const supportedChains: Chain[] = options?.chains || defaultChains;
  const firstChain = supportedChains[0];

  const account = privateKeyToAccount(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  ); // first anvil pk

  const client = createWalletClient({
    account,
    chain: firstChain,
    transport: http(),
  });

  const { chains, publicClient } = configureChains(supportedChains, [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? '' }),
    publicProvider(),
  ]);

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
    projectId: process.env.WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
  });

  const mockConnector = new MockConnector({
    chains,
    options: {
      chainId: firstChain.id,
      flags: { isAuthorized: true },
      walletClient: client,
      ...options?.mockOptions,
    },
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: options?.mock ? [mockConnector] : connectors,
    publicClient,
  });

  return render(component, {
    wrapper: ({ children }) => (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          children={children}
          {...options?.props}
        />
      </WagmiConfig>
    ),
  });
}
