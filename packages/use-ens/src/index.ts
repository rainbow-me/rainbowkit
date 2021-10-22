import { useEffect, useState } from 'react'
import { getENS, ResolvedENS } from 'get-ens'
import type { BaseProvider as Provider } from '@ethersproject/providers'

/**
 * A React hook to fetch ENS records from a domain.
 * @param provider Ethers.js provider
 * @param domain ENS domain to fetch data from
 * @returns
 */
export const useENS = ({
  provider,
  domain,
  fetchOptions,
  contractAddress,
  cache
}: {
  provider: Provider
  domain: string
  fetchOptions?: RequestInit
  contractAddress?: string
  cache?: boolean
}): ResolvedENS => {
  const [data, set] = useState<ResolvedENS>({ address: null, owner: null, records: {}, domain: '' })

  useEffect(() => {
    if (cache) {
      try {
        const cachedData = JSON.parse(localStorage.getItem(`use-ens-${domain}`))
        set(cachedData)
        // eslint-disable-next-line no-empty
      } catch {}
    } else if (provider && domain) {
      provider.getNetwork().then(({ chainId }) => {
        if (contractAddress || chainId === 1) {
          getENS(provider, contractAddress)(domain, fetchOptions).then((data) => {
            if (cache) localStorage.setItem(`use-ens-${domain}`, JSON.stringify(data))
            set(data)
          })
        }
      })
    }
  }, [cache, contractAddress, domain, fetchOptions])

  return data
}
