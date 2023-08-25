import user from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { arbitrum, goerli, mainnet, optimism } from 'wagmi/chains';
import { renderWithProviders } from '../../../test/';
import { ChainModal } from './ChainModal';

describe('<ChainModal />', () => {
  it('Unsupported chain', async () => {
    const { findByText } = renderWithProviders(
      <ChainModal onClose={() => {}} open />,
      {
        chains: [mainnet], // only supports mainnet
        mock: true,
        mockOptions: { chainId: goerli.id }, // is connected to goerli
      }
    );
    expect(
      await findByText(
        'Wrong network detected, switch or disconnect to continue.'
      )
    ).toBeVisible();
  });

  it('Show current connected chain indicator', async () => {
    const modal = renderWithProviders(<ChainModal onClose={() => {}} open />, {
      mock: true,
    });
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`
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
      `rk-chain-option-${optimism.id}`
    );

    // optimism SHOULD be displayed
    // as it was the only passed to RainbowKitProvider
    expect(optimismOption).toBeInTheDocument();

    // mainnet & arb SHOULD NOT be displayed
    // even tho they're supported they were not passed to RainbowKitProvider
    expect(
      modal.queryByTestId(`rk-chain-option-${mainnet.id}`)
    ).not.toBeInTheDocument();
    expect(
      modal.queryByTestId(`rk-chain-option-${arbitrum.id}`)
    ).not.toBeInTheDocument();
  });

  it('Can switch chains', async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProviders(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />,
      {
        mock: true,
      }
    );
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`
    );
    const arbitrumOption = await modal.findByTestId(
      `rk-chain-option-${arbitrum.id}`
    );

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(arbitrumOption).not.toHaveTextContent('Connected');

    await user.click(arbitrumOption);

    expect(mainnetOption).not.toHaveTextContent('Connected');
    expect(arbitrumOption).toHaveTextContent('Connected');

    expect(onCloseGotCalled).toBe(true);
  });

  it('Just closes on switch error (user rejected, or other)', async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProviders(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />,
      {
        mock: true,
        mockOptions: {
          chainId: mainnet.id,
          flags: { failSwitchChain: true, isAuthorized: true },
        },
      }
    );
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`
    );
    const arbitrumOption = await modal.findByTestId(
      `rk-chain-option-${arbitrum.id}`
    );

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(arbitrumOption).not.toHaveTextContent('Connected');

    await user.click(arbitrumOption);

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(arbitrumOption).not.toHaveTextContent('Connected'); // keep not having it lmao

    expect(onCloseGotCalled).toBe(true);
  });

  it(`Handles wallets that don't support switching`, async () => {
    const modal = renderWithProviders(<ChainModal onClose={() => {}} open />, {
      mock: true,
      mockOptions: {
        flags: { isAuthorized: true, noSwitchChain: true },
      },
    });

    expect(modal.baseElement).toHaveTextContent(
      `Your wallet does not support switching networks from`
    );
  });

  it(`Closes on close button press`, async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProviders(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />,
      {
        mock: true,
      }
    );
    const closeButton = await modal.findByLabelText('Close');
    await user.click(closeButton);

    expect(onCloseGotCalled).toBe(true);
  });
});
