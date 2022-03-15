import React from 'react';
import { useNetwork } from 'wagmi';
import {
  FAIL_TX_STATUS,
  PENDING_TX_STATUS,
  SUCCESS_TX_STATUS,
  TransactionWithInfo,
} from '../../hooks/useTxHistory';
import { chainIdToExplorerLink } from '../../utils/chainIdToExplorerLink';
import { Box } from '../Box/Box';
import { CancelIcon } from '../Icons/Cancel';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { SpinnerIcon } from '../Icons/Spinner';
import { SuccessIcon } from '../Icons/Success';

import { Text } from '../Text/Text';

const getTxStatusIcon = (status: string) => {
  switch (status) {
    case PENDING_TX_STATUS:
      return SpinnerIcon;
    case SUCCESS_TX_STATUS:
      return SuccessIcon;
    case FAIL_TX_STATUS:
      return CancelIcon;
    default:
      return SpinnerIcon;
  }
};

interface TxProps {
  tx: TransactionWithInfo;
}

export function TxItem({ tx }: TxProps) {
  const Icon = getTxStatusIcon(tx.status);
  const color = tx.status === FAIL_TX_STATUS ? 'error' : 'accentColor';
  const [{ data: networkData }] = useNetwork();

  const confirmationStatus =
    tx.status === SUCCESS_TX_STATUS
      ? 'Completed'
      : tx.status === FAIL_TX_STATUS
      ? 'Failed'
      : 'Pending';
  return (
    <Box
      as="a"
      background={{ hover: 'profileForeground' }}
      borderRadius="menuButton"
      color="menuText"
      display="flex"
      flexDirection="row"
      href={`${chainIdToExplorerLink(networkData?.chain?.id)}tx/${tx.hash}`}
      justifyContent="space-between"
      padding="8"
      rel="noreferrer"
      target="_blank"
      transform={{ active: 'shrink', hover: 'grow' }}
      transition="default"
    >
      <Box alignItems="center" display="flex" flexDirection="row" gap="14">
        <Box color={color}>
          <Icon />
        </Box>
        <Box display="flex" flexDirection="column" gap="2">
          <Box>
            <Text color="modalText" font="body" size="14" weight="bold">
              {tx?.info}
            </Text>
          </Box>
          <Box>
            <Text
              color={
                tx.status === PENDING_TX_STATUS ? 'modalTextSecondary' : color
              }
              font="body"
              size="14"
              weight="regular"
            >
              {confirmationStatus}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box alignItems="center" color="modalTextSecondary" display="flex">
        <ExternalLinkIcon />
      </Box>
    </Box>
  );
}
