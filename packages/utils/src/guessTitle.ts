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
}: Partial<{ data: string; chainId: number }> & { from: string; to: string; value?: BigNumber }) => {
  if (from === to) return `Cancel transaction`
  if (data) {
    if (data === '0x') {
      if (value)
        return `Transfer ${toSignificant(value)} ${chainIDToToken(chainId)} from ${shortenAddress(
          from
        )} to ${shortenAddress(to)}`
    } else return `Contract call`
  }
  return `Transaction`
}
