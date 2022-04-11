import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { ExternalLinkIcon } from '../Icons/ExternalLink';

import { Text } from '../Text/Text';
import { TxItem } from './TxItem';

const NUMBER_OF_VISIBLE_TXS = 3;

interface TxListProps {
  accountData: ReturnType<typeof useAccount>[0]['data'];
}

export function TxList({ accountData }: TxListProps) {
  const recentTransactions = useRecentTransactions();
  const [{ data: networkData }] = useNetwork();
  const chain = networkData?.chain;
  const address = accountData?.address;
  const explorerLink = chainToExplorerUrl(chain);
  const visibleTxs = recentTransactions.slice(0, NUMBER_OF_VISIBLE_TXS);
  const hasTransactions = visibleTxs.length > 0;
  const mobile = isMobile();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="10"
        paddingBottom="4"
        paddingTop="16"
        paddingX={mobile ? '8' : '18'}
      >
        {hasTransactions && (
          <Box
            paddingBottom={mobile ? '4' : '0'}
            paddingTop={mobile ? '0' : '8'}
            paddingX={mobile ? '12' : '6'}
          >
            <Text
              color="modalTextSecondary"
              size={mobile ? '16' : '14'}
              weight="semibold"
            >
              Recent Transactions
            </Text>
          </Box>
        )}
        <Box display="flex" flexDirection="column" gap="4">
          {hasTransactions ? (
            visibleTxs.map(tx => <TxItem key={tx.hash} tx={tx} />)
          ) : (
            <>
              <Box padding={mobile ? '12' : '8'}>
                <Text
                  color="modalTextDim"
                  size={mobile ? '16' : '14'}
                  weight={mobile ? 'medium' : 'bold'}
                >
                  Your transactions will appear here...
                </Text>
              </Box>
              {mobile && (
                <Box
                  background="generalBorderDim"
                  height="1"
                  marginX="12"
                  marginY="8"
                />
              )}
            </>
          )}
        </Box>
      </Box>
      {explorerLink && (
        <Box paddingBottom="18" paddingX={mobile ? '8' : '18'}>
          <Box
            alignItems="center"
            as="a"
            background={{ hover: 'profileForeground' }}
            borderRadius="menuButton"
            color="modalTextDim"
            display="flex"
            flexDirection="row"
            href={`${explorerLink}/address/${address}`}
            justifyContent="space-between"
            paddingX="8"
            paddingY="12"
            rel="noreferrer"
            style={{ willChange: 'transform' }}
            target="_blank"
            transform={{
              active: 'shrink',
              hover: 'grow',
            }}
            transition="default"
            {...(mobile ? { paddingLeft: '12' } : {})}
          >
            <Text
              color="modalText"
              font="body"
              size={mobile ? '16' : '14'}
              weight={mobile ? 'semibold' : 'bold'}
            >
              View more on Explorer
            </Text>
            <ExternalLinkIcon />
          </Box>
        </Box>
      )}
    </>
  );
}
