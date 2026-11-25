import { describe, expect, it } from 'vitest';
import { provideRainbowKitChains } from './provideRainbowKitChains';
import type { RainbowKitChain } from './RainbowKitChainContext';

const chainWithId = (id: number): RainbowKitChain =>
  ({
    id,
    name: `Chain ${id}`,
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    rpcUrls: { default: { http: ['https://example.com'] } },
  }) as RainbowKitChain;

const resolveIconUrl = async (chain: RainbowKitChain) => {
  const { iconUrl } = chain;
  return typeof iconUrl === 'function' ? await iconUrl() : iconUrl;
};

describe('provideRainbowKitChains', () => {
  it('uses the HyperEVM icon for chain id 999', async () => {
    const [hyperEvm] = provideRainbowKitChains([chainWithId(999)]);

    const hyperEvmIcon = (await import('./chainIcons/hyperevm.svg')).default;
    const zoraIcon = (await import('./chainIcons/zora.svg')).default;

    expect(hyperEvmIcon).not.toBe(zoraIcon);
    expect(await resolveIconUrl(hyperEvm)).toBe(hyperEvmIcon);
  });
});
