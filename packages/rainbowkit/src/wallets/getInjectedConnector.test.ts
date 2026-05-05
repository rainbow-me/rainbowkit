import type { EIP1193EventMap, EIP1193Provider } from 'viem';
import { describe, expect, it, vi } from 'vitest';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';

type MockInjectedProvider = Omit<EIP1193Provider, 'request'> & {
  emit<event extends keyof EIP1193EventMap>(
    event: event,
    ...args: Parameters<EIP1193EventMap[event]>
  ): void;
  listenerCount(event: keyof EIP1193EventMap): number;
  request: ReturnType<typeof vi.fn>;
} & Record<string, unknown>;

function createMockInjectedProvider(
  flags: Record<string, boolean> = {},
): MockInjectedProvider {
  const listeners = new Map<string, Set<(...args: any[]) => void>>();

  // Use a provider mock so wagmi's real injected connector still attaches
  // EIP-1193 listeners during setup.
  return {
    ...flags,
    request: vi.fn(async ({ method }: { method: string }) => {
      if (method === 'eth_accounts') {
        return ['0x1234567890123456789012345678901234567890'];
      }
      if (method === 'eth_chainId') {
        return '0x1';
      }
      return null;
    }),
    on: vi.fn((event: string, listener: (...args: any[]) => void) => {
      const eventListeners = listeners.get(event) ?? new Set();
      eventListeners.add(listener);
      listeners.set(event, eventListeners);
    }),
    removeListener: vi.fn(
      (event: string, listener: (...args: any[]) => void) => {
        listeners.get(event)?.delete(listener);
      },
    ),
    emit(event: string, ...args: any[]) {
      for (const listener of listeners.get(event) ?? []) {
        listener(...args);
      }
    },
    listenerCount(event: string) {
      return listeners.get(event)?.size ?? 0;
    },
  } as MockInjectedProvider;
}

async function flushMicrotasks() {
  await Promise.resolve();
  await Promise.resolve();
}

describe('getInjectedConnector', () => {
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

  it('does not bind a missing flag-specific wallet to a different injected provider', async () => {
    const metaMaskProvider = createMockInjectedProvider({ isMetaMask: true });
    const phantomProvider = createMockInjectedProvider({ isPhantom: true });
    window.ethereum = {
      providers: [metaMaskProvider, phantomProvider],
    };

    // Rabby is configured but missing; other injected wallets are present.
    // The connector must not bind Rabby's identity to their provider instances.
    const connector = getInjectedConnector({
      flag: 'isRabby',
    })({
      rkDetails: {
        id: 'rabby',
        name: 'Rabby Wallet',
        isRainbowKitConnector: true,
      },
    } as any);

    createConfig({
      chains: [mainnet],
      connectors: [connector],
      storage: null,
      transports: {
        [mainnet.id]: http(),
      },
    });

    await flushMicrotasks();

    // If fallback picked MetaMask or Phantom, wagmi setup would subscribe the
    // Rabby connector to that provider's events.
    expect(metaMaskProvider.listenerCount('connect')).toBe(0);
    expect(metaMaskProvider.listenerCount('accountsChanged')).toBe(0);
    expect(phantomProvider.listenerCount('connect')).toBe(0);
    expect(phantomProvider.listenerCount('accountsChanged')).toBe(0);
  });

  it('ignores connect events from other providers when a flag-specific wallet is missing', async () => {
    const metaMaskProvider = createMockInjectedProvider({ isMetaMask: true });
    metaMaskProvider.request.mockImplementation(
      async ({ method }: { method: string }) => {
        if (method === 'eth_accounts') {
          // Model a provider re-emitting connect while wagmi is still awaiting
          // onConnect -> getAccounts.
          if (metaMaskProvider.request.mock.calls.length < 5) {
            metaMaskProvider.emit('connect', { chainId: '0x1' });
          }
          return ['0x1234567890123456789012345678901234567890'];
        }
        if (method === 'eth_chainId') {
          return '0x1';
        }
        return null;
      },
    );
    window.ethereum = {
      providers: [metaMaskProvider],
    };

    const connector = getInjectedConnector({
      flag: 'isRabby',
    })({
      rkDetails: {
        id: 'rabby',
        name: 'Rabby Wallet',
        isRainbowKitConnector: true,
      },
    } as any);

    createConfig({
      chains: [mainnet],
      connectors: [connector],
      storage: null,
      transports: {
        [mainnet.id]: http(),
      },
    });

    await flushMicrotasks();
    metaMaskProvider.emit('connect', { chainId: '0x1' });
    await flushMicrotasks();

    // MetaMask events should not trigger Rabby-labeled account lookups.
    expect(
      metaMaskProvider.request.mock.calls.filter(
        ([request]) => request.method === 'eth_accounts',
      ).length,
    ).toBe(0);
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
