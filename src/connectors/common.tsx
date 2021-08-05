import React, { useEffect, useState } from 'react'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider, ExternalProvider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'

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
export function useEagerConnect(injected: InjectedConnector) {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}
