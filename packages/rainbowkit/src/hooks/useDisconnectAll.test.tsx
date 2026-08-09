import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import type { Address } from 'viem';
import { http } from 'viem';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createConfig,
  useAccount,
  useConnections,
  useDisconnect,
  WagmiProvider,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { connectorsForWallets } from '../wallets/connectorsForWallets';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '../wallets/walletConnectors';
import { useDisconnectAll } from './useDisconnectAll';

const exampleProjectId = '21fef48091f12692cad574a6f7753643';
const account = '0x1111111111111111111111111111111111111111' as Address;

function createWalletConnectConfig() {
  return createConfig({
    chains: [mainnet],
    connectors: connectorsForWallets(
      [
        {
          groupName: 'Popular',
          wallets: [rainbowWallet, metaMaskWallet, walletConnectWallet],
        },
      ],
      {
        projectId: exampleProjectId,
        appName: 'rainbowkit.com',
        appUrl: 'https://rainbowkit.com',
      },
    ),
    transports: {
      [mainnet.id]: http(),
    },
    ssr: true,
  });
}

function seedRestoredWalletConnectConnections(
  config: ReturnType<typeof createWalletConnectConfig>,
) {
  const walletConnectConnectors = config.connectors.filter(
    (connector) => connector.id === 'walletConnect',
  );

  expect(walletConnectConnectors.length).toBeGreaterThan(1);

  const [currentConnector] = walletConnectConnectors;
  if (!currentConnector) {
    throw new Error('Expected at least one WalletConnect connector');
  }

  for (const connector of walletConnectConnectors) {
    connector.disconnect = vi.fn().mockResolvedValue(undefined);
  }

  const connections = new Map(
    walletConnectConnectors.map((connector) => [
      connector.uid,
      {
        accounts: [account] as const,
        chainId: mainnet.id,
        connector,
      },
    ]),
  );

  config.setState({
    chainId: mainnet.id,
    connections,
    current: currentConnector.uid,
    status: 'connected',
  });

  return walletConnectConnectors.length;
}

function DisconnectHarness({ mode }: { mode: 'current' | 'all' }) {
  const { status, isConnected } = useAccount();
  const connections = useConnections();
  const { disconnect } = useDisconnect();
  const disconnectAll = useDisconnectAll();

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="connected">{String(isConnected)}</div>
      <div data-testid="connection-count">{connections.length}</div>
      <button
        data-testid="disconnect"
        onClick={() => {
          if (mode === 'current') {
            disconnect();
            return;
          }

          void disconnectAll();
        }}
        type="button"
      >
        Disconnect
      </button>
    </div>
  );
}

describe('useDisconnectAll', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('shows why a single wagmi disconnect leaves restored walletconnect sessions connected', async () => {
    const config = createWalletConnectConfig();
    const restoredCount = seedRestoredWalletConnectConnections(config);

    render(
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          <DisconnectHarness mode="current" />
        </QueryClientProvider>
      </WagmiProvider>,
    );

    expect(screen.getByTestId('connection-count').textContent).toBe(
      String(restoredCount),
    );
    expect(screen.getByTestId('connected').textContent).toBe('true');

    fireEvent.click(screen.getByTestId('disconnect'));

    await waitFor(() => {
      expect(screen.getByTestId('connection-count').textContent).toBe(
        String(restoredCount - 1),
      );
    });

    // This is the #2401 failure mode: one Disconnect click is not enough.
    expect(screen.getByTestId('connected').textContent).toBe('true');
    expect(screen.getByTestId('status').textContent).toBe('connected');
  });

  it('clears every restored walletconnect connection in one click', async () => {
    const config = createWalletConnectConfig();
    const restoredCount = seedRestoredWalletConnectConnections(config);

    render(
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          <DisconnectHarness mode="all" />
        </QueryClientProvider>
      </WagmiProvider>,
    );

    expect(screen.getByTestId('connection-count').textContent).toBe(
      String(restoredCount),
    );

    fireEvent.click(screen.getByTestId('disconnect'));

    await waitFor(() => {
      expect(screen.getByTestId('connection-count').textContent).toBe('0');
      expect(screen.getByTestId('connected').textContent).toBe('false');
      expect(screen.getByTestId('status').textContent).toBe('disconnected');
    });
  });

  it('keeps clearing remaining connections if one disconnect fails', async () => {
    const config = createWalletConnectConfig();
    seedRestoredWalletConnectConnections(config);

    const walletConnectConnectors = config.connectors.filter(
      (connector) => connector.id === 'walletConnect',
    );
    const [failingConnector, ...remainingConnectors] = walletConnectConnectors;
    if (!failingConnector || remainingConnectors.length === 0) {
      throw new Error('Expected multiple WalletConnect connectors');
    }

    failingConnector.disconnect = vi
      .fn()
      .mockRejectedValue(new Error('teardown failed'));

    render(
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          <DisconnectHarness mode="all" />
        </QueryClientProvider>
      </WagmiProvider>,
    );

    fireEvent.click(screen.getByTestId('disconnect'));

    await waitFor(() => {
      expect(failingConnector.disconnect).toHaveBeenCalled();
      for (const connector of remainingConnectors) {
        expect(connector.disconnect).toHaveBeenCalled();
      }
    });
  });

  it('cancels a pending connect when there are no connections yet', async () => {
    const config = createWalletConnectConfig();

    config.setState({
      chainId: mainnet.id,
      connections: new Map(),
      current: null,
      status: 'connecting',
    });

    render(
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          <DisconnectHarness mode="all" />
        </QueryClientProvider>
      </WagmiProvider>,
    );

    expect(screen.getByTestId('connection-count').textContent).toBe('0');
    expect(screen.getByTestId('status').textContent).toBe('connecting');

    fireEvent.click(screen.getByTestId('disconnect'));

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('disconnected');
      expect(screen.getByTestId('connected').textContent).toBe('false');
    });
  });
});
