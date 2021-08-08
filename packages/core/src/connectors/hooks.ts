import React, { useEffect, useState } from 'react'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider, ExternalProvider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'

declare global {
  interface Window {
    ethereum: Web3Provider
  }
}

export const useConnectOnMount = (connector: AbstractConnector, enabled?: boolean, storage?: Storage) => {
  const { active, activate } = useWeb3React()

  useEffect(() => {
    let cachedState = true
    if (storage) cachedState = storage.getItem('rk-connect-on-mount') === 'true'

    if (cachedState && enabled && !active && window.ethereum) {
      activate(connector)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage]) // Only trigger on mount
}

export function useConnector<T extends AbstractConnector = AbstractConnector>(
  abstractConnector: T,
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
    connector,
    account: address,
    error
  } = useWeb3React<Web3Provider>()

  useEffect(() => {
    if (connectOnMount) {
      setStorage(storageProvider || localStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disconnect = () => {
    if (connectOnMount) storage.removeItem('rk-connect-on-mount')
    return deactivate()
  }

  useConnectOnMount(abstractConnector, connectOnMount, storage)

  const connect = async () => {
    if (connectOnMount) storage.setItem('rk-connect-on-mount', 'true')
    return await activate(abstractConnector)
  }

  return { provider, connect, isConnected, disconnect, chainId, connector: connector as T, address, error }
}
