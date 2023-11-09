import user from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import {
  arbitrum,
  avalanche,
  fantom,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';
import { renderWithProviders } from '../../../test/';
import { ChainModal } from './ChainModal';

describe('<ChainModal />', () => {
  it('Unsupported chain', async () => {
    const { findByText } = renderWithProviders(
      <ChainModal mockChainId={1} onClose={() => {}} open />,
      {
        chains: [polygon], // only supports mainnet
        mock: true,
      },
    );

    expect(
      await findByText(
        'Wrong network detected, switch or disconnect to continue.',
      ),
    ).toBeVisible();
  });

  it('Show current connected chain indicator', async () => {
    const modal = renderWithProviders(
      <ChainModal mockChainId={1} onClose={() => {}} open />,
      {
        mock: true,
      },
    );
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`,
    );

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(mainnetOption).toBeDisabled();
  });

  it('List chains provided in <RainbowKitProvider />', async () => {
    const modal = renderWithProviders(
      <ChainModal mockChainId={10} onClose={() => {}} open />,
      {
        mock: true,
      },
    );

    const optimismOption = await modal.findByTestId(
      `rk-chain-option-${optimism.id}`,
    );

    // optimism SHOULD be displayed
    // as it was the only passed to RainbowKitProvider
    expect(optimismOption).toBeInTheDocument();
    // mainnet & arb SHOULD NOT be displayed
    // even tho they're supported they were not passed to RainbowKitProvider
    expect(
      modal.queryByTestId(`rk-chain-option-${fantom.id}`),
    ).not.toBeInTheDocument();
    expect(
      modal.queryByTestId(`rk-chain-option-${avalanche.id}`),
    ).not.toBeInTheDocument();
  });

  it('Just closes on switch error (user rejected, or other)', async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProviders(
      // biome-ignore lint/suspicious/noAssignInExpressions: TODO
      <ChainModal
        mockChainId={1}
        onClose={() => (onCloseGotCalled = true)}
        open
      />,
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

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(arbitrumOption).not.toHaveTextContent('Connected'); // keep not having it lmao

    expect(onCloseGotCalled).toBe(true);
  });

  it('Closes on close button press', async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProviders(
      <ChainModal
        mockChainId={1}
        // biome-ignore lint/suspicious/noAssignInExpressions: TODO
        onClose={() => (onCloseGotCalled = true)}
        open
      />,
      {
        mock: true,
      },
    );
    const closeButton = await modal.findByLabelText('Close');
    await user.click(closeButton);

    expect(onCloseGotCalled).toBe(true);
  });
});
