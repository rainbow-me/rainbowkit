import { useEffect, useState } from 'react'
import { getENS } from 'get-ens'
import { Provider } from '@ethersproject/providers'

export const useENS = (provider: Provider, domain: string) => {
  const [data, set] = useState({ address: '', owner: '' })

  useEffect(() => {
    if (provider && domain) getENS(provider)(domain).then(set)
  }, [domain, provider])

  return data
}
