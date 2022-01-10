import React, { useMemo } from 'react'
import { BaseProvider } from '@ethersproject/providers'
import { useSignificantBalance, useWalletInfo } from '../../hooks'
import { chainIDToToken } from '../../utils'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'

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
    <>
      <Box as="li" paddingBottom="12" display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Text as="div" color="menuText" weight="heavy">
            {bal.slice(0, 5)} {symbol}
          </Text>
          <Text as="div" color="menuTextSecondary" size="14" weight="heavy">
            {name}
          </Text>
        </Box>

        {logoURI && <Box as="img" borderRadius="6" src={logoURI} width="20" height="20" alt={name} />}
      </Box>
      <Box as="hr" height="4" background="menuDivider" borderRadius="1" marginBottom="12" />
    </>
  )
}
