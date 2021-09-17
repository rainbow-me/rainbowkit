import React from 'react'
import { isAddress, shortenAddress, chainIDToToken, toSignificant } from '@rainbowkit/utils'
import { BaseProvider } from '@ethersproject/providers'
import { useState, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { styled } from '@linaria/react'
import { useSignificantBalance } from '@rainbowkit/hooks/src'

export interface EthAddressProps extends React.HTMLAttributes<HTMLDivElement> {
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

const Container = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Address = styled.div`
  font-family: sans-serif;
  font-weight: 800;
  color: var(--fg);
`

const ProfileIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  border: 50%;
  margin-right: 6px;
`

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
  shorten = shorten === undefined ? true : shorten

  return (
    <Container {...props} className={classNames?.container}>
      {ProfileIconURLOrImage &&
        (typeof ProfileIconURLOrImage === 'string' ? (
          <ProfileIcon src={ProfileIconURLOrImage} className={classNames?.profileIcon} />
        ) : (
          <ProfileIconURLOrImage />
        ))}

      <Address className={classNames?.address}>{(shorten && isAddress(addr) && shortenAddress(addr)) || addr}</Address>
    </Container>
  )
}
