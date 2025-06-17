import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig } from './getDefaultConfig';

describe('getDefaultConfig', () => {
  it('creates a Wagmi config with default wallets', () => {
    const config = getDefaultConfig({
      appName: 'rainbowkit.com',
      projectId: 'test-project-id',
      chains: [mainnet],
    });

    expect(config.chains[0].id).toBe(mainnet.id);
    expect(Array.isArray(config.connectors)).toBe(true);
    expect(config.connectors.length).toBeGreaterThan(0);
  });
});
