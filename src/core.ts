import { atom, useAtom } from 'jotai'

import WalletConnectClient, { CLIENT_EVENTS } from '@walletconnect/client'
import type { ClientOptions, PairingTypes, ClientTypes, SessionTypes } from '@walletconnect/types'
import { constructDeeplink, getClientPairings } from './util'
import { useEffect } from 'react'

const defaultOptions: ClientOptions = {
  relayProvider: 'wss://relay.walletconnect.org',
  metadata: {
    name: 'Example Dapp',
    description: 'Example Dapp',
    url: '#',
    icons: ['https://walletconnect.org/walletconnect-logo.png']
  }
}

const createClient = async ({
  options = defaultOptions,
  onURI,
  clientConnectParams = {
    permissions: {
      blockchain: {
        chains: ['eip155:1', 'eip155:10', 'eip155:100', 'eip155:137', 'cosmos:cosmoshub-4']
      },
      jsonrpc: {
        methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData']
      }
    }
  }
}: {
  options?: ClientOptions
  onURI: (uri: string) => void
  clientConnectParams?: ClientTypes.ConnectParams
}) => {
  const client = await WalletConnectClient.init(options)
  let session: SessionTypes.Settled

  client.on(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
    const { uri } = proposal.signal.params

    const deeplink = constructDeeplink(uri)
    onURI(deeplink)
  })

  if (!getClientPairings(client).length) {
    session = await client.connect(clientConnectParams)
  }

  return { client, session }
}

const clientAtom = atom<{ client: WalletConnectClient; session: SessionTypes.Settled }>({ client: null, session: null })

export const useClient = ({ onURI }: { onURI: (uri: string) => void }) => {
  const [{ client, session }, set] = useAtom(clientAtom)

  useEffect(() => {
    createClient({ onURI }).then(set)
  }, [])

  return { client, session }
}
