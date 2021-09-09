import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

export const usePendingTx = (): any[] => {
  const { library: provider, account: address } = useWeb3React<Web3Provider>()
  const [txes, set] = useState([])

  useEffect(() => {
    const sub = (tx: unknown) => set((arr) => [...arr, tx])
    provider?.on('pending', sub)

    return () => void provider.off('pending', sub)
  }, [provider])

  return txes
}
