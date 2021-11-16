import { BaseProvider } from '@ethersproject/providers'
import { useSignificantBalance, useWalletInfo } from '@rainbow-me/kit-hooks'
import { chainIDToToken } from '@rainbow-me/kit-utils'
import React, { useMemo } from 'react'

export const SelectedWalletWithBalance = ({
  provider,
  accountAddress,
  chainId
}: {
  provider: BaseProvider
  accountAddress: string
  chainId: number
}) => {
  const bal = useSignificantBalance({ provider, address: accountAddress })

  const symbol = useMemo(() => chainIDToToken(chainId), [chainId])

  const { logoURI, name } = useWalletInfo()

  return (
    <li>
      {bal.slice(0, 5)} {symbol}
      {logoURI && <img src={logoURI} width={32} height={32} alt={name} />}
    </li>
  )
}
