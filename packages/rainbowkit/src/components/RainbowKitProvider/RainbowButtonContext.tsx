import React, { ReactNode, createContext, useMemo, useState } from 'react';
import { WalletConnector } from '../../wallets/useWalletConnectors';

interface RainbowButtonContextValue {
  connector: WalletConnector | null;
  setConnector: (wallet: WalletConnector | null) => void;
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
      value={useMemo(
        () => ({
          connector,
          setConnector,
        }),
        [connector],
      )}
    >
      {children}
    </RainbowButtonContext.Provider>
  );
}
