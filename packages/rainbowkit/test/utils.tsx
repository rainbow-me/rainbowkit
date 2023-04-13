import { render } from '@testing-library/react';
import { MockProviderOptions } from '@wagmi/connectors/mock';
import { Wallet } from 'ethers';
import React, { ReactElement } from 'react';
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { MockConnector } from 'wagmi/connectors/mock';
import { publicProvider } from 'wagmi/providers/public';
import {
  RainbowKitProvider,
  RainbowKitProviderProps,
} from '../src/components/RainbowKitProvider/RainbowKitProvider';

const defaultSigner = new Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // first anvil pk
);

const defaultSupportedChains = [mainnet, arbitrum, polygon, optimism];

export const renderWithProvider = (
  component: ReactElement,
  {
    connectorOptions,
    rainbowKit = { chains: defaultSupportedChains },
    supportedChains = defaultSupportedChains,
  }: {
    supportedChains?: Chain[];
    rainbowKit?: Omit<RainbowKitProviderProps, 'children' | 'chains'> & {
      chains?: Chain[];
    };
    connectorOptions?: Partial<MockProviderOptions>;
  } = {} as any
) => {
  const { chains, provider } = configureChains(supportedChains, [
    publicProvider(), // anvil?
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: [
      new MockConnector({
        chains,
        options: {
          chainId: mainnet.id,
          flags: { isAuthorized: true },
          signer: defaultSigner,
          ...connectorOptions,
        },
      }),
    ],
    provider,
  });

  const rainbowKitProps = {
    ...rainbowKit,
    chains: rainbowKit.chains || defaultSupportedChains,
  };

  return render(component, {
    wrapper: ({ children }) => (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider {...rainbowKitProps} children={children} />
      </WagmiConfig>
    ),
  });
};
