import React, { createContext, ReactNode, useState } from 'react';
import { Nullable } from 'vitest';
import { WalletConnector } from '../../wallets/useWalletConnectors';

export const ConnectorContext = createContext([undefined, () => {}]);

interface ConnectorProviderProps {
  children: ReactNode;
}

type ConnectorContextValue = Nullable<WalletConnector> | Nullable<() => void>;

export function ConnectorProvider({ children }: ConnectorProviderProps) {
  const [connector, setConnector] = useState<ConnectorContextValue>();
  return (
    <ConnectorContext.Provider value={[connector, setConnector]}>
      {children}
    </ConnectorContext.Provider>
  );
}
