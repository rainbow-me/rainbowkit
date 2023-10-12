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
      flag: 'isRainbow',
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
  it('only rainbow provider', () => {
    window.ethereum = { isMetaMask: true, isRainbow: true } as WindowProvider;
    const hasRainbow = hasInjectedProvider('isRainbow');
    expect(hasRainbow).toEqual(true);
  });

  it('only metamask provider', () => {
    window.ethereum = { isMetaMask: true } as WindowProvider;
    const hasRainbow = hasInjectedProvider('isRainbow');
    expect(hasRainbow).toEqual(false);
  });

  it('only coinbase provider', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
    } as WindowProvider;
    const hasCoinbase = hasInjectedProvider('isCoinbaseWallet');
    expect(hasCoinbase).toEqual(true);
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

    const hasCoinbase = hasInjectedProvider('isCoinbaseWallet');
    expect(hasCoinbase).toEqual(true);

    const hasRainbow = hasInjectedProvider('isRainbow');
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

    const hasCoinbase = hasInjectedProvider('isCoinbaseWallet');
    expect(hasCoinbase).toEqual(true);

    const hasRainbow = hasInjectedProvider('isRainbow');
    expect(hasRainbow).toEqual(true);

    const hasMetaMask = hasInjectedProvider('isMetaMask');
    expect(hasMetaMask).toEqual(true);
  });
});
