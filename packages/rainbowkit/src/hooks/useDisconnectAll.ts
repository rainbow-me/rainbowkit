import { useCallback } from 'react';
import type { Config, Connector } from 'wagmi';
import { useConfig, useDisconnect } from 'wagmi';

function removeConnection(config: Config, connector: Connector) {
  config.setState((state) => {
    const connections = new Map(state.connections);
    connections.delete(connector.uid);

    if (connections.size === 0) {
      return {
        ...state,
        connections,
        current: null,
        status: 'disconnected',
      };
    }

    const current =
      state.current && connections.has(state.current)
        ? state.current
        : connections.values().next().value!.connector.uid;

    return {
      ...state,
      connections,
      current,
    };
  });
}

// RainbowKit registers multiple WalletConnect connectors. After refresh,
// reconnect can restore more than one, and wagmi disconnect only clears current.
export function useDisconnectAll() {
  const config = useConfig();
  const { disconnectAsync } = useDisconnect();

  return useCallback(async () => {
    const connections = Array.from(config.state.connections.values());

    // Pending WalletButton / QR connect can set status to connecting before
    // anything lands in connections. Bare disconnect still cancels that.
    if (connections.length === 0) {
      await disconnectAsync();
      return;
    }

    for (const { connector } of connections) {
      try {
        await disconnectAsync({ connector });
      } catch {
        // wagmi only drops the connection after connector.disconnect succeeds.
        removeConnection(config, connector);
      }
    }
  }, [config, disconnectAsync]);
}
