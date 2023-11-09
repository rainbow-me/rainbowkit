import { describe, expect, it } from 'vitest';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';

describe('getInjectedConnector', () => {
  it('should return injected connector', () => {
    window.ethereum = { isMetaMask: true, isRainbow: true };
    const connector = getInjectedConnector({
      flag: 'isRainbow',
    });
    expect(!!connector).toBe(true);
  });
});

describe('hasInjectedProvider', () => {
  it('only rainbow provider', () => {
    window.ethereum = { isMetaMask: true, isRainbow: true };
    const hasRainbow = hasInjectedProvider('isRainbow');
    expect(hasRainbow).toEqual(true);
  });

  it('only metamask provider', () => {
    window.ethereum = { isMetaMask: true };
    const hasRainbow = hasInjectedProvider('isRainbow');
    expect(hasRainbow).toEqual(false);
  });

  it('only coinbase provider', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
    };
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
    };

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
    };

    const hasCoinbase = hasInjectedProvider('isCoinbaseWallet');
    expect(hasCoinbase).toEqual(true);

    const hasRainbow = hasInjectedProvider('isRainbow');
    expect(hasRainbow).toEqual(true);

    const hasMetaMask = hasInjectedProvider('isMetaMask');
    expect(hasMetaMask).toEqual(true);
  });
});
