import { BaseProvider } from '@ethersproject/providers';
import React, { useMemo } from 'react';
import { Box, BoxProps } from '../Box/Box';
import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import { EthAddress } from '../EthAddress/EthAddress';
import { PillStyles } from './Badge.css';

export interface BadgeProps {
  /**
   * ENS avatar
   */
  avatar?: string;
  /**
   * Blockchain account address
   */
  address: string;
  /**
   * RPC Provider
   */
  provider: BaseProvider;
  /**
   * Base URL for IPFS gateway to resolve `ipfs://` links
   */
  ipfsGatewayUrl: string;
}

/**
 * User bagge showing current address/ENS username and a profile picture/emoji icon
 */
export const Badge = ({
  address,
  avatar: _avatar,
  children,
  className,
  ipfsGatewayUrl,
  provider,
  ...props
}: BadgeProps & BoxProps) => {
  const avatar = useMemo(() => {
    if (_avatar) {
      if (_avatar.startsWith('ipfs://')) {
        return `https://${ipfsGatewayUrl}/ipfs/${_avatar.slice(7)}`;
      } else return _avatar;
    }
  }, [address, _avatar]);

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
      <EthAddress
        profileIcon={avatar || (() => <EmojiIcon address={address} />)}
        {...{ address, provider }}
      />{' '}
      {children}
    </Box>
  );
};
