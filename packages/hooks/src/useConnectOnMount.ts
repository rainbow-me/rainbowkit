import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'

declare global {
  interface Window {
    ethereum: Web3Provider
  }
}

export const useConnectOnMount = <T extends AbstractConnector = any>(
  connector: T,
  enabled?: boolean,
  storage?: Storage
) => {
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
