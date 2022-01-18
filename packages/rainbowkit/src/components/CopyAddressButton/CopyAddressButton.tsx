import React, { useState } from 'react';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { CopyIcon } from './Icons';

export const CopyAddressButton = ({ address }: { address: string }) => {
  const [copied, set] = useState(false);

  return (
    <Box
      alignItems="center"
      as="button"
      color="menuTextAction"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      onClick={() => {
        navigator.clipboard.writeText(address).then(() => set(true));
      }}
      width="full"
    >
      <Text color="menuTextAction" size="14" weight="bold">
        {copied ? 'Copied' : 'Copy Address'}
      </Text>
      <Box
        alignItems="center"
        display="flex"
        height="20"
        justifyContent="center"
        width="20"
      >
        <CopyIcon />
      </Box>
    </Box>
  );
};
