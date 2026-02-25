// biome-ignore lint/style/useImportType: React is used for JSX
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
import { useCancelTransaction } from '../../transactions/useCancelTransaction';
import { useSpeedUpTransaction } from '../../transactions/useSpeedUpTransaction';
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
  const speedUpTransaction = useSpeedUpTransaction();
  const cancelTransaction = useCancelTransaction();
  const [isSpeedingUp, setIsSpeedingUp] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const confirmationStatus =
    tx.status === 'confirmed'
      ? 'Confirmed'
      : tx.status === 'failed'
        ? 'Failed'
        : 'Pending';

  const explorerLink = chainToExplorerUrl(activeChain);

  const canReplace = tx.status === 'pending' && tx.nonce !== undefined;

  const handleSpeedUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActionError(null);
    setIsSpeedingUp(true);
    try {
      await speedUpTransaction(tx);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : 'Failed to speed up transaction',
      );
    } finally {
      setIsSpeedingUp(false);
    }
  };

  const handleCancel = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActionError(null);
    setIsCanceling(true);
    try {
      await cancelTransaction(tx);
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : 'Failed to cancel transaction',
      );
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <>
      <Box
        {...(explorerLink && !canReplace
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
        flexDirection="column"
        padding="8"
        width="full"
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
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
          {explorerLink && !canReplace && (
            <Box alignItems="center" color="modalTextDim" display="flex">
              <ExternalLinkIcon />
            </Box>
          )}
        </Box>
        {canReplace && (
          <Box
            display="flex"
            flexDirection="row"
            gap="8"
            marginTop="8"
            paddingLeft={mobile ? '44' : '44'}
          >
            <Box
              as="button"
              background={{ hover: 'accentColor' }}
              borderRadius="actionButton"
              className={touchableStyles({ active: 'shrink' })}
              disabled={isSpeedingUp || isCanceling}
              onClick={handleSpeedUp}
              paddingX="12"
              paddingY="6"
              style={{
                cursor: isSpeedingUp || isCanceling ? 'not-allowed' : 'pointer',
              }}
              transition="default"
              type="button"
            >
              <Text color="accentColorForeground" size="13" weight="semibold">
                {isSpeedingUp ? 'Speeding up...' : 'Speed Up'}
              </Text>
            </Box>
            <Box
              as="button"
              background={{ hover: 'closeButtonBackground' }}
              borderRadius="actionButton"
              className={touchableStyles({ active: 'shrink' })}
              disabled={isSpeedingUp || isCanceling}
              onClick={handleCancel}
              paddingX="12"
              paddingY="6"
              style={{
                cursor: isSpeedingUp || isCanceling ? 'not-allowed' : 'pointer',
              }}
              transition="default"
              type="button"
            >
              <Text color="error" size="13" weight="semibold">
                {isCanceling ? 'Canceling...' : 'Cancel'}
              </Text>
            </Box>
            {explorerLink && (
              <Box
                alignItems="center"
                as="a"
                background={{ hover: 'profileForeground' }}
                borderRadius="actionButton"
                className={touchableStyles({ active: 'shrink' })}
                color="modalTextDim"
                display="flex"
                href={`${explorerLink}/tx/${tx.hash}`}
                paddingX="8"
                paddingY="6"
                rel="noreferrer noopener"
                target="_blank"
                transition="default"
              >
                <ExternalLinkIcon />
              </Box>
            )}
          </Box>
        )}
        {actionError && (
          <Box marginTop="8" paddingLeft={mobile ? '44' : '44'}>
            <Text color="error" size="12" weight="medium">
              {actionError}
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
}
