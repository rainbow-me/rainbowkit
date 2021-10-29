import { styled } from '@linaria/react'
import { addressHashedEmoji, colors, addressHashedColorIndex } from '@rainbow-me/kit-utils'
import React, { useMemo } from 'react'

const StyledIcon = styled.span<{ $bgColor: string }>`
  border-radius: 50%;
  height: 1.8em;
  width: 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $bgColor }) => $bgColor};

  font-size: 0.8em;
  margin-right: 10px;
`

export type EmojiIconProps = React.ClassAttributes<HTMLSpanElement> &
  React.HTMLAttributes<HTMLSpanElement> & { address: string }

/**
 * Emoji icon mapped to an Ethereum address
 */
export const EmojiIcon = ({ address, ...props }: EmojiIconProps) => {
  const { emoji, color } = useMemo(() => {
    return {
      emoji: addressHashedEmoji(address),
      color: colors[addressHashedColorIndex(address)]
    }
  }, [address])

  return (
    <StyledIcon $bgColor={color} role="img" {...props}>
      {emoji}
    </StyledIcon>
  )
}
