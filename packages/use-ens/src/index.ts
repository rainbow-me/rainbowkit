import { useEffect, useState } from 'react'
import { getENS } from 'get-ens'
import { Provider } from '@ethersproject/providers'

/**
 * A React hook to fetch ENS records from a domain.
 * @param provider Ethers.js provider
 * @param domain ENS domain to fetch data from
 * @returns
 */
export const useENS = (provider: Provider, domain: string) => {
  const [data, set] = useState({ address: '', owner: '' })

  useEffect(() => {
    if (provider && domain) getENS(provider)(domain).then(set)
  }, [domain, provider])

  return data
}
