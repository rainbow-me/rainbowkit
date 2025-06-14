import React from 'react';
import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../test';
import { mockWallet } from '../../test/mockWallet';
import { useWalletConnectors } from './useWalletConnectors';
import { addRecentWalletId } from './recentWalletIds';

function Capture({ onResult }: { onResult: (wallets: any[]) => void }) {
  const wallets = useWalletConnectors(true);
  onResult(wallets);
  return null;
}

describe('useWalletConnectors', () => {
  it('deduplicates by rdns and sorts installed then recent', async () => {
    const walletLists = [
      {
        groupName: 'A',
        wallets: [
          () => ({
            ...mockWallet('first', 'First')(),
            rdns: '1',
            installed: true,
          }),
        ],
      },
      {
        groupName: 'B',
        wallets: [
          () => ({
            ...mockWallet('second', 'Second')(),
            rdns: '2',
            installed: false,
          }),
        ],
      },
      {
        groupName: 'C',
        wallets: [
          () => ({
            ...mockWallet('third', 'Third')(),
            rdns: '3',
            installed: false,
          }),
        ],
      },
      {
        groupName: 'D',
        wallets: [
          () => ({
            ...mockWallet('dup', 'Dup')(),
            rdns: '3',
            installed: false,
          }),
        ],
      },
    ];
    addRecentWalletId('second');
    const results: any[] = [];
    renderWithProviders(<Capture onResult={(w) => results.push(...w)} />, {
      mockWallets: walletLists,
      chains: [mainnet],
    });
    expect(results.map((w) => w.id)).toEqual(['first', 'second', 'third']);
  });
});
