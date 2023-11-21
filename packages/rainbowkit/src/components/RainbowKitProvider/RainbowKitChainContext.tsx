import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { Chain } from 'viem';
import { mainnet } from 'viem/chains';
import { provideRainbowKitChains } from './provideRainbowKitChains';

export interface RainbowKitChain extends Chain {
  id: number;
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

interface RainbowKitChainContextValue {
  chains: readonly [RainbowKitChain, ...RainbowKitChain[]];
  initialChainId?: number;
}

const RainbowKitChainContext = createContext<RainbowKitChainContextValue>({
  // We use 'mainnet' as the default because wagmi defines
  // 'chains' as a tuple type with at least one chain
  chains: [mainnet],
});

interface RainbowKitChainProviderProps {
  chains: readonly [RainbowKitChain, ...RainbowKitChain[]];
  initialChain?: RainbowKitChain | number;
  children: ReactNode;
}

export function RainbowKitChainProvider({
  chains,
  children,
  initialChain,
}: RainbowKitChainProviderProps) {
  return (
    <RainbowKitChainContext.Provider
      value={useMemo(
        () => ({
          chains: provideRainbowKitChains(chains),
          initialChainId:
            typeof initialChain === 'number' ? initialChain : initialChain?.id,
        }),
        [chains, initialChain],
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

export const useRainbowKitChainsById = () => {
  const rainbowkitChains = useRainbowKitChains();

  return useMemo(() => {
    const rainbowkitChainsById: Record<number, RainbowKitChain> = {};

    rainbowkitChains.forEach((rkChain) => {
      rainbowkitChainsById[rkChain.id] = rkChain;
    });

    return rainbowkitChainsById;
  }, [rainbowkitChains]);
};
