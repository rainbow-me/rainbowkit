import { TransactionWithStatus } from '@rainbow-me/kit-hooks'
import React from 'react'
import { Tx as DefaultTx } from '../Tx'
import type { TxProps } from '../Tx'
import { Box, BoxProps } from '../Box/Box'
import { ViewHistoryIcon } from './icons'

export interface TxHistoryProps extends Omit<BoxProps, 'reset'> {
  /**
   * Custom `<Tx />` component
   */
  txComponent?: (props: TxProps) => JSX.Element

  /**
   * Blockchain network ID
   */
  chainId: number
  /**
   * Array of currently saved transactions
   */
  txes: TransactionWithStatus[]
  /**
   * Erase all saved transactions from browser storage
   */
  reset?: () => void
}

export const TxHistory = ({ txes, txComponent: Tx = DefaultTx, chainId, reset, ...props }: TxHistoryProps) => {
  return (
    <Box padding="24" borderRadius="menu" background="menuBackground" boxShadow="menu" width="full" {...props}>
      {reset && <button onClick={() => reset()}>Clear transactions</button>}
      {txes?.map((tx) => (
        <Tx key={tx.hash} {...tx} chainId={chainId} />
      ))}
      <Box
        width="full"
        as="button"
        color="menuTextAction"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box as="span" fontWeight="bold" fontSize="16">
          View Full History
        </Box>
        <ViewHistoryIcon />
      </Box>
    </Box>
  )
}
