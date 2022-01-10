import { ExternalProvider } from '@ethersproject/providers'

declare global {
  interface Window {
    ethereum: ExternalProvider
  }
}

const parseSendReturn = (sendReturn: any): any => sendReturn.result || sendReturn

export const isAuthorized = async () => {
  if (!window.ethereum) return false

  try {
    // @ts-ignore
    return await window.ethereum.request({ method: 'eth_accounts' }).then((sendReturn) => {
      return parseSendReturn(sendReturn).length > 0
    })
  } catch {
    return false
  }
}
