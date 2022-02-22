import React from 'react';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
export function Button({ label }: { label: string }) {
  return (
    <Box
      as="button"
      background="menuTextAction"
      borderRadius="full"
      paddingX="12"
      paddingY="6"
      transform={{ active: 'shrink', hover: 'grow' }}
      transition="default"
    >
      <Text color="buttonText" size="16" weight="bold">
        {label}
      </Text>
    </Box>
  );
}
