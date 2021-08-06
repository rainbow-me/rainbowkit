import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { useConnector } from './hooks'
import { SharedConnectorOptions } from './types'

export type WalletLinkOptions = ConstructorParameters<typeof WalletLinkConnector>[0] & SharedConnectorOptions

export const useWalletLinkConnector = ({
  connectOnMount,
  storageProvider,
  ...walletLinkOptions
}: WalletLinkOptions) => {
  const injected = new WalletLinkConnector(walletLinkOptions)

  const ctx = useConnector<WalletLinkConnector>(injected, connectOnMount, storageProvider)

  return ctx
}
