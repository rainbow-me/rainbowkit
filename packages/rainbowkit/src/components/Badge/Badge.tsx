import { BaseProvider } from '@ethersproject/providers';
import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { EthAddress } from '../EthAddress/EthAddress';
import { PillStyles } from './Badge.css';

export interface BadgeProps extends BoxProps {
  /**
   * Blockchain account address
   */
  address: string;
  /**
   * RPC Provider
   */
  provider: BaseProvider;
  profileIcon?: string | React.ComponentType<any>;
}

/**
 * User bagge showing current address/ENS username and a profile picture/emoji icon
 */
export const Badge = ({
  address,
  children,
  className,
  profileIcon,
  provider,
  ...props
}: BadgeProps) => {
  return (
    <Box
      alignItems="center"
      className={[PillStyles, className]}
      color="connectButtonText"
      cursor="pointer"
      display="flex"
      fontWeight="heavy"
      justifyContent="center"
      {...props}
    >
      <EthAddress {...{ address, profileIcon, provider }} /> {children}
    </Box>
  );
};
