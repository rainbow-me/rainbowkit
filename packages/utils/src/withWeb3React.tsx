import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider, ExternalProvider } from '@ethersproject/providers'

export type Web3ProviderInit = (provider: Web3Provider) => void

export const setupProvider = (web3ProviderInit?: Web3ProviderInit) => {
  return function getLibrary(provider: ExternalProvider): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    web3ProviderInit?.(library)
    return library
  }
}

export const withWeb3React = (
  Component: React.ComponentType,
  web3ProviderInit?: Web3ProviderInit
): React.ComponentType => {
  const getLibrary = setupProvider(web3ProviderInit)

  const component = () => {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component />
      </Web3ReactProvider>
    )
  }
  component.displayName = Component.displayName || Component.name || 'Web3ReactHOC'

  return component
}
