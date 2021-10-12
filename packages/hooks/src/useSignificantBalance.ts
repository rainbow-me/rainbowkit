import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import { toSignificant } from '@rainbow-me/kit-utils'
import { useEffect, useState } from 'react'

export const useSignificantBalance = ({
  provider,
  address,
  initialValue
}: {
  provider: BaseProvider
  address: string
  initialValue?: BigNumber
}) => {
  const [bal, setBal] = useState('0')

  const set = (v: BigNumber) => setBal(toSignificant(v))

  useEffect(() => {
    if (initialValue) set(initialValue)
    else if (provider) {
      provider.getBalance(address).then((b: BigNumber) => {
        set(b)
      })
    }
  }, [address, initialValue, provider])

  return bal
}
