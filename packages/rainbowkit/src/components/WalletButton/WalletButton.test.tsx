import React from 'react';
import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi';
import { renderWithProviders } from '../../../test';
import { WalletButton } from './WalletButton';

describe('<WalletButton />', () => {
  const getWalletButtonLabel = async (connectorId?: string) => {
    const { findByTestId } = renderWithProviders(
      <WalletButton wallet={connectorId} />,
      {
        chains: [mainnet],
      },
    );

    const labelElement = await findByTestId(
      `rk-wallet-button-label-${connectorId}`,
    );

    return labelElement.textContent;
  };

  it("should display 'Rainbow' if no `wallet` prop specified", async () => {
    const label = await getWalletButtonLabel('rainbow');
    expect(label).toBe('Rainbow');
  });

  it("should display 'Rainbow' when `wallet` prop is 'rainbow'", async () => {
    const label = await getWalletButtonLabel('rainbow');
    expect(label).toBe('Rainbow');
  });

  it("should display 'MetaMask' when `wallet` prop is 'metaMask'", async () => {
    const label = await getWalletButtonLabel('metaMask');
    expect(label).toBe('MetaMask');
  });

  it("should display 'Coinbase Wallet' when `wallet` prop is 'coinbase'", async () => {
    const label = await getWalletButtonLabel('coinbase');
    expect(label).toBe('Coinbase Wallet');
  });

  it('should throw error for non ready connectors', () => {
    for (const connector of ['argent', 'xdefi', 'uniswap']) {
      expect(() =>
        renderWithProviders(<WalletButton wallet={connector} />, {
          chains: [mainnet],
        }),
      ).toThrow('Connector not found');
    }
  });
});
