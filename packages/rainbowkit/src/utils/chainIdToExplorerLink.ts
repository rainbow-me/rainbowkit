import { ChainId, chainInfo } from './chains';

export const chainIdToExplorerLink = (chainId?: ChainId): string => {
  if (!chainId) {
    return `${chainInfo[ChainId.MAINNET].explorer}/address/`;
  }
  return `${chainInfo[chainId].explorer}/address/`;
};
