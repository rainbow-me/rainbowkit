import type { Filter, Log, TransactionResponse } from '@ethersproject/abstract-provider'
import type { EtherscanProvider, BaseProvider as Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

export type TxHistoryFetcher<T extends Provider = Provider, O extends any = any, Tx extends any = Log> = (opts: {
  address: string
  provider: T
  options?: O
}) => Promise<Tx[]>

export const logsFetcher: TxHistoryFetcher<Provider, Filter, Log> = async ({ provider, address, options = {} }) => {
  return await provider.getLogs({ fromBlock: 0, ...options, address })
}

export const etherscanFetcher: TxHistoryFetcher<
  EtherscanProvider,
  { fromBlock?: number; toBlock?: number },
  TransactionResponse
> = async ({ provider, address, options = {} }) => {
  return await provider.getHistory(address, options.fromBlock, options.toBlock)
}

/**
 * Fetch transaction history for an address.
 *
 * There are two fetchers availaible, event logs fetcher (`logsFetcher`) and Etherscan fetcher (`etherscanFetcher`).
 * `logsFetcher` is used by default.
 */
export const useTxHistory = <O extends any = any, Tx extends any = Log>({
  fetcher = logsFetcher,
  address,
  options,
  provider
}: {
  fetcher?: TxHistoryFetcher
  provider: Provider
  address: string
  options?: O
}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Tx[]>()
  const [error, setError] = useState<Error>()

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
