import React from 'react'
import styles from '../../styles/EthAddress.module.css'
import { getAddress } from '@ethersproject/address'

export interface EthAddressProps {
  addr: string
  shorten?: boolean
  profileIcon?: string
  classNames?: Partial<{
    profileIcon: string
    container: string
    address: string
  }>
}

function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const EthAddress = ({ addr, shorten, profileIcon, ...props }: EthAddressProps) => {
  shorten = typeof shorten === 'undefined' ? true : shorten

  return (
    <div className={`${styles.container} ${props.classNames?.container}`}>
      <span className={`${styles.address} ${props.classNames?.address}`}>
        {(shorten && isAddress(addr) && shortenAddress(addr)) || addr}
      </span>
      {profileIcon && <img src={profileIcon} className={`${styles.profileIcon} ${props.classNames?.profileIcon}`} />}
    </div>
  )
}
