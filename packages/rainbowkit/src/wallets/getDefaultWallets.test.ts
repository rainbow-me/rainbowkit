import { describe, expect, it, beforeAll, afterAll, vi } from 'vitest';
import { getDefaultWallets } from './getDefaultWallets';

const params = {
  appName: 'rainbowkit.com',
  projectId: 'test-project-id',
} as const;

const optionalParams = {
  ...params,
  appDescription: 'desc',
  appUrl: 'https://rk.com',
  appIcon: '/logo.png',
} as const;

describe('getDefaultWallets', () => {
  beforeAll(() => {
    vi.spyOn(process.stdout, 'write').mockImplementation(
      () => true as unknown as number,
    );
  });
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

  it('accepts optional parameters without error', () => {
    const { wallets, connectors } = getDefaultWallets(optionalParams);
    expect(Array.isArray(wallets)).toBe(true);
    expect(Array.isArray(connectors)).toBe(true);
  });
});
