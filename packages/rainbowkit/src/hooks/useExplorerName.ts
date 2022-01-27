import { useMemo } from 'react';
import { ChainId } from '../utils/chains';
import { chainIDToExplorer } from '../utils/convert';

export const useExplorer = (chainId: ChainId = 1) => {
  const data = useMemo(() => {
    const data = chainIDToExplorer(chainId);
    return {
      ...data,
      name: `${data.name[0].toUpperCase()}${data.name.slice(1)}`,
    };
  }, [chainId]);
  return data;
};
