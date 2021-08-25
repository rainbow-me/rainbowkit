import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isAuthorized } from '@rainbowkit/utils'

export const useConnectOnMount = (connector: any, enabled?: boolean, storage?: Storage) => {
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
