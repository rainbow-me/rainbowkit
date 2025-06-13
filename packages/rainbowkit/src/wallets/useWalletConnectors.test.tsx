import React from 'react';
import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../test';
import { mockWallet } from '../../test/mockWallet';
import { useWalletConnectors } from './useWalletConnectors';

function Capture({ onResult }: { onResult: (wallets: any[]) => void }) {
  const wallets = useWalletConnectors(true);
  onResult(wallets);
  return null;
}

describe('useWalletConnectors', () => {
  it('deduplicates by rdns and sorts installed first', async () => {
    const walletLists = [
      {
        groupName: 'A',
        wallets: [
          () => ({
            ...mockWallet('first', 'First')(),
            rdns: 'dup',
            installed: true,
          }),
        ],
      },
      {
        groupName: 'B',
        wallets: [
          () => ({
            ...mockWallet('second', 'Second')(),
            rdns: 'dup',
            installed: false,
          }),
        ],
      },
      {
        groupName: 'C',
        wallets: [
          () => ({ ...mockWallet('third', 'Third')(), installed: false }),
        ],
      },
    ];
    const results: any[] = [];
    renderWithProviders(<Capture onResult={(w) => results.push(...w)} />, {
      mockWallets: walletLists,
      chains: [mainnet],
    });
    expect(results.map((w) => w.id)).toEqual(['first', 'third']);
  });
});
