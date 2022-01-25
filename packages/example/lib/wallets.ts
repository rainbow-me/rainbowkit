import { ChainId, Wallet } from '@rainbow-me/rainbowkit';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const INFURA_ID = '0c8c992691dc4bfe97b4365a27fb2ce4';

const SUPPORTED_CHAIN_IDS = [
  ChainId.MAINNET,
  ChainId.POLYGON,
  ChainId.OPTIMISM,
  ChainId.ARBITRUM,
];

const INFURA_NETWORK_URLS = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  [ChainId.POLYGON]: `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`,
  [ChainId.ARBITRUM]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_ID}`,
  [ChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_ID}`,
};

export const metamask = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export const walletconnect = new WalletConnectConnector({
  rpc: INFURA_NETWORK_URLS,
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export const walletlink = new WalletLinkConnector({
  appName: 'RainbowKit demo',
  supportedChainIds: SUPPORTED_CHAIN_IDS,
  url: INFURA_NETWORK_URLS[ChainId.MAINNET],
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
