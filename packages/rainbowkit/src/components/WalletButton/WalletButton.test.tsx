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
  const getWalletButtonLabel = async (
    connectorId?: string,
    resolvedConnectorId = connectorId,
  ) => {
    const wallets = [
      { id: 'rainbow', name: 'Rainbow' },
      { id: 'metaMask', name: 'MetaMask' },
      { id: 'base', name: 'Base', aliases: ['baseAccount'] },
      {
        id: 'coinbase',
        name: 'Coinbase Wallet',
        aliases: ['coinbaseWallet'],
      },
    ].map(({ id, name, aliases }) => mockWallet(id, name, aliases));

    const { findByTestId } = renderWithProviders(
      <WalletButton wallet={connectorId} />,
      {
        mockWallets: [{ groupName: 'Popular', wallets }],
        chains: [mainnet],
      },
    );

    const labelElement = await findByTestId(
      `rk-wallet-button-label-${resolvedConnectorId}`,
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

  it("should display 'Base' when `wallet` prop is the legacy 'baseAccount' id", async () => {
    const label = await getWalletButtonLabel('baseAccount', 'base');
    expect(label).toBe('Base');
  });

  it("should display 'Base' when `wallet` prop is a lowercased legacy 'baseAccount' id", async () => {
    const label = await getWalletButtonLabel('baseaccount', 'base');
    expect(label).toBe('Base');
  });

  it("should display 'Coinbase Wallet' when `wallet` prop is the legacy 'coinbaseWallet' id", async () => {
    const label = await getWalletButtonLabel('coinbaseWallet', 'coinbase');
    expect(label).toBe('Coinbase Wallet');
  });

  it('should throw error for non ready connectors', () => {
    for (const connector of ['ready', 'xdefi', 'uniswap']) {
      expect(() =>
        renderWithProviders(<WalletButton wallet={connector} />, {
          chains: [mainnet],
        }),
      ).toThrowError('Connector not found');
    }
  });
});
