import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

export const toSignificant = (b: BigNumber) => {
  const floatBal = parseFloat(formatEther(b))

  return floatBal > 9999 ? floatBal.toFixed(0) : floatBal.toPrecision(4)
}
