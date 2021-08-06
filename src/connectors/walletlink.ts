import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { useConnector } from './common'

export type WalletLinkOptions = ConstructorParameters<typeof WalletLinkConnector>[0] & {
  connectOnMount?: boolean
}

export const useWalletLinkWallet = ({ connectOnMount, ...walletLinkOptions }: WalletLinkOptions) => {
  const injected = new WalletLinkConnector(walletLinkOptions)

  const ctx = useConnector<WalletLinkConnector>(injected, connectOnMount)

  return ctx
}
