import React from 'react'
import { isAddress, shortenAddress, chainIDToToken, toSignificant } from '@rainbowkit/utils'
import { BaseProvider } from '@ethersproject/providers'
import { useState, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export interface EthAddressProps {
  addr: string
  shorten?: boolean
  provider?: BaseProvider
  balance?: boolean | BigNumber
  profileIcon?: string
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
  font-weight: 500;
  color: var(--fg);
`

const Balance = styled.span`
  font-family: sans-serif;
  font-weight: 500;
  color: var(--fg);
  padding-right: 0.4rem;
  margin-right: 0.4rem;
  border-right: 2px solid var(--fg);
`

const ProfileIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  border: 50%;
  margin-right: 0.5rem;
`

export const EthAddress = ({
  addr,
  shorten,
  profileIcon,
  balance,
  provider,
  networkToken,
  ...props
}: EthAddressProps) => {
  shorten = shorten === undefined ? true : shorten

  const [bal, setBal] = useState('0')

  const [symbol, setSymbol] = useState(networkToken || 'eth')

  useEffect(() => {
    if (balance && addr) {
      if (balance === true && provider) {
        provider.getBalance(addr).then((b: BigNumber) => {
          setBal(toSignificant(b))
        })
      } else if (typeof balance !== 'boolean') {
        setBal(toSignificant(balance))
      }
      if (!networkToken && provider) {
        provider.getNetwork().then(({ chainId }) => {
          setSymbol(chainIDToToken(chainId))
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, addr, balance])

  return (
    <Container className={props.classNames?.container}>
      {profileIcon && <ProfileIcon src={profileIcon} className={props.classNames?.profileIcon} />}
      {balance && (
        <Balance className={props.classNames?.balance}>
          {bal} {symbol.toUpperCase()}
        </Balance>
      )}
      <Address className={props.classNames?.address}>
        {(shorten && isAddress(addr) && shortenAddress(addr)) || addr}
      </Address>
    </Container>
  )
}
