import { useEffect, useState } from 'react'
import { getENS, ResolvedENS } from 'get-ens'
import type { Provider } from '@ethersproject/providers'

/**
 * A React hook to fetch ENS records from a domain.
 * @param provider Ethers.js provider
 * @param domain ENS domain to fetch data from
 * @returns
 */
export const useENS = (provider: Provider, domain: string): ResolvedENS => {
  const [data, set] = useState<ResolvedENS>({ address: null, owner: null, records: { web: {} } })

  useEffect(() => {
    if (provider && domain) getENS(provider)(domain).then(set)
  }, [domain, provider])

  return data
}
