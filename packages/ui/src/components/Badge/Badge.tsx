import React, { useMemo } from 'react'
import { EthAddress } from '../EthAddress'
import { EmojiIcon } from '../EmojiIcon'
import { BaseProvider } from '@ethersproject/providers'
import { PillStyles } from './Badge.css'
import { Box } from '../Box'
import { BoxProps } from '../Box/Box'

export interface BadgeProps {
  /**
   * ENS avatar
   */
  avatar?: string
  /**
   * ENS domain
   */
  domain?: string
  /**
   * Blockchain account address
   */
  address: string
  /**
   * RPC Provider
   */
  provider: BaseProvider
  /**
   * Base URL for IPFS gateway to resolve `ipfs://` links
   */
  ipfsGatewayUrl: string
}

/**
 * User bagge showing current address/ENS username and a profile picture/emoji icon
 */
export const Badge = ({
  avatar: _avatar,
  domain,
  address,
  provider,
  ipfsGatewayUrl,
  children,
  className,
  ...props
}: BadgeProps & BoxProps) => {
  const avatar = useMemo(() => {
    if (_avatar) {
      if (_avatar.startsWith('ipfs://')) {
        return `https://${ipfsGatewayUrl}/ipfs/${_avatar.slice(7)}`
      } else return _avatar
    }
  }, [address, _avatar])

  return (
    <Box
      display="flex"
      cursor="pointer"
      justifyContent="center"
      alignItems="center"
      fontWeight="heavy"
      color="foreground"
      className={[PillStyles, className]}
      {...props}
    >
      <EthAddress profileIcon={avatar || (() => <EmojiIcon address={address} />)} {...{ provider, address }} />{' '}
      {children}
    </Box>
  )
}
