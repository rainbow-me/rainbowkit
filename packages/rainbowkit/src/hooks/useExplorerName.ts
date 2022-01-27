import { useMemo } from 'react';
import { ChainId } from '../utils/chains';
import { chainIDToExplorer } from '../utils/convert';

export const useExplorerName = (chainId: ChainId = 1) => {
  const explorerName = useMemo(() => {
    if (chainId) {
      const name = chainIDToExplorer(chainId).name;
      return `${name[0].toUpperCase()}${name.slice(1)}`;
    }
    return 'Etherscan';
  }, [chainId]);
  return explorerName;
};
