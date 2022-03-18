import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { TransactionsMap, useTxHistory } from '../../hooks/useTxHistory';
import { chainIdToExplorerLink } from '../../utils/chainIdToExplorerLink';
import { Box } from '../Box/Box';
import { ExternalLinkIcon } from '../Icons/ExternalLink';

import { Text } from '../Text/Text';
import { TxItem } from './TxItem';

const NUMBER_OF_VISIBLE_TXS = 3;

// dummy data for testing purposes only.
// you can see dummy transactions by connecting to rainbowwallet.eth
// (you can do so in read-only mode in rainbow)
const initialTxs: TransactionsMap = {
  '0x7a3d05c70581bD345fe117c06e45f9669205384f': {
    1: [
      {
        from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
        hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074231',
        info: 'Swap 400 UNI for 7,001.26 USDC',
        status: 'pending',
        to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
        value: 32,
      },
      {
        data: '0x',
        from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
        hash: '0x0dce30c7f31bcb3bf45b4ead6e0389b25b75d2be78264eeeea948323c414c2c7',
        info: 'Mint',
        status: 'success',
        to: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
        value: 0.03,
      },
      {
        from: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
        hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074440',
        info: 'Deposit 200 DAI into Vault',
        status: 'fail',
        to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
        value: 45,
      },
      {
        from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
        hash: '0x06c9d030c00d78caf7131f128392df9255607aef31b5555f1744fe963814dabd',
        info: 'Remove Liquidity',
        status: 'success',
        to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
        value: 2.5,
      },
    ],
  },
};

interface TxListProps {
  accountData: ReturnType<typeof useAccount>[0]['data'];
}

export function TxList({ accountData }: TxListProps) {
  const { txs } = useTxHistory({ initialTxs });
  const [{ data: networkData }] = useNetwork();
  const chainId = networkData?.chain?.id;
  const address = accountData?.address;
  const explorerLink = chainIdToExplorerLink(chainId);
  const visibleTxs = txs?.slice(0, NUMBER_OF_VISIBLE_TXS);
  const hasTransactions = visibleTxs?.length > 0;

  return (
    <Box display="flex" flexDirection="column" gap="4" padding="18">
      <Box display="flex" flexDirection="column" gap="10">
        {hasTransactions && (
          <Box paddingX="6">
            <Text color="modalTextSecondary" size="14" weight="semibold">
              Recent Transactions
            </Text>
          </Box>
        )}
        <Box display="flex" flexDirection="column" gap="4">
          {hasTransactions ? (
            visibleTxs.map(tx => <TxItem key={tx.hash} tx={tx} />)
          ) : (
            <Box paddingBottom="8" paddingTop="6" paddingX="8">
              <Text color="modalTextDim" size="14" weight="bold">
                Your transactions will appear here...
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      {explorerLink && (
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
        >
          <Text color="modalText" font="body" size="14" weight="bold">
            View more on Explorer
          </Text>
          <ExternalLinkIcon />
        </Box>
      )}
    </Box>
  );
}
