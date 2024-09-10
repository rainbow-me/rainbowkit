import React from 'react';
import { useAccount } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
import type { Transaction } from '../../transactions/transactionStore';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CancelIcon } from '../Icons/Cancel';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { SpinnerIcon } from '../Icons/Spinner';
import { SuccessIcon } from '../Icons/Success';
import { Text } from '../Text/Text';

const getTxStatusIcon = (status: Transaction['status']) => {
  switch (status) {
    case 'pending':
      return SpinnerIcon;
    case 'confirmed':
      return SuccessIcon;
    case 'failed':
      return CancelIcon;
    default:
      return SpinnerIcon;
  }
};

interface TxProps {
  tx: Transaction;
}

export function TxItem({ tx }: TxProps) {
  const mobile = isMobile();
  const Icon = getTxStatusIcon(tx.status);
  const color = tx.status === 'failed' ? 'error' : 'accentColor';
  const { chain: activeChain } = useAccount();

  const confirmationStatus =
    tx.status === 'confirmed'
      ? 'Confirmed'
      : tx.status === 'failed'
        ? 'Failed'
        : 'Pending';

  const explorerLink = chainToExplorerUrl(activeChain);

  return (
    <>
      <Box
        {...(explorerLink
          ? {
              as: 'a',
              background: { hover: 'profileForeground' },
              borderRadius: 'menuButton',
              className: touchableStyles({ active: 'shrink' }),
              href: `${explorerLink}/tx/${tx.hash}`,
              rel: 'noreferrer noopener',
              target: '_blank',
              transition: 'default',
            }
          : {})}
        color="modalText"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="8"
        width="full"
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
          <Box display="flex" flexDirection="column" gap={mobile ? '3' : '1'}>
            <Box>
              <Text
                color="modalText"
                font="body"
                size={mobile ? '16' : '14'}
                weight="bold"
              >
                {tx?.description}
              </Text>
            </Box>
            <Box>
              <Text
                color={tx.status === 'pending' ? 'modalTextSecondary' : color}
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
    </>
  );
}
