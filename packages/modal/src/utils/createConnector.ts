import { AbstractConnector } from '@web3-react/abstract-connector'
import { Wallet } from '../types'
import { connectorByWallet } from './find'
import { importConnector } from './importConnector'

export const createConnector = async ({ name, options, chains }: Wallet & { chains: number[] }) => {
  const connectorName = connectorByWallet(name)

  const Connector = await importConnector(connectorName)
  const instance = new Connector({ ...options, supportedChainIds: chains }) as AbstractConnector

  return { instance, name }
}
