import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { NetworkSelect, Profile, UnsupportedNetwork, useWeb3State } from '@rainbow-me/kit-core'
import { UnsupportedChainIdError } from '@web3-react/core'
import { css } from 'linaria'
import React, { useEffect, useState } from 'react'
import { supportedChainIds, wallets } from '../lib/wallets'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')

const Example = () => {
  const { provider, chainId, error } = useWeb3State()
  const [visible, set] = useState(false)

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) set(true)
  }, [error])

  return (
    <>
      <nav
        className={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Profile modalOptions={{ wallets }} ENSProvider={ENSProvider} />
        <NetworkSelect {...{ provider, chainId }} chains={['ethereum', 'arbitrum', 'polygon', 'optimism']} />
        <UnsupportedNetwork isVisible={visible} chainId={chainId} supportedChainIds={supportedChainIds} />
      </nav>
    </>
  )
}

export default Example
