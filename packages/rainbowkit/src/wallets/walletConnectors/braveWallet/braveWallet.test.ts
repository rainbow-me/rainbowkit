import { afterEach, describe, expect, it, vi } from 'vitest';
import { createConfig, createStorage, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const mockIsMobile = vi.hoisted(() => vi.fn());

vi.mock('../../../utils/isMobile', () => ({
  isMobile: mockIsMobile,
}));

import { braveWallet } from './braveWallet';

const address = '0x1234567890123456789012345678901234567890';
const originalEthereum = window.ethereum;

function createMockBraveProvider() {
  return {
    isBraveWallet: true,
    on: vi.fn(),
    removeListener: vi.fn(),
    request: vi.fn(async ({ method }: { method: string }) => {
      if (method === 'eth_requestAccounts') return [address];
      if (method === 'eth_accounts') return [address];
      if (method === 'eth_chainId') return '0x1';
      if (method === 'wallet_requestPermissions') {
        return [{ caveats: [{ value: [address] }] }];
      }
      return null;
    }),
  };
}

function createBraveConnector(wallet = braveWallet(), storage: any = null) {
  const connector = wallet.createConnector({
    rkDetails: {
      id: 'brave',
      isRainbowKitConnector: true,
      name: 'Brave Wallet',
    },
  } as any);

  const config = createConfig({
    chains: [mainnet],
    connectors: [connector],
    storage,
    transports: {
      [mainnet.id]: http(),
    },
  });

  return config.connectors[0]!;
}

describe('braveWallet', () => {
  afterEach(() => {
    mockIsMobile.mockReset();
    window.ethereum = originalEthereum;
  });

  it('uses eth_requestAccounts directly on mobile', async () => {
    mockIsMobile.mockReturnValue(true);
    const provider = createMockBraveProvider();
    window.ethereum = provider as any;

    const connector = createBraveConnector();
    await connector.connect();

    expect(provider.request).toHaveBeenCalledWith({
      method: 'eth_requestAccounts',
    });
    expect(
      provider.request.mock.calls.filter(
        ([request]) => request.method === 'eth_requestAccounts',
      ),
    ).toHaveLength(1);
    expect(provider.request).not.toHaveBeenCalledWith({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    });
  });

  it('keeps shimDisconnect enabled on desktop', async () => {
    mockIsMobile.mockReturnValue(false);
    const provider = createMockBraveProvider();
    window.ethereum = provider as any;

    const connector = createBraveConnector();
    await connector.connect();

    expect(provider.request).toHaveBeenCalledWith({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    });
  });

  it('forwards permission requests unchanged after connecting on mobile', async () => {
    mockIsMobile.mockReturnValue(true);
    const provider = createMockBraveProvider();
    window.ethereum = provider as any;

    const connector = createBraveConnector();
    await connector.connect();

    const permissionRequest = {
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: { required: true } }],
    };
    const connectedProvider = (await connector.getProvider()) as {
      request: (request: typeof permissionRequest) => Promise<unknown>;
    };
    await connectedProvider.request(permissionRequest);

    expect(provider.request).toHaveBeenLastCalledWith(permissionRequest);
  });

  it('preserves the disconnected state on mobile', async () => {
    mockIsMobile.mockReturnValue(true);
    const provider = createMockBraveProvider();
    const values = new Map<string, string>();
    const storage = createStorage({
      storage: {
        getItem: (key) => values.get(key) ?? null,
        removeItem: (key) => {
          values.delete(key);
        },
        setItem: (key, value) => {
          values.set(key, value);
        },
      },
    });
    window.ethereum = provider as any;

    const connector = createBraveConnector(braveWallet(), storage);
    await connector.connect();
    await connector.disconnect();

    expect(values.get('wagmi.brave.disconnected')).toBe('true');
    expect(await connector.isAuthorized()).toBe(false);
  });
});
