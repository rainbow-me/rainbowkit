import { addressHashedEmoji, colors, addressHashedColorIndex } from '@rainbow-me/kit-utils'
import React, { useMemo } from 'react'
import { StyledIconClassName } from '../css/style.css'

export type EmojiIconProps = React.ClassAttributes<HTMLSpanElement> &
  React.HTMLAttributes<HTMLSpanElement> & { address: string }

/**
 * Emoji icon mapped to an Ethereum address
 */
export const EmojiIcon = ({ address, className, ...props }: EmojiIconProps) => {
  const { emoji, color } = useMemo(() => {
    return {
      emoji: addressHashedEmoji(address),
      color: colors[addressHashedColorIndex(address)]
    }
  }, [address])

  return (
    <span
      className={`${StyledIconClassName} ${className || ''}`}
      style={{ backgroundColor: color }}
      role="img"
      {...props}
    >
      {emoji}
    </span>
  )
}
