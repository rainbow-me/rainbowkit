import { styled } from '@linaria/react'
import { addressHashedEmoji, colors, addressHashedColorIndex } from '@rainbow-me/kit-utils'
import React, { useMemo } from 'react'
import { useTheme } from '@rainbow-me/kit-theming'
import { css } from '@linaria/core'

const StyledIcon = styled.span<{ $bgColor: string }>`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $bgColor }) => $bgColor};
  margin-right: 10px;
`

export type EmojiIconProps = React.ClassAttributes<HTMLSpanElement> &
  React.HTMLAttributes<HTMLSpanElement> & { address: string }

/**
 * Emoji icon mapped to an Ethereum address
 */
export const EmojiIcon = ({ address, className, ...props }: EmojiIconProps) => {
  const {
    components: { EmojiIcon: styles }
  } = useTheme()

  const { emoji, color } = useMemo(() => {
    return {
      emoji: addressHashedEmoji(address),
      color: colors[addressHashedColorIndex(address)]
    }
  }, [address])

  return (
    <StyledIcon $bgColor={color} role="img" className={`${styles} ${className}`} {...props}>
      {emoji}
    </StyledIcon>
  )
}
