import { BaseProvider } from '@ethersproject/providers'
import { chainIDToExplorer, guessTitle } from '@rainbow-me/kit-utils'
import React, { useEffect, useState } from 'react'
import type { TransactionWithStatus } from '@rainbow-me/kit-hooks'
import { ExplorerLinkClassName, TxContainerClassName } from './Tx.css'
import clsx from 'clsx'

export type TxProps = {
  /**
   * Transaction status
   */
  status?: 'pending' | 'success' | 'fail'
  /**
   * Transaction title
   */
  title?: string
  /**
   * Blockchain network ID of a transaction
   */
  chainId?: number
  /**
   * Blockchain Explorer URL
   */
  explorerUrl?: string
  /**
   * RPC Provider
   */
  provider?: BaseProvider
  classNames?: Partial<{
    container: string
    icon: string
  }>
} & Pick<TransactionWithStatus, 'status' | 'to' | 'value' | 'from' | 'data' | 'hash'>

export const Tx = ({ status, title: initialTitle, classNames, chainId, data, value, from, to, ...props }: TxProps) => {
  const [title, setTitle] = useState(initialTitle || '')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (props.hash) {
      if (props.explorerUrl) setLink(`${props.explorerUrl}/tx/${props.hash}`)
      else if (chainId) {
        setLink(`${chainIDToExplorer(chainId).url}/tx/${props.hash}`)
      }

      if (!initialTitle) {
        const guessedTitle = guessTitle({ data, from, to, chainId, value })
        if (guessedTitle) setTitle(guessedTitle)
      }
    }
  }, [props.hash, props.explorerUrl, chainId])

  return (
    <div className={clsx(TxContainerClassName, classNames.container)}>
      {link === '' ? (
        <span>{title || 'Contract call'}</span>
      ) : (
        <a className={ExplorerLinkClassName} href={link} title={title}>
          {title}
        </a>
      )}

      <span>{status}</span>
    </div>
  )
}
