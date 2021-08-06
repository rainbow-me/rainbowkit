import { InjectedConnector } from '@web3-react/injected-connector'
import { useConnector } from './common'

export type InjectedWalletOptions = ConstructorParameters<typeof InjectedConnector>[0] & { connectOnMount?: boolean }

export const useInjectedWallet = (opts?: InjectedWalletOptions) => {
  const options = opts || {}
  const { connectOnMount, ...injectedOptions } = options

  const injected = new InjectedConnector(injectedOptions)

  const ctx = useConnector(injected, connectOnMount)

  return ctx
}
