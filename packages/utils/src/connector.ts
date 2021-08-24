import { AbstractConnector } from '@web3-react/abstract-connector'
import { Chain, Wallet } from './types'
import { chainNametoID, connectorByWallet } from './convert'

/**
 *
 * @param mod in PascalCase
 * @returns
 */
export const importConnector = async (mod: string): Promise<any> =>
  import(`@web3-react/${mod.toLowerCase()}-connector/dist/${mod.toLowerCase()}-connector.esm.js`).then(
    (x) => x[`${mod}Connector`]
  )

/**
 * Imports and creates a connector with given options
 */
export const createConnector = async ({ name, options, chains }: Wallet & { chains?: Chain[] }) => {
  const connectorName = connectorByWallet(name)

  const Connector = await importConnector(connectorName)
  const instance = new Connector({
    ...options,
    supportedChainIds: chains.map((chain) => (typeof chain === 'string' ? chainNametoID(chain) : chain))
  }) as AbstractConnector

  return { instance, name }
}
