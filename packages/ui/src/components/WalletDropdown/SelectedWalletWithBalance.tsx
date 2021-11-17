import { BaseProvider } from '@ethersproject/providers'
import { useSignificantBalance, useWalletInfo } from '@rainbow-me/kit-hooks'
import { chainIDToToken } from '@rainbow-me/kit-utils'
import React, { useMemo } from 'react'
import { Box } from '../Box'
import { Text } from '../Text'

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
    <Box as="li" marginBottom="16" display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Text as="h1" weight="heavy">
          {bal.slice(0, 5)} {symbol}
        </Text>
        <Text as="h2" weight="heavy">
          {name}
        </Text>
      </Box>

      {logoURI && <Box as="img" borderRadius="6" src={logoURI} width="20" height="20" alt={name} />}
    </Box>
  )
}
