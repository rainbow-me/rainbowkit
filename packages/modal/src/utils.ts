import { AbstractConnector } from '@web3-react/abstract-connector'
import { Wallet } from '@rainbow-me/kit-utils'
import { chainNametoID, connectorByWallet } from '@rainbow-me/kit-utils'
import assert from 'assert'

/**
 *
 * @param mod in PascalCase
 * @returns
 */
export const importConnector = async (mod: string): Promise<any> => {
  const x = await import(`@web3-react/${mod.toLowerCase()}-connector/dist/${mod.toLowerCase()}-connector.esm.js`)

  return x[`${mod}Connector`]
}

/**
 * Imports and creates a connector with given options
 */
export const createConnector = async ({
  name,
  options,
  chains,
  connectorName
}: {
  chains?: (string | number)[]
  name: string
  options?: Record<string, unknown>
  connectorName?: string
}) => {
  connectorName = connectorName || connectorByWallet(name)

  assert.notEqual(connectorName, undefined, `Could not find connector for ${name}`)

  const Connector = await importConnector(connectorName)
  const instance = new Connector({
    ...options,
    supportedChainIds: chains?.map((chain) => (typeof chain === 'string' ? chainNametoID(chain) : chain))
  }) as AbstractConnector

  return { instance, name }
}
