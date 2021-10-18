import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useConnectOnMount } from './useConnectOnMount'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { walletByConnector } from '@rainbow-me/kit-utils'
/**
 * A React hook for using individual connectors from web3-react.
 * @param connector web3-react connector
 * @param connectOnMount enable/disable connecting on mount
 * @param storageProvider browser storage (`localStorage`, `sessionStorage` etc)
 */
export function useConnector<T extends AbstractConnector = AbstractConnector>(
  connector: T,
  connectOnMount = true,
  storageProvider?: Storage
) {
  const [storage, setStorage] = useState<Storage>()

  const {
    library: provider,
    activate,
    active: isConnected,
    deactivate,
    chainId,

    account: address,
    error
  } = useWeb3React<T>()

  useEffect(() => {
    if (connectOnMount) {
      setStorage(storageProvider || localStorage)
    }
  }, [])

  const disconnect = () => {
    if (connectOnMount) storage.removeItem('rk-last-wallet')
    return deactivate()
  }

  useConnectOnMount(connector, connectOnMount, storage)

  const connect = async () => {
    if (connectOnMount) localStorage.setItem('rk-last-wallet', walletByConnector(connector.constructor.name))
    return await activate(connector)
  }

  return { provider, connect, isConnected, disconnect, chainId, connector: connector as T, address, error }
}

export type SharedConnectorOptions = Partial<{
  connectOnMount: boolean
  storageProvider: Storage
}>

export type ConnectorContext = ReturnType<typeof useConnector>
