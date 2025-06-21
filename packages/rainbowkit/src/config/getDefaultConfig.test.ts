import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig } from './getDefaultConfig';
import { mockWallet } from '../../test/mockWallet';

describe('getDefaultConfig', () => {
  it('creates a Wagmi config with default wallets', () => {
    const config = getDefaultConfig({
      appName: 'RainbowKit',
      projectId: 'test-project-id',
      chains: [mainnet],
    });

    expect(config.chains[0].id).toBe(mainnet.id);
    expect(Array.isArray(config.connectors)).toBe(true);
    expect(config.connectors.length).toBeGreaterThan(0);
  });

  it('uses a custom wallet list when provided', () => {
    const wallets = [mockWallet('rainbow', 'Rainbow')];

    const config = getDefaultConfig({
      appName: 'RainbowKit',
      projectId: 'test-project-id',
      chains: [mainnet],
      wallets,
    });

    expect(config.connectors.length).toBe(wallets.length);
  });

  it('accepts optional app metadata', () => {
    const config = getDefaultConfig({
      appName: 'RainbowKit',
      projectId: 'test-project-id',
      chains: [mainnet],
      appDescription: 'RainbowKit unit tests',
      appUrl: 'https://rainbowkit.com',
      appIcon: 'https://rainbowkit.com/rainbow.svg',
    });

    expect(Array.isArray(config.connectors)).toBe(true);
  });
});
