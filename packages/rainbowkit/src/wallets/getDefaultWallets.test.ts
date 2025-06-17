import { describe, expect, it } from 'vitest';
import { getDefaultWallets } from './getDefaultWallets';

const params = {
  appName: 'RainbowKit',
  projectId: 'test-project-id',
} as const;

const optionalParams = {
  ...params,
  appDescription: 'RainbowKit unit tests',
  appUrl: 'https://rainbowkit.com',
  appIcon: 'https://rainbowkit.com/rainbow.svg',
} as const;

describe('getDefaultWallets', () => {
  it('returns only wallets when no parameters are provided', () => {
    // @ts-expect-error - connectors should not exist
    const { wallets, connectors } = getDefaultWallets();
    expect(Array.isArray(wallets)).toBe(true);
    expect(wallets.length).toBeGreaterThan(0);
    expect(connectors).toBeUndefined();
  });

  it('returns connectors and wallets when parameters are provided', () => {
    const { wallets, connectors } = getDefaultWallets(params);
    expect(Array.isArray(wallets)).toBe(true);
    expect(wallets.length).toBeGreaterThan(0);
    expect(Array.isArray(connectors)).toBe(true);
    expect(connectors.length).toBeGreaterThan(0);
  });

  it('accepts optional parameters without error', () => {
    const { wallets, connectors } = getDefaultWallets(optionalParams);
    expect(Array.isArray(wallets)).toBe(true);
    expect(Array.isArray(connectors)).toBe(true);
  });
});
