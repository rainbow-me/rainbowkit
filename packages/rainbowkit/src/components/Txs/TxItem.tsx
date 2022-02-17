import React from 'react';
import { useNetwork } from 'wagmi';
import { chainIdToExplorerLink } from '../../utils/chainIdToExplorerLink';
import { Box } from '../Box/Box';
import { DisconnectIcon } from '../Icons/Disconnect';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { SpinnerIcon } from '../Icons/Spinner';
import { SuccessIcon } from '../Icons/Success';

import { Text } from '../Text/Text';

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';

export type Tx = {
  data: string | null;
  from: string;
  hash: string;
  info: string;
  status: string;
  to: string;
  value: number;
  secsToConfirmationEstimate: number;
};

const getTxStatusIcon = (status: string) => {
  switch (status) {
    case PENDING:
      return SpinnerIcon;
    case SUCCESS:
      return SuccessIcon;
    case FAIL:
      return DisconnectIcon;
    default:
      return SpinnerIcon;
  }
};

interface TxProps {
  tx: Tx;
}

export function TxItem({ tx }: TxProps) {
  const Icon = getTxStatusIcon(tx.status);
  const iconColor =
    tx.status === FAIL
      ? 'error'
      : tx.status === SUCCESS
      ? 'connectionIndicator'
      : 'menuTextAction';
  const [{ data: networkData }] = useNetwork();

  const confirmationStatus =
    tx.status === SUCCESS
      ? 'Completed'
      : tx.status === FAIL
      ? 'Failed'
      : `About ${tx?.secsToConfirmationEstimate} secs to confirm`;
  return (
    <Box
      color="menuText"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      paddingY="4"
    >
      <Box display="flex" flexDirection="row" gap="8">
        <Box color={iconColor}>
          <Icon />
        </Box>
        <Box display="flex" flexDirection="column" gap="4">
          <Box>
            <Text color="modalText" font="body" size="16" weight="bold">
              {tx?.info}
            </Text>
          </Box>
          <Box>
            <Text
              color="modalTextSecondary"
              font="body"
              size="14"
              weight="bold"
            >
              {confirmationStatus}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        as="a"
        color="modalText"
        height="20"
        href={`${chainIdToExplorerLink(networkData?.chain?.id)}tx/${tx.hash}`}
        rel="noreferrer"
        target="_blank"
        transform={{ active: 'shrink', hover: 'growLg' }}
        transition="default"
        width="20"
      >
        <ExternalLinkIcon />
      </Box>
    </Box>
  );
}
