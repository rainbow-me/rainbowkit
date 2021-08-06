import React, { useEffect, useState } from 'react'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider, ExternalProvider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { Send, SendReturnResult, SendReturn } from '@web3-react/injected-connector/dist/types'

declare global {
  interface Window {
    ethereum: Web3Provider
  }
}

export type Web3ProviderInit = (provider: Web3Provider) => void

export const setupProvider = (web3ProviderInit: Web3ProviderInit) => {
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

const useConnectOnMount = (connector: AbstractConnector, enabled: boolean) => {
  const { active, activate } = useWeb3React()

  useEffect(() => {
    const cachedState = localStorage.getItem('rk-connect-on-mount')
    if (cachedState && enabled && !active && window.ethereum) {
      activate(connector)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only trigger on mount
}

export function useConnector<T extends AbstractConnector = AbstractConnector>(
  abstractConnector: T,
  connectOnMount = true
) {
  const {
    library: provider,
    activate,
    active: isConnected,
    deactivate,
    chainId,
    connector,
    account: address,
    error
  } = useWeb3React<Web3Provider>()

  const disconnect = () => {
    localStorage.removeItem('rk-connect-on-mount')
    return deactivate()
  }

  useConnectOnMount(abstractConnector, connectOnMount)

  const connect = async () => {
    localStorage.setItem('rk-connect-on-mount', 'true')
    return await activate(abstractConnector)
  }

  return { provider, connect, isConnected, disconnect, chainId, connector: connector as T, address, error }
}
