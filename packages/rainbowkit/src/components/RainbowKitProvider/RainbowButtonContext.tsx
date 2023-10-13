import React, { ReactNode, createContext, useState } from 'react';
import { WalletConnector } from '../../wallets/useWalletConnectors';

interface RainbowButtonContextValue {
  connector: WalletConnector | null;
  setConnector: (wallet: WalletConnector | null) => void; // Updated type here
}

export const RainbowButtonContext = createContext<RainbowButtonContextValue>({
  connector: null,
  setConnector: () => {},
});

interface RainbowButtonProviderProps {
  children: ReactNode;
}

export function RainbowButtonProvider({
  children,
}: RainbowButtonProviderProps) {
  const [connector, setConnector] = useState<WalletConnector | null>(null);

  return (
    <RainbowButtonContext.Provider
      value={{
        connector,
        setConnector,
      }}
    >
      {children}
    </RainbowButtonContext.Provider>
  );
}
