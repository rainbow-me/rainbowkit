import React, { ReactNode } from 'react'
import { Chain } from '@rainbow-me/kit-utils'
import { OptionStyles, SelectOptionStyles } from './style.css'
import { Box } from '../Box'

export interface ChainOptionProps {
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
    borderRadius="12"
    color="sky90"
    aria-label="option"
    {...props}
    className={`${OptionStyles} ${props.className || ''}`}
  >
    <Box
      as="img"
      aria-hidden="true"
      minWidth="24"
      minHeight="24"
      className={iconClassName}
      src={chain.logoURL || 'https://bafkreidyoljjm3jbmbewkxunvnn76s6cswo3d7ldhpnas54uphil23vlfu.ipfs.dweb.link/'}
    />{' '}
    {children}
  </Box>
)
