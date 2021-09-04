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

  useEffect(() => {
    if (provider) {
      provider.getNetwork().then(({ chainId }) => setChainId(chainId))
    } else {
      setChainId(1)
    }
  }, [provider])

  return chainId
}
