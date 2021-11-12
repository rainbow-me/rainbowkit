import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { useWalletModal } from '@rainbow-me/kit-modal'
import { withWeb3React } from '@rainbow-me/kit-utils'
import React, { useEffect, useState } from 'react'
import { supportedChainIds, wallets } from '../lib/wallets'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')

const Example = () => {
  const {
    state: { disconnect, isConnected, connect, isConnecting },
    Modal,
    address
  } = useWalletModal({
    wallets,
    chains: ['mainnet', 'polygon']
  })

  return (
    <>
      <button onClick={() => (isConnected ? disconnect() : connect())}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </button>
      {isConnecting && <Modal />}
    </>
  )
}

export default withWeb3React(Example)
