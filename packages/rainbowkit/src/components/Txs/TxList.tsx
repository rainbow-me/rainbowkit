import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { TransactionWithInfo } from '../../hooks/useTxHistory';
// import { useTxHistory } from '../../hooks/useTxHistory';
import { chainIdToExplorerLink } from '../../utils/chainIdToExplorerLink';
import { Box } from '../Box/Box';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { MenuButton } from '../MenuButton/MenuButton';

import { Text } from '../Text/Text';
import { TxItem } from './TxItem';

const NUMBER_OF_VISIBLE_TXS = 3;

const txs: TransactionWithInfo[] = [
  {
    from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074231',
    info: 'Swap 2 ETH for 7000 DAI',
    status: 'pending',
    to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    value: 32,
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
    data: '0x',
    from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    hash: '0x0dce30c7f31bcb3bf45b4ead6e0389b25b75d2be78264eeeea948323c414c2c7',
    info: 'Mint',
    status: 'success',
    to: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
    value: 0.03,
  },
  {
    from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    hash: '0x06c9d030c00d78caf7131f128392df9255607aef31b5555f1744fe963814dabd',
    info: 'Remove Liquidity',
    status: 'success',
    to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    value: 2.5,
  },
];

interface TxListProps {
  accountData: ReturnType<typeof useAccount>[0]['data'];
}

export function TxList({ accountData }: TxListProps) {
  // const transactionHistory = useTxHistory({});
  const showMore = txs && txs.length > 2;
  const [{ data: networkData }] = useNetwork();
  const explorerUrl = `${chainIdToExplorerLink(networkData?.chain?.id)}${
    accountData?.address
  }`;
  const visibleTxs = txs.slice(0, NUMBER_OF_VISIBLE_TXS);
  return (
    <>
      <Box display="flex" flexDirection="column" gap="12" padding="14">
        <Text color="modalText" size="20" weight="heavy">
          Recent Transactions
        </Text>
        <Box display="flex" flexDirection="column" gap="14">
          {txs ? (
            visibleTxs.map(tx => <TxItem key={tx.hash} tx={tx} />)
          ) : (
            <Text color="modalText" size="16" weight="medium">
              Your transactions will appear here.
            </Text>
          )}
        </Box>
      </Box>
      {showMore && (
        <>
          <Box
            background="menuDivider"
            borderRadius="6"
            height="2"
            marginBottom="8"
            marginX="8"
          />
          <MenuButton>
            <Box
              as="a"
              display="flex"
              flexDirection="row"
              href={explorerUrl}
              justifyContent="space-between"
              rel="noreferrer"
              target="_blank"
            >
              <Text color="menuText" font="body" weight="bold">
                View All
              </Text>
              <Box color="modalText" height="20">
                <ExternalLinkIcon />
              </Box>
            </Box>
          </MenuButton>
        </>
      )}
    </>
  );
}
