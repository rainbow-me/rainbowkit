import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { Wallet } from '../../wallets/Wallet';

interface RainbowKitWalletsContextValue {
  wallets: Wallet[];
}

const RainbowKitChainContext = createContext<RainbowKitWalletsContextValue>({
  wallets: [],
});

interface RainbowKitWalletsProviderProps {
  wallets: Wallet[];
  children: ReactNode;
}

export const useRainbowKitWallets = () => {
  return useContext(RainbowKitChainContext).wallets;
};

export const RainbowKitWalletsProvider = ({
  wallets,
  children,
}: RainbowKitWalletsProviderProps) => {
  return (
    <RainbowKitChainContext.Provider
      value={useMemo(() => {
        return { wallets };
      }, [wallets])}
    >
      {children}
    </RainbowKitChainContext.Provider>
  );
};
