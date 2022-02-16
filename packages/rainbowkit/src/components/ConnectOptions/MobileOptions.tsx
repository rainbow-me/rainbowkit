import React from 'react';
import { Box } from '../Box/Box';

import { Text } from '../Text/Text';

export function MobileOptions() {
  const titleId = 'rk_connect_title';
  return (
    <Box>
      <Text as="h1" color="modalText" id={titleId} size="23">
        Connect Mobile Wallets
      </Text>
      {/* Add mobile wallets here */}
    </Box>
  );
}
