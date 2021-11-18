import { useEffect, useState } from 'react'
import { getENS, ResolvedENS } from 'get-ens'

export type UseENSOptions = {
  provider: any
  chainId?: number
  domain: string
  fetchOptions?: RequestInit
  contractAddress?: string
}

/**
 * A React hook to fetch ENS records from a domain.
 * @returns
 */
export const useENS = ({
  provider,
  domain,
  fetchOptions,
  contractAddress,
  chainId
}: UseENSOptions): ResolvedENS | undefined => {
  const [data, set] = useState<ResolvedENS>()

  useEffect(() => {
    if (provider && domain && !data) {
      if (chainId === 1 || contractAddress) {
        getENS(provider, contractAddress)(domain, fetchOptions).then((data) => {
          set(data)
        })
      } else {
        provider.getNetwork().then(({ chainId }: { chainId: number }) => {
          if (contractAddress || chainId === 1) {
            getENS(provider, contractAddress)(domain, fetchOptions).then((data) => {
              set(data)
            })
          }
        })
      }
    }
  }, [contractAddress, domain, fetchOptions])

  return data
}
