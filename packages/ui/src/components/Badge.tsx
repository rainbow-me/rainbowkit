import { addressHashedEmoji, colors, addressHashedColorIndex } from '@rainbow-me/kit-utils'
import React, { useMemo } from 'react'
import { EthAddress } from './EthAddress'
import { ENSRecords } from 'get-ens'
import { Pill } from './Pill'
import { EmojiIcon } from './EmojiIcon'
import { BaseProvider } from '@ethersproject/providers'

export interface BadgeProps {
  records: ENSRecords
  address: string
  provider: BaseProvider
  ipfsGatewayUrl: string
}

/**
 * User bagge showing current address/ENS username and a profile picture/emoji icon
 */
export const Badge = ({
  records,
  address,
  provider,
  ipfsGatewayUrl,
  children,
  ...props
}: BadgeProps & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
  const avatar = useMemo(() => {
    if (records.avatar) {
      const avatar = records.avatar
      if (avatar) {
        if (avatar.startsWith('ipfs://')) {
          return `https://${ipfsGatewayUrl}/ipfs/${avatar.slice(7)}`
        } else return avatar
      }
    }
  }, [address, records.avatar])

  return (
    <Pill {...props}>
      <EthAddress profileIcon={avatar || (() => <EmojiIcon address={address} />)} {...{ provider, address }} />{' '}
      {children}
    </Pill>
  )
}
