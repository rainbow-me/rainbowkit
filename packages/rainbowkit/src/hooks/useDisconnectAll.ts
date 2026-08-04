import { useCallback } from 'react';
import { useConfig, useDisconnect } from 'wagmi';

// RainbowKit registers multiple WalletConnect connectors. After refresh,
// reconnect can restore more than one, and wagmi disconnect only clears current.
export function useDisconnectAll() {
  const config = useConfig();
  const { disconnectAsync } = useDisconnect();

  return useCallback(async () => {
    const connections = Array.from(config.state.connections.values());

    for (const { connector } of connections) {
      await disconnectAsync({ connector });
    }
  }, [config, disconnectAsync]);
}
