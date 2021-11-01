import { getWalletInfo } from '@rainbow-me/kit-utils'
import { useEffect, useState } from 'react'

/**
 * A React hook to get most recently used wallet information from storage
 * @param initialValue
 * @returns
 */
export const useWalletInfo = (initialValue: { name: string; logoURI: string } = { name: '', logoURI: '' }) => {
  const [info, set] = useState(initialValue)

  useEffect(() => {
    const listener = () => {
      const lastUsedWallet = localStorage.getItem('rk-last-wallet')

      if (lastUsedWallet) set(getWalletInfo(lastUsedWallet))
    }

    listener()

    window.addEventListener('storage', listener)

    return () => window.removeEventListener('storage', listener)
  }, [])

  return info
}
