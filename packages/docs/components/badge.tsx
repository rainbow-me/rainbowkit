import React from 'react'
import { EthAddress } from '@rainbowkit/badge'
import { withWeb3React } from '@rainbowkit/util'
import { useENS } from 'use-ens'
import { useWeb3React } from '@web3-react/core'
import { useConnectOnMount } from '@rainbowkit/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const injected = new InjectedConnector({})

const EthAddressPicExample = () => {
  const { library: provider, activate } = useWeb3React()

  const data = useENS(provider, 'foda.eth', { cache: 'force-cache' })

  useConnectOnMount(injected, true)

  return (
    <>
      <button
        style={{ border: '3px solid black', padding: '0.4rem', margin: '20px 0', fontWeight: 'bold' }}
        onClick={() => activate(injected)}
      >
        Activate connector
      </button>
      <EthAddress addr="foda.eth" profileIcon={data.records?.avatar as string} />
    </>
  )
}

export const EthAddressPic = withWeb3React(EthAddressPicExample)
