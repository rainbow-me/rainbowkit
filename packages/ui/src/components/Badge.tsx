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

export const Badge = ({
  records,
  address,
  provider,
  ipfsGatewayUrl,
  ...props
}: BadgeProps & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
  const { avatar, emoji, color } = useMemo(() => {
    if (records.avatar) {
      const avatar = records.avatar
      if (avatar) {
        if (avatar.startsWith('ipfs://')) {
          return { avatar: `https://${ipfsGatewayUrl}/ipfs/${avatar.slice(7)}`, address }
        } else return { avatar, address }
      }
    } else {
      return {
        emoji: addressHashedEmoji(address),
        color: colors[addressHashedColorIndex(address)],
        address
      }
    }
  }, [address, records.avatar])

  return (
    <Pill {...props}>
      <EthAddress
        profileIcon={
          avatar ||
          (() => (
            <EmojiIcon $bgColor={color} role="img">
              {emoji}
            </EmojiIcon>
          ))
        }
        {...{ provider, address }}
      />
    </Pill>
  )
}
