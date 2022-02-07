import type { ConnectorClass, Wallet } from './WalletsContext';

export const wallet = {
  coinbase: (options: { WalletLinkConnector: ConnectorClass }): Wallet => {
    const { WalletLinkConnector } = options ?? {};

    if (!WalletLinkConnector) {
      throw new Error(
        'The "wallet.coinbase" function requires a reference to the "WalletLinkConnector" constructor, e.g. wallet.coinbase({ WalletLinkConnector })'
      );
    }

    return {
      connectorClass: WalletLinkConnector,
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4',
      name: 'Coinbase',
    };
  },

  metamask: (options: { InjectedConnector: ConnectorClass }): Wallet => {
    const { InjectedConnector } = options ?? {};

    if (!InjectedConnector) {
      throw new Error(
        'The "wallet.metamask" function requires a reference to the "InjectedConnector" constructor, e.g. wallet.metamask({ InjectedConnector })'
      );
    }

    return {
      connectorClass: InjectedConnector,
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e',
      name: 'MetaMask',
    };
  },

  rainbow: (options: { WalletConnectConnector: ConnectorClass }): Wallet => {
    const { WalletConnectConnector } = options ?? {};

    if (!WalletConnectConnector) {
      throw new Error(
        'The "wallet.rainbow" function requires a reference to the "WalletConnectConnector" constructor, e.g. wallet.rainbow({ WalletConnectConnector })'
      );
    }

    return {
      connectorClass: WalletConnectConnector,
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
      name: 'Rainbow',
    };
  },
} as const;
