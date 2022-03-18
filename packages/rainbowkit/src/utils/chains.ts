export type Chain = {
  name: string;
  chainId: number;
  explorer: string;
};

export enum ChainId {
  MAINNET = 1,
  OPTIMISM = 10,
  ARBITRUM = 42161,
  POLYGON = 137,
}

export const chainInfo: Record<ChainId, Chain> = {
  [ChainId.MAINNET]: {
    chainId: ChainId.MAINNET,
    explorer: 'https://etherscan.io',
    name: 'Ethereum',
  },
  [ChainId.OPTIMISM]: {
    chainId: ChainId.OPTIMISM,
    explorer: 'https://optimistic.etherscan.io',
    name: 'Optimism',
  },
  [ChainId.ARBITRUM]: {
    chainId: ChainId.ARBITRUM,
    explorer: 'https://explorer.arbitrum.io',
    name: 'Arbitrum',
  },
  [ChainId.POLYGON]: {
    chainId: ChainId.POLYGON,
    explorer: 'https://polygonscan.com',
    name: 'Polygon',
  },
};
