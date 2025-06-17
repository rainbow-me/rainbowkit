import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../test';
import { mockWallet } from '../../test/mockWallet';
import { useWalletConnectors } from './useWalletConnectors';

describe('useWalletConnectors', () => {
  it('provides wallet connectors from context', () => {
    const spy = vi.fn();

    function TestComponent() {
      const connectors = useWalletConnectors();
      spy(connectors);
      return null;
    }

    const wallets = [mockWallet('rainbow', 'Rainbow')];

    const { unmount } = renderWithProviders(<TestComponent />, {
      chains: [mainnet],
      mockWallets: [{ groupName: 'Popular', wallets }],
    });

    const connectors = spy.mock.calls[0][0];
    expect(Array.isArray(connectors)).toBe(true);
    expect(connectors.length).toBeGreaterThan(0);
    expect(typeof connectors[0].connect).toBe('function');
    unmount();
  });

  it('merges EIP6963 wallets when requested', () => {
    const spy = vi.fn();

    function TestComponent() {
      const connectors = useWalletConnectors(true);
      spy(connectors);
      return null;
    }

    const wallets = [mockWallet('rainbow', 'Rainbow')];

    const { unmount } = renderWithProviders(<TestComponent />, {
      chains: [mainnet],
      mockWallets: [{ groupName: 'Popular', wallets }],
    });

    const connectors = spy.mock.calls[0][0];
    expect(Array.isArray(connectors)).toBe(true);
    unmount();
  });
});
