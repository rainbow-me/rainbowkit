import { createContext, useContext, useMemo } from 'react';
import { Chain as WagmiChain } from 'wagmi';

export interface ChainWithIconUrl {
  id: number;
  iconUrl?: string | null;
}

// This type is a combination of wagmi and RainbowKit chain types to make
// it easier for consumers to define their chain config in a single place.
export type Chain = WagmiChain & ChainWithIconUrl;

export const ChainIconsContext = createContext<ChainWithIconUrl[]>([]);

export const useChainIconUrlsById = () => {
  const chainIcons = useContext(ChainIconsContext);

  return useMemo(() => {
    const chainIconUrlsById: Record<number, string> = {};

    chainIcons.forEach(({ iconUrl, id }) => {
      if (iconUrl) {
        chainIconUrlsById[id] = iconUrl;
      }
    });

    return chainIconUrlsById;
  }, [chainIcons]);
};
