import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

export const toSignificant = (b: BigNumber) => {
  const formatted = formatEther(b)
  const floatBal = parseFloat(formatted)
  const intBal = parseInt(formatted)

  if (floatBal === intBal) {
    return intBal
  } else return floatBal > 9999 ? floatBal.toFixed(0) : floatBal.toPrecision(4)
}
