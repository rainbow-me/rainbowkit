import { useEffect, useState } from 'react'
import { Listener } from '@ethersproject/abstract-provider'
import { BaseProvider, Web3Provider } from '@ethersproject/providers'
import { logsFetcher, TxHistoryFetcher } from '../utils'

/**
 * Fetch transaction history for an address.
 *
 * There are two fetchers availaible, event logs fetcher (`logsFetcher`) and Etherscan fetcher (`etherscanFetcher`).
 * `logsFetcher` is used by default.
 */
export const useExplorerTxHistory = <Tx = any, P extends BaseProvider = Web3Provider>({
  fetcher = logsFetcher,
  address,
  options,
  provider
}: {
  fetcher?: TxHistoryFetcher
  provider: P
  address: string
  options?: any
}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Tx[]>([])
  const [error, setError] = useState<Error & { data?: { message: string; code: string } }>()

  useEffect(() => {
    const sub: Listener = (tx) => setData((arr) => [...arr, { ...tx, status: 'pending' }])

    if (address && provider && fetcher) {
      fetcher({ address, provider, options })
        .then((txes) => {
          setLoading(false)
          setData(txes as Tx[])
        })
        .catch((err) => {
          setLoading(false)
          setError(err)
        })
    }
    if (provider) {
      provider.on('pending', sub)

      return () => void provider.off('pending', sub)
    }
  }, [address, provider, fetcher])

  return { loading, data, error }
}
