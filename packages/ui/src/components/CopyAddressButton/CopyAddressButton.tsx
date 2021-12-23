import React, { useState } from 'react'
import { Box } from '../Box'
import { Text } from '../Text'
import { CopyIcon } from './Icons'

export const CopyAddressButton = ({ address }: { address: string }) => {
  const [copied, set] = useState(false)

  return (
    <Box
      as="button"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="full"
      color="menuTextAction"
      flexDirection="row"
      onClick={() => {
        navigator.clipboard.writeText(address).then(() => set(true))
      }}
    >
      <Text size="14" weight="bold" color="menuTextAction">
        {copied ? 'Copied' : 'Copy Address'}
      </Text>
      <Box width="20" height="20" display="flex" justifyContent="center" alignItems="center">
        <CopyIcon />
      </Box>
    </Box>
  )
}
