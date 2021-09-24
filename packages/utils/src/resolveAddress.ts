import { BaseProvider } from '@ethersproject/providers'

export const resolveAddress = async ({ addr, provider }: { addr: string; provider: BaseProvider }) => {
  if (/^0x[a-fA-F0-9]{40}$/.test(addr)) {
    return await provider.resolveName(addr)
  } else {
    return await provider.lookupAddress(addr)
  }
}
