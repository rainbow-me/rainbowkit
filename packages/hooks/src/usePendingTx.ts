import { Listener } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

/**
 * Returns all pending txes
 */
export const usePendingTx = ({ provider }: { provider: any }): any[] => {
  const [txes, set] = useState([])

  useEffect(() => {
    const sub: Listener = (tx) => set((arr) => [...arr, tx])
    if (provider) {
      provider?.on('pending', sub)

      return () => void provider.off('pending', sub)
    }
  }, [provider])

  return txes
}
