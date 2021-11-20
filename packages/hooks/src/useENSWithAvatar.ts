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
      const getENSInfo = async () => {
        const domain = await provider.lookupAddress(address)
        setEnsDomain(domain)
        const avatar = await (await provider.getResolver(domain)).getText('avatar')
        setAvatar(avatar)
      }

      getENSInfo()
    }
  }, [provider])

  return { avatar, domain }
}
