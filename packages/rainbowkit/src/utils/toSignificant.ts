import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { nFormat } from './nFormat'

/**
 * Rounds a number to significant 4-digit number
 * @param big number
 * @returns formatted number
 */
export const toSignificant = (b: BigNumber): string => {
  const formatted = formatEther(b)
  const floatBal = parseFloat(formatted)

  if (floatBal > 9999) return nFormat(floatBal, 0)

  return floatBal.toPrecision(4)
}
