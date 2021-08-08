import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { useConnector } from '@rainbowkit/core'
import type { SharedConnectorOptions, ConnectorContext } from '@rainbowkit/core'
export type WalletLinkOptions = ConstructorParameters<typeof WalletLinkConnector>[0] & SharedConnectorOptions

export const useWalletLinkConnector = ({
  connectOnMount,
  storageProvider,
  ...walletLinkOptions
}: WalletLinkOptions): ConnectorContext => {
  const injected = new WalletLinkConnector(walletLinkOptions)

  const ctx = useConnector<WalletLinkConnector>(injected, connectOnMount, storageProvider)

  return ctx
}
