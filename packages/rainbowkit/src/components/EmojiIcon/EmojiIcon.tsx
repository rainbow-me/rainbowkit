import React, { useMemo } from 'react'
import { addressHashedEmoji, colors, addressHashedColorIndex } from '../../utils'
import { Box } from '../Box'
import type { BoxProps } from '../Box/Box'

export type EmojiIconProps = BoxProps & { address: string }

/**
 * Emoji icon mapped to an Ethereum address
 */
export const EmojiIcon = ({ address, className, ...props }: EmojiIconProps) => {
  const { emoji, color } = useMemo(() => {
    return {
      emoji: addressHashedEmoji(address),
      color: colors[addressHashedColorIndex(address) ?? 0]
    }
  }, [address])

  return (
    <Box
      as="span"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      fontSize="14"
      marginRight="10"
      width="28"
      height="28"
      className={className}
      style={{ backgroundColor: color }}
      {...props}
    >
      {emoji}
    </Box>
  )
}
