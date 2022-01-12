import { BigNumber } from '@ethersproject/bignumber'
import { shortenAddress } from './address'
import { chainIDToToken } from './convert'
import { toSignificant } from './toSignificant'

export const guessTitle = ({
  data,
  from,
  to,
  chainId = 1,
  value
}: Partial<{ chainId: number }> & { from: string; to: string; value?: BigNumber; data?: string }) => {
  if (from === to) return `Cancel transaction`

  if (data) {
    if (data === '0x') {
      if (value)
        return `Transfer ${toSignificant(value, 3)} ${chainIDToToken(chainId)} from ${shortenAddress(
          from,
          3
        )} to ${shortenAddress(to, 3)}`
    } else return `Contract call`
  }

  return `Transaction`
}
