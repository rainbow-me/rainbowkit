import { useEffect, useState } from 'react'
import { getENS, ResolvedENS } from 'get-ens'
import type { BaseProvider as Provider } from '@ethersproject/providers'

export type UseENSOptions = {
  provider: Provider
  domain: string
  fetchOptions?: RequestInit
  contractAddress?: string
}

/**
 * A React hook to fetch ENS records from a domain.
 * @param provider Ethers.js provider
 * @param domain ENS domain to fetch data from
 * @returns
 */
export const useENS = ({ provider, domain, fetchOptions, contractAddress }: UseENSOptions): ResolvedENS => {
  const [data, set] = useState<ResolvedENS>({ address: null, owner: null, records: {}, domain: '' })

  useEffect(() => {
    if (provider && domain) {
      provider.getNetwork().then(({ chainId }) => {
        if (contractAddress || chainId === 1) {
          getENS(provider, contractAddress)(domain, fetchOptions).then((data) => {
            set(data)
          })
        }
      })
    }
  }, [contractAddress, domain, fetchOptions])

  return data
}
