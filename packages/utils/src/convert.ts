import { chains } from './chains'

export const connectorByWallet = (name: string) => {
  switch (name) {
    case 'metamask':
      return 'Injected'
    case 'coinbase':
    case 'walletlink':
      return 'WalletLink'
    case 'frame':
      return 'Frame'
    case 'torus':
      return 'Torus'
    case 'walletconnect':
    case 'rainbow':
      return 'WalletConnect'
  }
}

export const walletByConnector = (connector: string) => {
  switch (connector) {
    case 'InjectedConnector':
      return 'metamask'
    case 'WalletLinkConnector':
      return 'coinbase'
    case 'TorusConnector':
      return 'torus'
    case 'WalletConnectConnector':
      return 'walletconnect'
  }
}

export const chainNametoID = (name: string) => chains.find((chain) => chain.aliases.includes(name))?.chainId || 1

export const chainIdToName = (id: number) => chains.find((chain) => chain.chainId === id)?.name || 'Ethereum'

export const chainIdToAlias = (id: number) => chains.find((chain) => chain.chainId === id)?.aliases[0] || 'ethereum'

export const chainIDToToken = (id: number) =>
  chains.find((chain) => chain.chainId === id)?.nativeCurrency.symbol || 'ETH'

export const chainIDToExplorer = (id: number) =>
  chains.find((chain) => chain.chainId === (!id || id === 0 ? 1 : id))?.explorers?.[0] || {
    name: 'etherscan',
    url: 'https://etherscan.io'
  }
