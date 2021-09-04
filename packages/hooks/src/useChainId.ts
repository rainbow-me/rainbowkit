import { BaseProvider } from '@ethersproject/providers'
import { useState, useEffect } from 'react'

/**
 * Get a provider's current network chain ID
 */
export const useChainId = ({
  provider,
  initialChainId
}: {
  provider: BaseProvider
  initialChainId?: number
}): number => {
  const [chainId, setChainId] = useState(initialChainId)

  const setChain = (x: { chainId: number } | number) => {
    setChainId(typeof x === 'number' ? x : x.chainId)
  }

  useEffect(() => {
    if (provider) {
      provider.getNetwork().then(setChain)
      provider.on('chainChanged', setChain)

      return () => void provider.off('chainChange', setChain)
    } else {
      setChainId(1)
    }
  }, [provider])

  return chainId
}
