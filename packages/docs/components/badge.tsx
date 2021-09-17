import React from 'react'
import { EthAddress } from '@rainbowkit/ui'
import { setupProvider } from '@rainbowkit/utils'
import { useENS } from 'use-ens'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { useConnectOnMount } from '@rainbowkit/hooks'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Activate } from './activate'

export const injected = new InjectedConnector({})

const EthAddressPicExample = ({ balance }: { balance?: boolean }) => {
  const { library: provider, activate } = useWeb3React()

  const data = useENS({ provider, domain: 'foda.eth', fetchOptions: { cache: 'force-cache' }, cache: true })

  useConnectOnMount(injected, true)

  return (
    <>
      <Activate />
      <EthAddress balance={balance} address="foda.eth" profileIcon={data?.records?.avatar as string} />
    </>
  )
}

export const EthAddressPic = ({ balance }: { balance?: boolean }) => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <EthAddressPicExample balance={balance} />
  </Web3ReactProvider>
)

const EthAddressBalanceExample = () => {
  const { library: provider, activate, account: address } = useWeb3React()

  useConnectOnMount(injected, true)

  return (
    <>
      <Activate />
      <EthAddress
        balance={true}
        provider={provider}
        address={address || '0x0A9f12d325b905907C43566b4740F2dFE10C3C4B'}
      />
    </>
  )
}

export const EthAddressBalance = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <EthAddressBalanceExample />
  </Web3ReactProvider>
)
