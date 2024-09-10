import React from 'react';
import {
  type SpyInstance,
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import { mockWallet } from '../../../test/mockWallet';
import { WalletButton } from './WalletButton';

let mockError: ReturnType<SpyInstance['mockImplementation']>;

beforeAll(() => {
  // Silence the error logs if the component throws an error
  mockError = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  mockError.mockRestore();
});

describe('<WalletButton />', () => {
  const getWalletButtonLabel = async (connectorId?: string) => {
    const wallets = [
      { id: 'rainbow', name: 'Rainbow' },
      { id: 'metaMask', name: 'MetaMask' },
      { id: 'coinbase', name: 'Coinbase Wallet' },
    ].map(({ id, name }) => mockWallet(id, name));

    const { findByTestId } = renderWithProviders(
      <WalletButton wallet={connectorId} />,
      {
        mockWallets: [{ groupName: 'Popular', wallets }],
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
      ).toThrowError('Connector not found');
    }
  });
});
