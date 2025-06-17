import { useEffect, useState } from 'react';
import type { Connector } from 'wagmi';
import { useConnectors } from 'wagmi';

export function useWalletConnect() {
  const connectors = useConnectors();
  const walletConnect = connectors.find(
    (c: Connector) => c.id === 'walletConnect',
  );

  const [uri, setUri] = useState<string | undefined>();

  useEffect(() => {
    const connector = walletConnect;
    if (!connector) return;
    let cancelled = false;
    async function setup(active: Connector) {
      try {
        const provider: any = await active.getProvider();
        provider.once('display_uri', (value: string) => {
          if (!cancelled) setUri(value);
        });
      } catch {}
    }
    setup(connector);
    return () => {
      cancelled = true;
    };
  }, [walletConnect]);

  return { uri };
}
