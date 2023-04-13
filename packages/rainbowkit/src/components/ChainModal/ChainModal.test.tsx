import { fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { arbitrum, goerli, mainnet, optimism } from 'wagmi/chains';
import { renderWithProvider } from '../../../test/utils';
import { ChainModal } from './ChainModal';

describe('<ChainModal />', () => {
  it('Unsupported chain', async () => {
    const modal = renderWithProvider(<ChainModal onClose={() => {}} open />, {
      connectorOptions: { chainId: goerli.id }, // is connected to goerli
      supportedChains: [mainnet], // only supports mainnet
    });
    expect(
      await modal.findByText(
        'Wrong network detected, switch or disconnect to continue.'
      )
    ).toBeInTheDocument();
  });

  it('List chains provided in <RainbowKitProvider />', async () => {
    const modal = renderWithProvider(<ChainModal onClose={() => {}} open />, {
      rainbowKit: { chains: [optimism] },
      supportedChains: [mainnet, arbitrum, optimism],
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

  it('Show current connected chain indicator', async () => {
    const modal = renderWithProvider(<ChainModal onClose={() => {}} open />, {
      connectorOptions: { chainId: mainnet.id },
      supportedChains: [mainnet, arbitrum],
    });
    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`
    );

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(mainnetOption).toBeDisabled();
  });

  it('Can switch chains', async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProvider(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />,
      {
        connectorOptions: { chainId: mainnet.id },
        supportedChains: [mainnet, arbitrum],
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
    const modal = renderWithProvider(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />,
      {
        connectorOptions: {
          chainId: mainnet.id,
          flags: { failSwitchChain: true, isAuthorized: true },
        },
        supportedChains: [mainnet, arbitrum],
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
    const appName = 'Test App';
    const modal = renderWithProvider(<ChainModal onClose={() => {}} open />, {
      connectorOptions: {
        flags: { isAuthorized: true, noSwitchChain: true },
      },
      rainbowKit: { appInfo: { appName } },
    });

    expect(modal.baseElement).toHaveTextContent(
      `Your wallet does not support switching networks from ${appName}. ` +
        'Try switching networks from within your wallet instead.'
    );
  });

  it(`Closes on escape press`, async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProvider(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />
    );

    await fireEvent.keyDown(modal.baseElement, {
      charCode: 27,
      code: 'Escape',
      key: 'Escape',
      keyCode: 27,
    });

    expect(onCloseGotCalled).toBe(true);
  });

  it(`Closes on close button press`, async () => {
    let onCloseGotCalled = false;
    const modal = renderWithProvider(
      <ChainModal onClose={() => (onCloseGotCalled = true)} open />
    );

    const closeButton = await modal.findByLabelText('Close');
    await user.click(closeButton);

    expect(onCloseGotCalled).toBe(true);
  });
});
