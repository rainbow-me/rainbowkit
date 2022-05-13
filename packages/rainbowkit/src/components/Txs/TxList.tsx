import React, { useContext } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { useClearRecentTransactions } from '../../transactions/useClearRecentTransactions';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { AppContext } from '../RainbowKitProvider/AppContext';

import { Text } from '../Text/Text';
import { TxItem } from './TxItem';

const NUMBER_OF_VISIBLE_TXS = 3;

interface TxListProps {
  accountData: ReturnType<typeof useAccount>['data'];
}

export function TxList({ accountData }: TxListProps) {
  const recentTransactions = useRecentTransactions();
  const clearRecentTransactions = useClearRecentTransactions();
  const { activeChain } = useNetwork();
  const address = accountData?.address;
  const explorerLink = chainToExplorerUrl(activeChain);
  const visibleTxs = recentTransactions.slice(0, NUMBER_OF_VISIBLE_TXS);
  const hasTransactions = visibleTxs.length > 0;
  const mobile = isMobile();
  const { appName } = useContext(AppContext);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="10"
        paddingBottom="2"
        paddingTop="16"
        paddingX={mobile ? '8' : '18'}
      >
        {hasTransactions && (
          <Box
            paddingBottom={mobile ? '4' : '0'}
            paddingTop={mobile ? '0' : '8'}
            paddingX={mobile ? '12' : '6'}
          >
            <Box display="flex" justifyContent="space-between">
              <Text
                color="modalTextSecondary"
                size={mobile ? '16' : '14'}
                weight="semibold"
              >
                Recent Transactions
              </Text>
              <Box
                style={{
                  marginBottom: -6,
                  marginLeft: -10,
                  marginRight: -10,
                  marginTop: -6,
                }}
              >
                <Box
                  as="button"
                  borderRadius="actionButton"
                  className={increaseHitAreaForHoverTransform.grow}
                  display="flex"
                  onClick={clearRecentTransactions}
                  type="button"
                >
                  <Box
                    background={{
                      hover: 'profileForeground',
                    }}
                    borderRadius="actionButton"
                    padding="6"
                    paddingX="10"
                    transform={{
                      active: 'shrink',
                      hover: 'grow',
                    }}
                    transition="default"
                  >
                    <Text
                      color="modalTextSecondary"
                      size={mobile ? '16' : '14'}
                      weight="semibold"
                    >
                      Clear All
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
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
                  {appName ?? 'Your'} transactions will appear here...
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
            as="a"
            borderRadius="menuButton"
            className={increaseHitAreaForHoverTransform.grow}
            display="flex"
            href={`${explorerLink}/address/${address}`}
            rel="noreferrer"
            target="_blank"
          >
            <Box
              alignItems="center"
              background={{ hover: 'profileForeground' }}
              borderRadius="menuButton"
              color="modalTextDim"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              paddingX="8"
              paddingY="12"
              style={{ willChange: 'transform' }}
              transform={{
                active: 'shrink',
                hover: 'grow',
              }}
              transition="default"
              width="full"
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
        </Box>
      )}
    </>
  );
}
