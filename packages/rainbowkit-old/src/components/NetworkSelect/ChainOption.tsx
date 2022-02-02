import React, { ReactNode } from 'react';
import { Chain } from '../../utils/chains';
import { Box, BoxProps } from '../Box/Box';

export interface ChainOptionProps extends BoxProps {
  chain: Chain;
  children?: ReactNode;
  iconClassName?: string;
  className: string;
  onClick: () => void;
}

export const ChainOption = ({
  chain,
  children,
  iconClassName,
  ...props
}: ChainOptionProps) => (
  <Box
    alignItems="center"
    aria-label="option"
    borderRadius="menuItem"
    color="menuText"
    cursor="pointer"
    display="flex"
    flexDirection="row"
    position="relative"
    {...props}
    className={props.className}
  >
    <Box
      aria-hidden="true"
      as="img"
      className={iconClassName}
      height="24"
      marginRight="6"
      src={
        chain.logoURL ||
        'https://bafkreidyoljjm3jbmbewkxunvnn76s6cswo3d7ldhpnas54uphil23vlfu.ipfs.dweb.link/'
      }
      width="24"
    />{' '}
    {children}
  </Box>
);
