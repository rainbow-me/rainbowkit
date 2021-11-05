import { BaseProvider } from '@ethersproject/providers'

/**
 * Resolve ENS or Ethereum address to Ethereum address
 * @returns resolved Ethereum address
 */
export const resolveAddress = async ({ addr, provider }: { addr: string; provider: BaseProvider }) => {
  if (/^0x[a-fA-F0-9]{40}$/.test(addr)) {
    return addr
  } else {
    return await provider.resolveName(addr)
  }
}
