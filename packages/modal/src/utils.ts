import { AbstractConnector } from '@web3-react/abstract-connector'
import { Wallet } from '@rainbowkit/utils'
import { chainNametoID, connectorByWallet } from '@rainbowkit/utils'
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
export const createConnector = async ({ name, options, chains }: Wallet & { chains?: (string | number)[] }) => {
  const connectorName = connectorByWallet(name)

  assert.notEqual(connectorName, undefined, `Could not find connector for ${name}`)

  const Connector = await importConnector(connectorName)
  const instance = new Connector({
    ...options,
    supportedChainIds: chains.map((chain) => (typeof chain === 'string' ? chainNametoID(chain) : chain))
  }) as AbstractConnector

  return { instance, name }
}

export const getIcon = (name: string) => {
  switch (name) {
    case 'metamask':
      return 'https://bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e.ipfs.dweb.link'
    case 'coinbase':
    case 'walletlink':
      return 'https://bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4.ipfs.dweb.link'
    case 'frame':
      return 'https://bafkreihgrm4ebmo7ybe6vzzhwgdpiv6t4jrljl5t7y7n3keyq6n6susvra.ipfs.dweb.link'
    case 'torus':
      return 'https://bafkreiao4cnnidbqblkmd2xfb2akutm2bjdr5r4xnbuwumzhda3ikxyb7a.ipfs.dweb.link'
    case 'rainbow':
      return 'https://bafkreiext3sw6h2iwayx24xe6fnvnhm5ueewdiq3eyiambugpgspiigtvi.ipfs.dweb.link'
  }
}
