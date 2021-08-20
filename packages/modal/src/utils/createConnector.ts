import { AbstractConnector } from '@web3-react/abstract-connector'
import { Chain, Wallet } from '../types'
import { importConnector } from './importConnector'

const connectorByWallet = (name: string) => {
  switch (name) {
    case 'metamask':
    case 'trust':
      return 'Injected'
    case 'coinbase':
    case 'walletlink':
      return 'WalletLink'
  }
}

const chainNametoID = (name: string) => {
  switch (name) {
    case 'mainnet':
    case 'ethereum':
      return 1
    case 'matic':
    case 'polygon':
      return 137
    case 'bsc':
    case 'binance':
      return 56
  }
}

export const createConnector = async ({ name, options, chains }: Wallet & { chains?: Chain[] }) => {
  const connectorName = connectorByWallet(name)

  const Connector = await importConnector(connectorName)
  const instance = new Connector({
    ...options,
    supportedChainIds: chains.map((chain) => (typeof chain === 'string' ? chainNametoID(chain) : chain))
  }) as AbstractConnector

  return { instance, name }
}
