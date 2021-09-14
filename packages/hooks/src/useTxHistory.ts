import { useEffect, useState } from 'react'
import { logsFetcher } from '@rainbowkit/utils'
import type { TxHistoryFetcher } from '@rainbowkit/utils'

/**
 * Fetch transaction history for an address.
 *
 * There are two fetchers availaible, event logs fetcher (`logsFetcher`) and Etherscan fetcher (`etherscanFetcher`).
 * `logsFetcher` is used by default.
 */
export const useTxHistory = <Tx extends any = any, P extends any = any>({
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
  const [data, setData] = useState<Tx[]>()
  const [error, setError] = useState<Error & { data?: { message: string; code: string } }>()

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, provider, fetcher])

  return { loading, data, error }
}
