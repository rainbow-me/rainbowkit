import React, { type ReactNode, createContext, useMemo, useState } from 'react';
import type { WalletConnector } from '../../wallets/useWalletConnectors';

interface WalletButtonContextValue {
  connector: WalletConnector | null;
  setConnector: (wallet: WalletConnector | null) => void;
}

export const WalletButtonContext = createContext<WalletButtonContextValue>({
  connector: null,
  setConnector: () => {},
});

interface WalletButtonProviderProps {
  children: ReactNode;
}

export function WalletButtonProvider({ children }: WalletButtonProviderProps) {
  const [connector, setConnector] = useState<WalletConnector | null>(null);

  return (
    <WalletButtonContext.Provider
      value={useMemo(
        () => ({
          connector,
          setConnector,
        }),
        [connector],
      )}
    >
      {children}
    </WalletButtonContext.Provider>
  );
}
