import { InjectedConnector } from '@web3-react/injected-connector'
import { useConnector } from '@rainbowkit/core'
import type { SharedConnectorOptions, ConnectorContext } from '@rainbowkit/core'

export type InjectedWalletOptions = ConstructorParameters<typeof InjectedConnector>[0] & SharedConnectorOptions

export const useInjectedConnector = (opts?: InjectedWalletOptions): ConnectorContext => {
  const options = opts || {}
  const { connectOnMount, storageProvider, ...injectedOptions } = options

  const injected = new InjectedConnector(injectedOptions)

  const ctx = useConnector(injected, connectOnMount, storageProvider)

  return ctx
}
