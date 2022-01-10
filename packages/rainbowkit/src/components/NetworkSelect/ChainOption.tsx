import React, { ReactNode } from 'react'
import { Chain } from '../../utils'
import { Box, BoxProps } from '../Box'

export interface ChainOptionProps extends BoxProps {
  chain: Chain
  children?: ReactNode
  iconClassName?: string
  className: string
  onClick: () => void
}

export const ChainOption = ({ chain, children, iconClassName, ...props }: ChainOptionProps) => (
  <Box
    display="flex"
    position="relative"
    cursor="pointer"
    alignItems="center"
    flexDirection="row"
    borderRadius="menuItem"
    color="menuText"
    aria-label="option"
    {...props}
    className={props.className}
  >
    <Box
      as="img"
      aria-hidden="true"
      width="24"
      height="24"
      marginRight="6"
      className={iconClassName}
      src={chain.logoURL || 'https://bafkreidyoljjm3jbmbewkxunvnn76s6cswo3d7ldhpnas54uphil23vlfu.ipfs.dweb.link/'}
    />{' '}
    {children}
  </Box>
)
