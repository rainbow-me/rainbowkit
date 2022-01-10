import React from 'react'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { isAddress, shortenAddress } from '../../utils'
import { Box, BoxProps } from '../Box/Box'
import { Text } from '../Text/Text'

export interface EthAddressProps extends BoxProps {
  address: string
  shorten?: boolean
  provider?: BaseProvider
  balance?: boolean | BigNumber
  profileIcon?: string | React.ComponentType<any>
  networkToken?: string
  classNames?: Partial<{
    profileIcon: string
    container: string
    address: string
    balance: string
  }>
}

export const EthAddress = ({
  address: addr,
  shorten,
  profileIcon: ProfileIconURLOrImage,
  balance,
  provider,
  networkToken,
  classNames,
  ...props
}: EthAddressProps) => {
  shorten = shorten === undefined && /^0x[a-fA-F0-9]{40}$/ ? true : shorten

  return (
    <Box
      width="max"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      className={classNames?.container}
      {...props}
    >
      {ProfileIconURLOrImage &&
        (typeof ProfileIconURLOrImage === 'string' ? (
          <Box
            as="img"
            borderRadius="full"
            marginRight="6"
            height="24"
            width="24"
            src={ProfileIconURLOrImage}
            className={classNames?.profileIcon}
          />
        ) : (
          <ProfileIconURLOrImage />
        ))}

      <Text weight="heavy" color="dropdownButtonText" as="span" className={classNames?.address}>
        {(shorten && isAddress(addr) && shortenAddress(addr)) || addr}
      </Text>
    </Box>
  )
}
