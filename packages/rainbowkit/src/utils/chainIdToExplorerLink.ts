import { ChainId, chainInfo } from './chains';

export const chainIdToExplorerLink = (chainId?: ChainId): string | null => {
  return chainId !== undefined && chainInfo[chainId]
    ? `${chainInfo[chainId].explorer.replace(/\/$/, '')}`
    : null;
};
