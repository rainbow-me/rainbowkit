import React from 'react'
import { EthAddress } from '@rainbowkit/badge'
import { setupProvider } from '@rainbowkit/utils'
import { useENS } from 'use-ens'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { useConnectOnMount } from '@rainbowkit/hooks'
import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({ supportedChainIds: [1, 137, 56, 250] })

const EthAddressPicExample = () => {
  const { library: provider, activate } = useWeb3React()

  const data = useENS({ provider, domain: 'foda.eth', fetchOptions: { cache: 'force-cache' }, cache: true })

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

export const EthAddressPic = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <EthAddressPicExample />
  </Web3ReactProvider>
)

const EthAddressBalanceExample = () => {
  const { library: provider, activate, account: address } = useWeb3React()

  useConnectOnMount(injected, true)

  return (
    <>
      <button
        style={{ border: '3px solid black', padding: '0.4rem', margin: '20px 0', fontWeight: 'bold' }}
        onClick={() => activate(injected)}
      >
        Activate connector
      </button>
      <EthAddress balance={true} provider={provider} addr={address} />
    </>
  )
}

export const EthAddressBalance = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <EthAddressBalanceExample />
  </Web3ReactProvider>
)
