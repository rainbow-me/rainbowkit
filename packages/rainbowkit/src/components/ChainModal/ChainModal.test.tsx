import user from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { arbitrum, mainnet, optimism } from 'wagmi/chains';
import { renderWithProviders } from '../../../test/';
import { RainbowKitChain as Chain } from '../RainbowKitProvider/RainbowKitChainContext';
import { ChainModal } from './ChainModal';

describe('<ChainModal />', () => {
  it('Show current connected chain indicator', async () => {
    const modal = renderWithProviders(<ChainModal onClose={() => {}} open />, {
      mock: true,
    });
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`,
    );

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(mainnetOption).toBeDisabled();
  });

  it('List chains provided in <RainbowKitProvider />', async () => {
    const modal = renderWithProviders(<ChainModal onClose={() => {}} open />, {
      chains: [mainnet, arbitrum, optimism],
      mock: true,
      props: { chains: [optimism] },
    });

    const optimismOption = await modal.findByTestId(
      `rk-chain-option-${optimism.id}`,
    );

    // optimism SHOULD be displayed
    // as it was the only passed to RainbowKitProvider
    expect(optimismOption).toBeInTheDocument();

    // mainnet & arb SHOULD NOT be displayed
    // even tho they're supported they were not passed to RainbowKitProvider
    expect(
      modal.queryByTestId(`rk-chain-option-${mainnet.id}`),
    ).not.toBeInTheDocument();
    expect(
      modal.queryByTestId(`rk-chain-option-${arbitrum.id}`),
    ).not.toBeInTheDocument();
  });

  // Wagmi can also switch chains without having your wallet connected
  it('Can switch chains', async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProviders(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />,
      {
        mock: true,
      },
    );
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`,
    );
    const arbitrumOption = await modal.findByTestId(
      `rk-chain-option-${arbitrum.id}`,
    );

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(arbitrumOption).not.toHaveTextContent('Connected');

    await user.click(arbitrumOption);

    expect(mainnetOption).not.toHaveTextContent('Connected');
    expect(arbitrumOption).toHaveTextContent('Connected');

    expect(onCloseGotCalled).toBe(true);
  });

  it('Closes on close button press', async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProviders(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />,
    );
    const closeButton = await modal.findByLabelText('Close');

    await user.click(closeButton);

    expect(onCloseGotCalled).toBe(true);
  });

  it('Custom chain metadata', async () => {
    const customChains: readonly [Chain, ...Chain[]] = [
      {
        ...mainnet,
        name: 'Custom Chain',
        iconUrl: 'https://example.com/icon.svg',
        iconBackground: '#fff',
      },
    ];

    const modal = renderWithProviders(<ChainModal onClose={() => {}} open />, {
      chains: customChains,
    });
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`,
    );
    expect(mainnetOption).toHaveTextContent('Ethereum');

    const mainnetOptionIcon = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}-icon`,
    );
    expect(mainnetOptionIcon).toHaveAttribute(
      'style',
      'background: rgb(255, 255, 255);',
    );
  });
});
