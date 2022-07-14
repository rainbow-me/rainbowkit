import { createContext, useContext, useMemo } from 'react';
import { Chain as WagmiChain } from 'wagmi';

export interface RainbowKitChain {
  id: number;
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

interface RainbowKitChainContextValue {
  chains: RainbowKitChain[];
  initialChainId?: number;
}

// This type is a combination of wagmi and RainbowKit chain types to make
// it easier for consumers to define their chain config in a single place.
export type Chain = WagmiChain & RainbowKitChain;

export const RainbowKitChainContext =
  createContext<RainbowKitChainContextValue>({ chains: [] });

export const useRainbowKitChains = () =>
  useContext(RainbowKitChainContext).chains;

export const useInitialChainId = () =>
  useContext(RainbowKitChainContext).initialChainId;

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
