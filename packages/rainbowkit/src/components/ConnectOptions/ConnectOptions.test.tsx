import { screen } from '@testing-library/react';
import React from 'react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import { mockWallet } from '../../../test/mockWallet';
import { WalletButtonContext } from '../RainbowKitProvider/WalletButtonContext';
import ConnectOptions from './ConnectOptions';

const baseConnector = {
  iconUrl: '',
  iconBackground: '#fff',
  ready: true,
  connect: vi.fn(),
  recent: false,
};

const originalUA = navigator.userAgent;

function setMobileUA() {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: 'iPhone',
    configurable: true,
  });
}

function restoreUA() {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: originalUA,
    configurable: true,
  });
}

describe('<ConnectOptions /> mobile status', () => {
  beforeEach(() => {
    setMobileUA();
  });

  afterEach(() => {
    restoreUA();
  });

  it('shows MobileStatus for injected connector', () => {
    const wallets = [
      {
        groupName: 'Popular',
        wallets: [mockWallet('injected', 'Browser Wallet')],
      },
    ];
    const connector = {
      ...baseConnector,
      id: 'injected',
      name: 'Browser Wallet',
    };

    renderWithProviders(
      <WalletButtonContext.Provider
        value={{ connector, setConnector: vi.fn() }}
      >
        <ConnectOptions onClose={() => {}} />
      </WalletButtonContext.Provider>,
      { mockWallets: wallets, chains: [mainnet] },
    );

    expect(screen.getByText('Continue in Browser Wallet')).toBeInTheDocument();
  });

  it('shows MobileStatus for an EIP-6963 connector', () => {
    const connector = {
      ...baseConnector,
      id: 'eip',
      name: 'EIP Wallet',
      icon: 'data:image/png;base64,abc',
      uid: 'eip.wallet',
      isRainbowKitConnector: false,
    };

    renderWithProviders(
      <WalletButtonContext.Provider
        value={{ connector, setConnector: vi.fn() }}
      >
        <ConnectOptions onClose={() => {}} />
      </WalletButtonContext.Provider>,
      { chains: [mainnet] },
    );

    expect(screen.getByText('Continue in EIP Wallet')).toBeInTheDocument();
  });

  it('shows MobileOptions for WalletConnect connector', () => {
    const wallets = [
      {
        groupName: 'Popular',
        wallets: [mockWallet('walletConnect', 'WalletConnect')],
      },
    ];
    const connector = {
      ...baseConnector,
      id: 'walletConnect',
      name: 'WalletConnect',
    };

    renderWithProviders(
      <WalletButtonContext.Provider
        value={{ connector, setConnector: vi.fn() }}
      >
        <ConnectOptions onClose={() => {}} />
      </WalletButtonContext.Provider>,
      { mockWallets: wallets, chains: [mainnet] },
    );

    expect(screen.getByText('Get a Wallet')).toBeInTheDocument();
    expect(
      screen.queryByText('Continue in WalletConnect'),
    ).not.toBeInTheDocument();
  });

  it('shows MobileOptions for Coinbase connector', () => {
    const wallets = [
      {
        groupName: 'Popular',
        wallets: [mockWallet('coinbase', 'Coinbase Wallet')],
      },
    ];
    const connector = {
      ...baseConnector,
      id: 'coinbase',
      name: 'Coinbase Wallet',
    };

    renderWithProviders(
      <WalletButtonContext.Provider
        value={{ connector, setConnector: vi.fn() }}
      >
        <ConnectOptions onClose={() => {}} />
      </WalletButtonContext.Provider>,
      { mockWallets: wallets, chains: [mainnet] },
    );

    expect(screen.getByText('Get a Wallet')).toBeInTheDocument();
    expect(
      screen.queryByText('Continue in Coinbase Wallet'),
    ).not.toBeInTheDocument();
  });
});
