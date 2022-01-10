import React from 'react'
import { Box, BoxProps } from '../Box/Box'

type Props = {
  as?: 'code' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'p' | 'span'
  children?: React.ReactNode
  color: BoxProps['color']
  font?: BoxProps['fontFamily']
  //   lineHeight?: BoxProps['lineHeight']
  size?: BoxProps['fontSize']
  //   transform?: BoxProps['textTransform']
  weight?: BoxProps['fontWeight']
  className?: string
}

export const Text = React.forwardRef(
  (
    { as = 'div', children, color, font = 'body', size = '16', weight = 'regular', className }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box as={as} ref={ref} color={color} fontFamily={font} fontSize={size} fontWeight={weight} className={className}>
        {children}
      </Box>
    )
  }
)

Text.displayName = 'Text'
