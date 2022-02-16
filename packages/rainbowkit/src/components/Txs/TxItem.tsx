import React from 'react';
import { Box } from '../Box/Box';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { Spinner } from '../Icons/Spinner';

import { Text } from '../Text/Text';
import { ExternalLinkClassName } from './Txs.css';

export type Tx = {
  from: string;
  hash: string;
  status: 'pending' | 'success' | 'cancel' | 'fail';
  to: string;
  value: number;
};

interface TxProps {
  tx: Tx;
}

export function TxItem({ tx }: TxProps) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      paddingY="4"
    >
      {/* left-aligned piece */}
      <Box display="flex" flexDirection="row" gap="8">
        {/* spinner */}
        <Box>
          <Spinner />
        </Box>
        {/* title and subtitle */}
        <Box display="flex" flexDirection="column" gap="4">
          <Box>
            <Text color="modalText" font="body" size="16" weight="bold">
              Swap {tx.value} ETH for 123.43 DAI
            </Text>
          </Box>
          <Box>
            <Text color="modalText" font="body" size="14" weight="bold">
              About 1min to confirm
            </Text>
          </Box>
        </Box>
      </Box>
      {/* right-aligned piece */}
      <Box className={ExternalLinkClassName} height="20" width="20">
        <ExternalLinkIcon />
      </Box>
    </Box>
  );
}
