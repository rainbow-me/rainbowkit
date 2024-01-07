import { describe, expect, it } from 'vitest';
import type { WindowProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';

describe('getInjectedConnector', () => {
  const chains = [mainnet];

  it('only rainbow provider', () => {
    window.ethereum = { isMetaMask: true, isRainbow: true } as WindowProvider;
    const connector = getInjectedConnector({
      flag: 'isRainbow',
      chains,
    });
    expect(connector.name).toEqual('Rainbow');
  });

  it('only metamask provider', () => {
    window.ethereum = { isMetaMask: true } as WindowProvider;
    const connector = getInjectedConnector({
      flag: 'isMetaMask',
      chains,
    });
    expect(connector.name).toEqual('MetaMask');
  });

  describe('rainbow and metamask providers', () => {
    it('rainbow default enabled', () => {
      window.ethereum = {
        isMetaMask: true,
        isRainbow: true,
        providers: [
          { isMetaMask: true, isRainbow: true },
          { isMetaMask: true },
        ],
      } as WindowProvider;
      const connector = getInjectedConnector({
        flag: 'isRainbow',
        chains,
      });
      expect(connector.name).toEqual('Rainbow');
    });

    it('rainbow default disabled rainbow connector', () => {
      window.ethereum = {
        isMetaMask: true,
        providers: [
          { isMetaMask: true },
          { isMetaMask: true, isRainbow: true },
        ],
      } as WindowProvider;
      const connector = getInjectedConnector({
        flag: 'isRainbow',
        chains,
      });
      expect(connector.name).toEqual('Rainbow');
    });

    it('rainbow default disabled metamask connector', () => {
      window.ethereum = {
        isMetaMask: true,
        providers: [
          { isMetaMask: true },
          { isMetaMask: true, isRainbow: true },
        ],
      } as WindowProvider;
      const connector = getInjectedConnector({
        flag: 'isMetaMask',
        chains,
      });
      expect(connector.name).toEqual('MetaMask');
    });
  });
});

describe('hasInjectedProvider', () => {
  it('only rainbow flag', () => {
    window.ethereum = { isMetaMask: true, isRainbow: true } as WindowProvider;
    const hasRainbow = hasInjectedProvider({ flag: 'isRainbow' });
    expect(hasRainbow).toEqual(true);
  });

  it('only metamask flag', () => {
    window.ethereum = { isMetaMask: true } as WindowProvider;
    const hasRainbow = hasInjectedProvider({ flag: 'isRainbow' });
    expect(hasRainbow).toEqual(false);
  });

  it('only coinbase flag', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
    } as WindowProvider;
    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);
  });

  it('only enkrypt namespace', () => {
    // @ts-expect-error - window namespace for enkrypt
    window.enkrypt = {
      providers: {
        ethereum: { isMetaMask: true },
      },
    } as WindowProvider;
    const hasEnkrypt = hasInjectedProvider({
      namespace: 'enkrypt.providers.ethereum',
    });
    expect(hasEnkrypt).toEqual(true);
  });

  it('core namespace and flag', () => {
    // @ts-expect-error - window namespace for avalanche, core
    window.avalanche = {
      isMetaMask: true,
      isAvalanche: true,
    } as WindowProvider;
    const hasCore = hasInjectedProvider({
      namespace: 'avalanche',
      flag: 'isAvalanche',
    });
    expect(hasCore).toEqual(true);
  });

  it('core namespace and flag, fallback', () => {
    window.ethereum = {
      isMetaMask: true,
      isAvalanche: true,
    } as WindowProvider;
    const hasCore = hasInjectedProvider({
      namespace: 'avalanche',
      flag: 'isAvalanche',
    });
    expect(hasCore).toEqual(true);
  });

  it('has rainbow and coinbase wallet', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
      providers: [
        { isMetaMask: true, isCoinbaseWallet: true },
        { isMetaMask: true, isRainbow: true },
      ],
    } as WindowProvider;

    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);

    const hasRainbow = hasInjectedProvider({ flag: 'isRainbow' });
    expect(hasRainbow).toEqual(true);
  });

  it('has rainbow, coinbase wallet, and metamask', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
      providers: [
        { isMetaMask: true, isCoinbaseWallet: true },
        { isMetaMask: true, isRainbow: true },
        { isMetaMask: true },
      ],
    } as WindowProvider;

    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);

    const hasRainbow = hasInjectedProvider({ flag: 'isRainbow' });
    expect(hasRainbow).toEqual(true);

    const hasMetaMask = hasInjectedProvider({ flag: 'isMetaMask' });
    expect(hasMetaMask).toEqual(true);
  });
});
