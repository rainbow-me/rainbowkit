import { getWalletInfo } from '@rainbowkit/utils'
import { useEffect, useState } from 'react'

export const useWalletInfo = (initialValue?: { name: string; logoURI: string }) => {
  const [info, set] = useState(initialValue || { name: '', logoURI: '' })

  useEffect(() => {
    const listener = () => {
      const lastUsedWallet = localStorage.getItem('rk-last-wallet')

      if (lastUsedWallet) set(getWalletInfo(lastUsedWallet))
    }

    window.addEventListener('storage', listener)

    listener()

    return () => window.removeEventListener('storage', listener)
  }, [])

  return info
}
