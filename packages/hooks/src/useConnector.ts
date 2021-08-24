import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useConnectOnMount } from './useConnectOnMount'

export function useConnector<T extends AbstractConnector = any>(
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

  useConnectOnMount<T>(abstractConnector, connectOnMount, storage)

  const connect = async () => {
    if (connectOnMount) storage.setItem('rk-connect-on-mount', 'true')
    return await activate(abstractConnector)
  }

  return { provider, connect, isConnected, disconnect, chainId, connector: connector as T, address, error }
}
