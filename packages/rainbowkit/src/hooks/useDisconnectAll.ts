import { useCallback } from 'react';
import { useConfig, useDisconnect } from 'wagmi';

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
        // One stale provider teardown must not block clearing the rest.
      }
    }
  }, [config, disconnectAsync]);
}
