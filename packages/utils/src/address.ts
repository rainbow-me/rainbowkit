import { getAddress } from '@ethersproject/address'

/**
 * Check an Ethereum address for validity
 * @param address blockchain address
 * @returns original address or "false"
 */
export function isAddress(value: string): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
/**
 * Shortens an Ethereum address by N characters
 * @param address blockchain address
 * @param chars amount of character t shorten
 * @returns formatted string
 */
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) throw Error(`Invalid 'address' parameter '${address}'.`)

  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}
