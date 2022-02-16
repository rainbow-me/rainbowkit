import React from 'react';
import { Box } from '../Box/Box';

import { Text } from '../Text/Text';
import { Tx, TxItem } from './TxItem';

const txs: Tx[] = [
  {
    from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074231',
    status: 'pending',
    to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    value: 32,
  },
  {
    from: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
    hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074440',
    status: 'fail',
    to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    value: 45,
  },
  {
    // data: '0x',
    from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    hash: '0x0dce30c7f31bcb3bf45b4ead6e0389b25b75d2be78264eeeea948323c414c2c7',
    status: 'success',
    to: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
    value: 0.03,
  },
  {
    from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    hash: '0x06c9d030c00d78caf7131f128392df9255607aef31b5555f1744fe963814dabd',
    status: 'success',
    to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
    value: 2.5,
  },
];

export function TxList() {
  return (
    <Box display="flex" flexDirection="column" gap="12" padding="18">
      <Text color="modalText" size="20" weight="heavy">
        Transactions
      </Text>
      <Box display="flex" flexDirection="column" gap="14">
        {txs ? (
          txs.map(tx => <TxItem key={tx.hash} tx={tx} />)
        ) : (
          <Text color="modalText" size="16" weight="medium">
            Your transactions will appear here.
          </Text>
        )}
      </Box>
    </Box>
  );
}
