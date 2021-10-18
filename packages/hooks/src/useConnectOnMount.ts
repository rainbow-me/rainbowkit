import { useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isAuthorized } from '@rainbow-me/kit-utils'

/**
 * A React hook that attempts to connect to a provider if it was initialized before.
 * @param connector web3-react connector
 * @param enabled enable/disable the hook
 * @param storage browser storage to use.
 */
export const useConnectOnMount = (connector: any, enabled: boolean, storageProvider?: Storage | false) => {
  const { active, activate } = useWeb3React()

  useEffect(() => {
    const storage = storageProvider === undefined ? localStorage : storageProvider
    let cachedState = true
    if (storage) cachedState = storage.getItem('rk-last-wallet') !== undefined

    isAuthorized().then((yes) => {
      if (cachedState && enabled && !active && window.ethereum && yes) {
        activate(connector)
      }
    })
  }, [storageProvider]) // Only trigger on mount

  return active
}
