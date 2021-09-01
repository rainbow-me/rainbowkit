import React from 'react'
import { isAddress, shortenAddress, chainIDToToken, toSignificant } from '@rainbowkit/utils'
import styles from '../../styles/EthAddress.module.css'
import { BaseProvider } from '@ethersproject/providers'
import { useState, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

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
    <div className={`${styles.container} ${props.classNames?.container}`}>
      {profileIcon && <img src={profileIcon} className={`${styles.profileIcon} ${props.classNames?.profileIcon}`} />}
      {balance && (
        <span className={`${styles.balance} ${props.classNames?.balance}`}>
          {bal} {symbol.toUpperCase()}
        </span>
      )}
      <span className={`${styles.address} ${props.classNames?.address}`}>
        {(shorten && isAddress(addr) && shortenAddress(addr)) || addr}
      </span>
    </div>
  )
}
