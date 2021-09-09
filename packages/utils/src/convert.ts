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
  }
}

export const chainNametoID = (name: string) => {
  return chains.find((chain) => chain.aliases.includes(name))?.chainId || 1
}

export const chainIDToToken = (id: number) => {
  return chains.find((chain) => chain.chainId === id)?.nativeCurrency.symbol || 'ETH'
}

export const chainIDToExplorer = (id: number) => {
  return chains.find((chain) => chain.chainId === (!id || id === 0 ? 1 : id)).explorers[0]
}
