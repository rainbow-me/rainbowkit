import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { useWalletModal } from '@rainbow-me/kit-modal'
import { NetworkSelect, Profile, UnsupportedNetwork } from '@rainbow-me/kit-ui'
import { withWeb3React } from '@rainbow-me/kit-utils'
import { useWeb3State } from '@rainbow-me/kit-core'
import React, { useEffect, useState } from 'react'
import { supportedChainIds, wallets } from '../lib/wallets'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')

const Example = () => {
  const [visible, setVisible] = useState(false)
  const {
    state: { disconnect, isConnected, connect, isConnecting },
    Modal,
    address
  } = useWalletModal({
    wallets,
    chains: ['mainnet', 'polygon']
  })

  const { provider, chainId, error } = useWeb3State()

  return (
    <>
      <nav style={{ display: 'flex' }}>
        <Profile modalOptions={{ wallets }} ENSProvider={ENSProvider} />
        <NetworkSelect {...{ provider, chainId }} chains={['ethereum', 'arbitrum', 'polygon', 'optimism']} />
        <UnsupportedNetwork isVisible={visible} chainId={chainId} supportedChainIds={supportedChainIds} />
      </nav>
    </>
  )
}

export default withWeb3React(Example)
