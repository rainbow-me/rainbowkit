import user from '@testing-library/user-event';
import React, { Fragment } from 'react';
import { describe, expect, it } from 'vitest';
import { useConnect } from 'wagmi';
import { type Chain, arbitrum, mainnet, optimism } from 'wagmi/chains';
import { renderWithProviders } from '../../../test/';
import { ChainModal } from './ChainModal';

const ChainModalWithConnectButton = ({ onClose }: { onClose?: () => void }) => {
  const { connect, connectors } = useConnect();

  return (
    <Fragment>
      <ChainModal
        onClose={() => {
          if (onClose) onClose();
        }}
        open
      />
      <button
        onClick={() => connect({ connector: connectors[0] })}
        data-testid="rk-connect-btn"
      >
        connect
      </button>
    </Fragment>
  );
};

describe('<ChainModal />', () => {
  const renderChainModalWithConnectedWallet = async (
    chains?: readonly [Chain, ...Chain[]],
    onClose?: () => void,
  ) => {
    const modal = renderWithProviders(
      <ChainModalWithConnectButton onClose={onClose} />,
      {
        chains,
      },
    );

    const connectButtonOption = await modal.findByTestId('rk-connect-btn');

    await user.click(connectButtonOption);

    return modal;
  };

  it('Show current connected chain indicator', async () => {
    const modal = await renderChainModalWithConnectedWallet();

    const mainnetOption = await modal.findByTestId(
      `rk-chain-option-${mainnet.id}`,
    );

    expect(mainnetOption).toHaveTextContent('Connected');
    expect(mainnetOption).toBeDisabled();
  });

  it('List chains from <RainbowKitProvider />', async () => {
    const modal = await renderChainModalWithConnectedWallet([
      mainnet,
      arbitrum,
      optimism,
    ]);

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

  it('Can switch chains', async () => {
    let onCloseGotCalled = false;

    const modal = await renderChainModalWithConnectedWallet(
      [mainnet, arbitrum],
      () => {
        onCloseGotCalled = true;
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

    const modal = await renderChainModalWithConnectedWallet([mainnet], () => {
      onCloseGotCalled = true;
    });

    const closeButton = await modal.findByLabelText('Close');

    await user.click(closeButton);

    expect(onCloseGotCalled).toBe(true);
  });

  it('Custom chain metadata passed from <RainbowKitProvider>', async () => {
    const modal = await renderChainModalWithConnectedWallet([mainnet]);

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
