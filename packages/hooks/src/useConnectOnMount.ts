import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isAuthorized } from '@rainbowkit/utils'

/**
 * A React hook that attempts to connect to a provider if it was initialized before.
 * @param connector web3-react connector
 * @param enabled enable/disable the hook
 * @param storage browser storage to use. default is `localStorage`
 */
export const useConnectOnMount = (connector: any, enabled?: boolean, storage: Storage = localStorage) => {
  const { active, activate } = useWeb3React()

  useEffect(() => {
    let cachedState = true
    if (storage) cachedState = storage.getItem('rk-connect-on-mount') === 'true'

    isAuthorized().then((yes) => {
      if (cachedState && enabled && !active && window.ethereum && yes) {
        activate(connector)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage]) // Only trigger on mount
}
