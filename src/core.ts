import { atom, useAtom } from 'jotai'

import WalletConnectClient from '@walletconnect/client'

export const createClient = async () => {
  return await WalletConnectClient.init({
    relayProvider: 'wss://relay.walletconnect.org',
    metadata: {
      name: 'Example Dapp',
      description: 'Example Dapp',
      url: '#',
      icons: ['https://walletconnect.org/walletconnect-logo.png']
    }
  })
}

const clientAtom = atom(async () => createClient())

export const useClient = () => {
  const [client] = useAtom(clientAtom)

  return client
}
