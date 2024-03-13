import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { useConfig } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { provideRainbowKitChains } from './provideRainbowKitChains';

export interface RainbowKitChain extends Chain {
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

interface RainbowKitChainContextValue {
  chains: RainbowKitChain[];
  initialChainId?: number;
  chainModalOnConnect: boolean;
}

const RainbowKitChainContext = createContext<RainbowKitChainContextValue>({
  chains: [],
  chainModalOnConnect: false,
});

interface RainbowKitChainProviderProps {
  initialChain?: Chain | number;
  chainModalOnConnect: boolean;
  children: ReactNode;
}

export function RainbowKitChainProvider({
  children,
  initialChain,
  chainModalOnConnect,
}: RainbowKitChainProviderProps) {
  const { chains } = useConfig();

  return (
    <RainbowKitChainContext.Provider
      value={useMemo(
        () => ({
          chains: provideRainbowKitChains(chains),
          initialChainId:
            typeof initialChain === 'number' ? initialChain : initialChain?.id,
          chainModalOnConnect,
        }),
        [chains, initialChain, chainModalOnConnect],
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

export const useChainModalOnConnect = () =>
  useContext(RainbowKitChainContext).chainModalOnConnect;

export const useRainbowKitChainsById = () => {
  const rainbowkitChains = useRainbowKitChains();

  return useMemo(() => {
    const rainbowkitChainsById: Record<number, RainbowKitChain> = {};

    for (const rkChain of rainbowkitChains) {
      rainbowkitChainsById[rkChain.id] = rkChain;
    }

    return rainbowkitChainsById;
  }, [rainbowkitChains]);
};
