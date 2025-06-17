import { describe, expect, it } from 'vitest';
import { getDefaultWallets } from './getDefaultWallets';

const params = {
  appName: 'rainbowkit.com',
  projectId: 'test-project-id',
} as const;

describe('getDefaultWallets', () => {
  it('returns only wallets when no parameters are provided', () => {
    const result = getDefaultWallets();
    expect(Array.isArray(result.wallets)).toBe(true);
    expect(result.wallets[0]?.groupName).toBe('Popular');
    // @ts-expect-error - connectors should not exist
    expect(result.connectors).toBeUndefined();
  });

  it('returns connectors and wallets when parameters are provided', () => {
    const { wallets, connectors } = getDefaultWallets(params);
    expect(Array.isArray(wallets)).toBe(true);
    expect(wallets[0]?.wallets.length).toBeGreaterThan(0);
    expect(Array.isArray(connectors)).toBe(true);
    expect(connectors.length).toBeGreaterThan(0);
  });
});
