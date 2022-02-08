import type { Wallet } from './WalletsContext';

type WalletName = 'metamask' | 'rainbow' | 'coinbase';

export const wallet: Record<WalletName, Wallet> = {
  coinbase: {
    connectorId: 'walletLink',
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4',
    id: 'coinbase',
    name: 'Coinbase',
  },

  metamask: {
    connectorId: 'injected',
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e',
    id: 'metamask',
    name: 'MetaMask',
  },

  rainbow: {
    connectorId: 'walletConnect',
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
    id: 'rainbow',
    name: 'Rainbow',
  },
};
