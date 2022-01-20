import React from 'react';
import { TransactionWithStatus } from '../../hooks/useTxHistory';
import { Box, BoxProps } from '../Box/Box';
import { Tx as DefaultTx, TxProps } from '../Tx/Tx';
import { ViewHistoryIcon } from './icons';

export interface TxHistoryProps extends Omit<BoxProps, 'reset'> {
  /**
   * Custom `<Tx />` component
   */
  txComponent?: (props: TxProps) => JSX.Element;

  /**
   * Blockchain network ID
   */
  chainId: number;
  /**
   * Array of currently saved transactions
   */
  txes: TransactionWithStatus[];
  /**
   * Erase all saved transactions from browser storage
   */
  reset?: () => void;
}

export const TxHistory = ({
  txes,
  txComponent: Tx = DefaultTx,
  chainId,
  reset,
  ...props
}: TxHistoryProps) => {
  return (
    <Box
      background="menuBackground"
      borderRadius="menu"
      boxShadow="menu"
      padding="24"
      width="full"
      {...props}
    >
      {reset && (
        <button onClick={() => reset()} type="button">
          Clear transactions
        </button>
      )}
      {txes?.map(tx => (
        <Tx key={tx.hash} {...tx} chainId={chainId} />
      ))}
      <Box
        alignItems="center"
        as="button"
        color="menuTextAction"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="full"
      >
        <Box as="span" fontSize="16" fontWeight="bold">
          View Full History
        </Box>
        <ViewHistoryIcon />
      </Box>
    </Box>
  );
};
