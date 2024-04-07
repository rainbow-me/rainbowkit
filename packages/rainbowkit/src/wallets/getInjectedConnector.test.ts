import { describe, expect, expectTypeOf, it } from 'vitest';
import { CreateConnectorFn } from 'wagmi';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';

describe('getInjectedConnector', () => {
  it('should return wagmi connector type for rainbow', () => {
    window.ethereum = { isRainbow: true };
    const connector = getInjectedConnector({
      id: 'rainbow',
      name: 'Rainbow',
      flag: 'isRainbow',
    });
    expectTypeOf(connector).toMatchTypeOf<CreateConnectorFn>();
  });

  it('should return wagmi connector type for metamask', () => {
    window.ethereum = { isMetaMask: true };
    const connector = getInjectedConnector({
      id: 'metamask',
      name: 'MetaMask',
      flag: 'isMetaMask',
    });
    expectTypeOf(connector).toMatchTypeOf<CreateConnectorFn>();
  });
});

describe('hasInjectedProvider', () => {
  it('only rainbow flag', () => {
    window.ethereum = { isMetaMask: true, isRainbow: true };
    const hasRainbow = hasInjectedProvider({ flag: 'isRainbow' });
    expect(hasRainbow).toEqual(true);
  });

  it('only metamask flag', () => {
    window.ethereum = { isMetaMask: true };
    const hasRainbow = hasInjectedProvider({ flag: 'isRainbow' });
    expect(hasRainbow).toEqual(false);
  });

  it('only coinbase flag', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
    };
    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);
  });

  it('only enkrypt namespace', () => {
    // @ts-expect-error - window namespace for enkrypt
    window.enkrypt = {
      providers: {
        ethereum: { isMetaMask: true },
      },
    };
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
    };
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
    };
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
    };

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
    };

    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);

    const hasRainbow = hasInjectedProvider({ flag: 'isRainbow' });
    expect(hasRainbow).toEqual(true);

    const hasMetaMask = hasInjectedProvider({ flag: 'isMetaMask' });
    expect(hasMetaMask).toEqual(true);
  });
});
