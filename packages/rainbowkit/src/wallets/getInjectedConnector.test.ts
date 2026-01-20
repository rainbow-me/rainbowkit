import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mainnet } from 'wagmi/chains';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';

const mockConfig = {
  chains: [mainnet],
  emitter: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    listenerCount: vi.fn(() => 0),
  },
  storage: undefined,
} as any;

describe('getInjectedConnector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('only rainbow provider', () => {
    window.ethereum = { isMetaMask: true, isRainbow: true };
    const connector = getInjectedConnector({
      flag: 'isRainbow',
    });
    expect(!!connector).toEqual(true);
  });

  it('only metamask provider', () => {
    window.ethereum = { isMetaMask: true };
    const connector = getInjectedConnector({
      flag: 'isMetaMask',
    });
    expect(!!connector).toEqual(true);
  });

  it('deduplicates concurrent getAccounts calls on the same connector instance', async () => {
    const mockAccounts = [
      '0x1234567890123456789012345678901234567890' as const,
    ];
    const mockRequest = vi.fn().mockResolvedValue(mockAccounts);
    window.ethereum = {
      isMetaMask: true,
      request: mockRequest,
    };

    const connector = getInjectedConnector({
      flag: 'isMetaMask',
    });

    const connectorInstance = connector({
      rkDetails: {
        id: 'metaMask',
        name: 'MetaMask',
        isRainbowKitConnector: true,
      },
    } as any)(mockConfig);

    const call1 = connectorInstance.getAccounts();
    const call2 = connectorInstance.getAccounts();
    const call3 = connectorInstance.getAccounts();

    const [result1, result2, result3] = await Promise.all([
      call1,
      call2,
      call3,
    ]);
    expect(result1).toEqual(mockAccounts);
    expect(result2).toEqual(mockAccounts);
    expect(result3).toEqual(mockAccounts);

    expect(mockRequest).toHaveBeenCalledTimes(1);
  });

  it('handles getAccounts errors and clears promise', async () => {
    const mockError = new Error('RPC Error');
    const mockRequest = vi
      .fn()
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce(['0x1234567890123456789012345678901234567890']);

    window.ethereum = {
      isMetaMask: true,
      request: mockRequest,
    };

    const connector = getInjectedConnector({
      flag: 'isMetaMask',
    });

    const connectorInstance = connector({
      rkDetails: {
        id: 'metaMask',
        name: 'MetaMask',
        isRainbowKitConnector: true,
      },
    } as any)(mockConfig);

    await expect(connectorInstance.getAccounts()).rejects.toThrow('RPC Error');

    const result = await connectorInstance.getAccounts();
    expect(result).toEqual(['0x1234567890123456789012345678901234567890']);
    expect(mockRequest).toHaveBeenCalledTimes(2);
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
