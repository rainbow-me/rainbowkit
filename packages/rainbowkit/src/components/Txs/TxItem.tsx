import React from 'react';
import { useNetwork } from 'wagmi';
import {
  FAIL_TX_STATUS,
  PENDING_TX_STATUS,
  SUCCESS_TX_STATUS,
  TransactionWithInfo,
} from '../../hooks/useTxHistory';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
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
  const mobile = isMobile();
  const Icon = getTxStatusIcon(tx.status);
  const color = tx.status === FAIL_TX_STATUS ? 'error' : 'accentColor';
  const [{ data: networkData }] = useNetwork();

  const confirmationStatus =
    tx.status === SUCCESS_TX_STATUS
      ? 'Completed'
      : tx.status === FAIL_TX_STATUS
      ? 'Failed'
      : 'Pending';

  const explorerLink = chainToExplorerUrl(networkData?.chain);

  return (
    <>
      <Box
        {...(explorerLink
          ? {
              as: 'a',
              background: { hover: 'profileForeground' },
              borderRadius: 'menuButton',
              href: `${explorerLink}/tx/${tx.hash}`,
              rel: 'noreferrer',
              target: '_blank',
              transform: { active: 'shrink', hover: 'grow' },
              transition: 'default',
            }
          : {})}
        color="modalText"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="8"
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          gap={mobile ? '16' : '14'}
        >
          <Box color={color}>
            <Icon />
          </Box>
          <Box display="flex" flexDirection="column" gap={mobile ? '4' : '2'}>
            <Box>
              <Text
                color="modalText"
                font="body"
                size={mobile ? '16' : '14'}
                weight="bold"
              >
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
                weight={mobile ? 'medium' : 'regular'}
              >
                {confirmationStatus}
              </Text>
            </Box>
          </Box>
        </Box>
        {explorerLink && (
          <Box alignItems="center" color="modalTextDim" display="flex">
            <ExternalLinkIcon />
          </Box>
        )}
      </Box>
      {mobile && (
        <Box
          background="generalBorderDim"
          height="1"
          marginLeft="44"
          marginRight="8"
          marginY="2"
        />
      )}
    </>
  );
}
