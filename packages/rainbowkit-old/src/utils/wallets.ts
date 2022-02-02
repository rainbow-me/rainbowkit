import type { AbstractConnector } from '@web3-react/abstract-connector';

export type Wallet = {
  name: string;
  hidden?: boolean;
  connector: AbstractConnector;
};

/**
 * Get wallet name and icon
 * @param name wallet name (saved as `rk-last-wallet` in storage)
 * @returns wallet name and logo
 */
export const getWalletInfo = (
  name: string
): { name: string; logoURI: string } => {
  switch (name) {
    case 'metamask':
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e',
        name: 'MetaMask',
      };
    case 'coinbase':
    case 'walletlink':
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4',
        name: 'Coinbase',
      };
    case 'frame':
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreihgrm4ebmo7ybe6vzzhwgdpiv6t4jrljl5t7y7n3keyq6n6susvra',
        name: 'Frame',
      };
    case 'torus':
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreiao4cnnidbqblkmd2xfb2akutm2bjdr5r4xnbuwumzhda3ikxyb7a',
        name: 'Torus',
      };
    case 'rainbow':
    default:
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
        name: 'Rainbow',
      };
    case 'trust':
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreiaa457sqcvunki6x7uydyjmniox22vclagwqda5qbskwd27to32aq',
        name: 'Trust',
      };
    case 'gnosis':
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreifsbu7uy4m25t5hty27x7nfrz3ot3wcvlnqwfujom7ax6qmixgciu',
        name: 'Gnosis',
      };
    case 'argent':
      return {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreic5w3umuv7hz7drgyp6ymmpiqre4cnd36ftsutrrazgrecpvo5rgq',
        name: 'Argent',
      };
  }
};
