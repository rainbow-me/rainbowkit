import { describe, expect, it } from 'vitest';
import { metaMaskWallet } from './metaMaskWallet';

const projectId = 'test-id';

describe('isMetaMask', () => {
  it('returns undefined for impersonating wallet flags', () => {
    window.ethereum = { isMetaMask: true, isSafePal: true } as any;
    const wallet = metaMaskWallet({ projectId });
    expect(wallet.installed).toBeUndefined();
  });
});
