import React from 'react';
import { Box } from '../Box/Box';

import { Text } from '../Text/Text';

export function TxList() {
  return (
    <Box display="flex" flexDirection="column" gap="12" padding="14">
      <Text color="modalText" size="20" weight="heavy">
        Transactions
      </Text>
      <Text color="modalText" size="16" weight="medium">
        Your transactions will appear here.
      </Text>
    </Box>
  );
}
