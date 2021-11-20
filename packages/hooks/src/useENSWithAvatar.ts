import { Web3Provider, BaseProvider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

export const useENSWithAvatar = <T extends BaseProvider = Web3Provider>({
  address,
  provider
}: {
  address: string
  provider: T
}) => {
  const [avatar, setAvatar] = useState<string>()
  const [domain, setEnsDomain] = useState(address)

  useEffect(() => {
    if (provider) {
      provider.lookupAddress(address).then(setEnsDomain)
      provider.getAvatar(address).then((av) => setAvatar(av))
    }
  }, [provider])

  return { avatar, domain }
}
