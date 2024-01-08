import user from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { arbitrum, mainnet, optimism } from 'wagmi/chains';
import { renderWithProviders } from '../../../test/';
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

  it('List chains from <RainbowKitProvider />', async () => {
    const modal = renderWithProviders(<ChainModal onClose={() => {}} open />, {
      chains: [mainnet, arbitrum, optimism],
      mock: true,
    });

    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${optimism.id}`,
    );
    const arbitrumOption = await modal.findByTestId(
      `rk-chain-option-${optimism.id}`,
    );
    const optimismOption = await modal.findByTestId(
      `rk-chain-option-${optimism.id}`,
    );

    expect(mainnetOption).toBeInTheDocument();
    expect(arbitrumOption).toBeInTheDocument();
    expect(optimismOption).toBeInTheDocument();
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

  it('Custom chain metadata passed from <RainbowKitProvider>', async () => {
    const modal = renderWithProviders(<ChainModal onClose={() => {}} open />, {
      chains: [mainnet],
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
      'background: rgb(72, 76, 80);',
    );
  });
});
