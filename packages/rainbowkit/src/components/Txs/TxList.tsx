import React, { useContext } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
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
  address: ReturnType<typeof useAccount>['address'];
}

export function TxList({ address }: TxListProps) {
  const recentTransactions = useRecentTransactions();
  const clearRecentTransactions = useClearRecentTransactions();
  const { chain: activeChain } = useNetwork();
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
            paddingTop="8"
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
                  background={{
                    hover: 'profileForeground',
                  }}
                  borderRadius="actionButton"
                  className={touchableStyles({ active: 'shrink' })}
                  onClick={clearRecentTransactions}
                  paddingX={mobile ? '8' : '12'}
                  paddingY={mobile ? '4' : '5'}
                  transition="default"
                  type="button"
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
            alignItems="center"
            as="a"
            background={{ hover: 'profileForeground' }}
            borderRadius="menuButton"
            className={touchableStyles({ active: 'shrink' })}
            color="modalTextDim"
            display="flex"
            flexDirection="row"
            href={`${explorerLink}/address/${address}`}
            justifyContent="space-between"
            paddingX="8"
            paddingY="12"
            rel="noreferrer noopener"
            style={{ willChange: 'transform' }}
            target="_blank"
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
      )}
    </>
  );
}
