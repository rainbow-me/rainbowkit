import React from 'react'
import { isAddress, shortenAddress } from '@rainbow-me/kit-utils'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { styled } from '@linaria/react'
import { useTheme } from '@rainbow-me/kit-theming'
import { css } from '@linaria/core'

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

const ProfileIcon = styled.img`
  border-radius: 50%;
  margin-right: 6px;
`

const Address = styled.div<{ $foreground: string }>`
  color: ${({ $foreground }) => $foreground};
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
  shorten = shorten === undefined && /^0x[a-fA-F0-9]{40}$/ ? true : shorten

  const {
    components: {
      EthAddress: { address, profileIcon }
    },
    foreground
  } = useTheme()

  return (
    <Container
      {...props}
      className={`${css`
        ${profileIcon}
      `} ${classNames?.container || ''}`}
    >
      {ProfileIconURLOrImage &&
        (typeof ProfileIconURLOrImage === 'string' ? (
          <ProfileIcon src={ProfileIconURLOrImage} className={classNames?.profileIcon} />
        ) : (
          <ProfileIconURLOrImage />
        ))}

      <Address
        $foreground={foreground}
        className={css`
          ${address}
          ${classNames?.address || ''}
        `}
      >
        {(shorten && isAddress(addr) && shortenAddress(addr)) || addr}
      </Address>
    </Container>
  )
}
