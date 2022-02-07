import { createContext, useContext, useMemo } from 'react';

export interface ChainWithIconUrl {
  id: number;
  iconUrl?: string | null;
}

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
