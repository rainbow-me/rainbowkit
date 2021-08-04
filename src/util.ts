import WalletConnectClient from '@walletconnect/client'

const baseUrl = 'https://rnbwapp.com'

export const constructDeeplink = (uri: string): string => {
  const encodedUri = encodeURIComponent(uri)
  const fullUrl = `${baseUrl}/wc?uri=${encodedUri}`
  return fullUrl
}

export const getClientPairings = (client: WalletConnectClient): string[] => {
  return client?.session?.topics || []
}
