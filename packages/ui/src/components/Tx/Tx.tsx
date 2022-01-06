import { BaseProvider } from '@ethersproject/providers'
import { chainIDToExplorer, guessTitle } from '@rainbow-me/kit-utils'
import React, { useEffect, useState } from 'react'
import type { TransactionWithStatus, TransactionStatus } from '@rainbow-me/kit-hooks'
import clsx from 'clsx'
import { FailIcon, LoadingIcon, SuccessIcon, ViewTransactionIcon } from './icons'
import { Box } from '../Box/Box'

export type TxProps = {
  /**
   * Transaction status
   */
  status?: TransactionStatus
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

const StatusIcon = ({ status }: { status: TransactionStatus }) => {
  switch (status) {
    case 'fail':
      return <FailIcon />
    case 'pending':
      return <LoadingIcon />
    case 'success':
      return <SuccessIcon />
  }
}

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
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom="24"
      className={clsx(classNames?.container)}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box as="span" color={status === 'fail' ? 'error' : 'menuTextAction'}>
          <StatusIcon status={status} />
        </Box>
        <Box display="flex" flexDirection="column" marginLeft="14" marginRight="4">
          <Box as="span" color="menuText" fontSize="16" fontWeight="bold">
            {title || 'Contract call'}
          </Box>
          <Box as="span" color="menuTextSecondary" marginTop="4" fontSize="14" fontWeight="bold">
            {status}
          </Box>
        </Box>
      </Box>
      <Box as="a" color="menuTextAction" href={link} title="View on explorer">
        <ViewTransactionIcon />
      </Box>
    </Box>
  )
}
