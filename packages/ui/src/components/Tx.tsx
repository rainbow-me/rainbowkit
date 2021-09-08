import { BaseProvider } from '@ethersproject/providers'
import { chainIDToExplorer } from '@rainbowkit/utils'
import React, { useEffect, useState, useMemo } from 'react'
import styles from '../../styles/Tx.module.css'
import { FAIL_ICON, PENDING_ICON, SUCCESS_ICON } from '../constants/images'

export interface TxProps {
  status?: 'pending' | 'success' | 'fail'
  title?: string
  hash?: string
  chainId?: number
  explorerUrl?: string
  provider?: BaseProvider
  classNames?: Partial<{
    container: string
    icon: string
  }>
}

export const Tx = ({ status, title, classNames, ...props }: TxProps) => {
  const iconUrl = useMemo(() => {
    switch (status) {
      case 'pending':
        return PENDING_ICON
      case 'success':
        return SUCCESS_ICON
      case 'fail':
        return FAIL_ICON
    }
  }, [status])

  const [link, setLink] = useState('')

  useEffect(() => {
    if (props.hash) {
      if (props.explorerUrl) setLink(`${props.explorerUrl}/${props.hash}`)
      else if (props.chainId) setLink(`${chainIDToExplorer(props.chainId || 1)}/${props.hash}`)
    }
  }, [props.hash, props.explorerUrl, props.chainId])

  return (
    <div className={`${styles.container} ${classNames?.container}`}>
      <a href={link} title={title}>
        {title}
      </a>{' '}
      <img
        className={`${styles.icon} ${classNames?.icon}`}
        src={iconUrl}
        aria-label={status}
        alt={status}
        title={status}
      />
    </div>
  )
}
