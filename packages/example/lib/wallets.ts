import { ChainId, Wallet } from '@rainbow-me/rainbowkit';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

export const COMMON_OPTS = {
  rpc: {
    1: 'https://mainnet.infura.io/v3/0c8c992691dc4bfe97b4365a27fb2ce4',
    137: 'https://polygon-mainnet.infura.io/v3/0c8c992691dc4bfe97b4365a27fb2ce4',
  },
  supportedChainIds: [
    ChainId.MAINNET,
    ChainId.POLYGON,
    ChainId.OPTIMISM,
    ChainId.ARBITRUM,
  ],
};

export const metamask = new InjectedConnector({ ...COMMON_OPTS });

export const walletconnect = new WalletConnectConnector({
  ...COMMON_OPTS,
});

export const walletlink = new WalletLinkConnector({
  ...COMMON_OPTS,
  appName: 'RainbowKit demo',
  url: 'https://rainbowkit-website.vercel.app',
});

export const wallets: Wallet[] = [
  {
    connector: walletconnect,
    name: 'rainbow',
  },
  { connector: metamask, name: 'metamask' },
  { connector: walletlink, name: 'coinbase' },

  { connector: walletconnect, hidden: true, name: 'trust' },
  {
    connector: walletconnect,

    hidden: true,
    name: 'gnosis',
  },
  {
    connector: walletconnect,
    hidden: true,
    name: 'argent',
  },
];
