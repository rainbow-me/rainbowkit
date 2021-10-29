import { css } from '@linaria/core'
import { addressHashedEmoji, colors, addressHashedColorIndex } from '@rainbow-me/kit-utils'
import React, { useMemo } from 'react'

/**
 * Emoji icon mapped to an Ethereum address
 */
export const EmojiIcon = ({ address }: { address: string }) => {
  const { emoji, color } = useMemo(() => {
    return {
      emoji: addressHashedEmoji(address),
      color: colors[addressHashedColorIndex(address)]
    }
  }, [address])

  return (
    <span
      className={css`
        border-radius: 50%;
        height: 1.8em;
        width: 1.8em;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${color};

        font-size: 0.8em;
        margin-right: 10px;
      `}
    >
      {emoji}
    </span>
  )
}
