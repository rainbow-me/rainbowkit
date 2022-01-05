import { Wallet, walletConnectRPCs, ChainId } from '@rainbow-me/kit-utils'
import { WalletConnectConnectorArguments } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const wcOptions = { options: { rpc: walletConnectRPCs } as WalletConnectConnectorArguments }

export const COMMON_OPTS = { supportedChainIds: [ChainId.MAINNET, ChainId.POLYGON, ChainId.OPTIMISM, ChainId.ARBITRUM] }

export const metamask = new InjectedConnector({ ...COMMON_OPTS })

export const walletconnect = new WalletConnectConnector({
  ...COMMON_OPTS,
  rpc: {
    1: 'https://mainnet.infura.io/v3/0c8c992691dc4bfe97b4365a27fb2ce4',
    137: 'https://polygon-mainnet.infura.io/v3/0c8c992691dc4bfe97b4365a27fb2ce4'
  }
})

export const walletlink = new WalletLinkConnector({
  ...COMMON_OPTS,
  appName: 'RainbowKit demo',
  url: 'https://rainbowkit-website.vercel.app'
})

export const wallets: Wallet[] = [
  {
    name: 'rainbow',
    connector: walletconnect,
    ...wcOptions
  },
  { name: 'metamask', connector: metamask },
  { name: 'coinbase', connector: walletlink },

  {
    name: 'trust',
    hidden: true,
    connector: walletconnect,
    ...wcOptions
  },
  {
    name: 'gnosis',
    hidden: true,
    connector: walletconnect,
    ...wcOptions
  },
  {
    name: 'argent',
    hidden: true,
    connector: walletconnect,
    ...wcOptions
  }
]
