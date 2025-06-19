import user from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import type { WalletConnector } from '../../wallets/useWalletConnectors';
import { WalletButton } from './MobileOptions';

const connectMock = vi.fn(() => Promise.reject(new Error('rejected')));

const failingWallet = {
  id: 'mock',
  name: 'Mock',
  iconUrl: 'data:image/png;base64,iVBORw0KGgo=',
  iconBackground: '#fff',
  ready: true,
  connect: connectMock,
  recent: false,
  // Other WalletConnector fields are not required for this specific test.
} as unknown as WalletConnector;

describe('<WalletButton />', () => {
  it('catches rejected connect() calls', async () => {
    const unhandled = vi.fn();
    window.addEventListener('unhandledrejection', unhandled);

    renderWithProviders(<WalletButton wallet={failingWallet} />, {
      chains: [mainnet],
    });

    const button = screen.getByTestId('rk-wallet-option-mock');
    await user.click(button);

    await waitFor(() => {
      expect(connectMock).toHaveBeenCalled();
      expect(unhandled).not.toHaveBeenCalled();
    });

    window.removeEventListener('unhandledrejection', unhandled);
  });
});
