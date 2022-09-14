import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { Chain as WagmiChain } from 'wagmi';
import { provideRainbowKitChains } from './provideRainbowKitChains';

export interface RainbowKitChain {
  id: number;
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

// This type is a combination of wagmi and RainbowKit chain types to make
// it easier for consumers to define their chain config in a single place.
export type Chain = WagmiChain & RainbowKitChain;

interface RainbowKitChainContextValue {
  chains: RainbowKitChain[];
  initialChainId?: number;
  ensChainId?: number;
}

const RainbowKitChainContext = createContext<RainbowKitChainContextValue>({
  chains: [],
});

interface RainbowKitChainProviderProps {
  chains: RainbowKitChain[];
  initialChain?: RainbowKitChain | number;
  ensChain?: RainbowKitChain | number;
  children: ReactNode;
}

export function RainbowKitChainProvider({
  chains,
  children,
  ensChain,
  initialChain,
}: RainbowKitChainProviderProps) {
  return (
    <RainbowKitChainContext.Provider
      value={useMemo(
        () => ({
          chains: provideRainbowKitChains(chains),
          ensChainId: typeof ensChain === 'number' ? ensChain : ensChain?.id,
          initialChainId:
            typeof initialChain === 'number' ? initialChain : initialChain?.id,
        }),
        [chains, initialChain, ensChain]
      )}
    >
      {children}
    </RainbowKitChainContext.Provider>
  );
}

export const useRainbowKitChains = () =>
  useContext(RainbowKitChainContext).chains;

export const useInitialChainId = () =>
  useContext(RainbowKitChainContext).initialChainId;

export const useEnsChainId = () =>
  useContext(RainbowKitChainContext).ensChainId;

export const useRainbowKitChainsById = () => {
  const rainbowkitChains = useRainbowKitChains();

  return useMemo(() => {
    const rainbowkitChainsById: Record<number, RainbowKitChain> = {};

    rainbowkitChains.forEach(rkChain => {
      rainbowkitChainsById[rkChain.id] = rkChain;
    });

    return rainbowkitChainsById;
  }, [rainbowkitChains]);
};
