import React from 'react';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
export function Button({
  label,
  onClick,
  type = 'primary',
}: {
  label: string;
  type?: 'primary' | 'secondary';
  onClick: () => void;
}) {
  const isPrimary = type === 'primary';
  return (
    <Box
      as="button"
      background={isPrimary ? 'accentColor' : 'buttonSecondaryBackground'}
      borderColor="buttonBorder"
      borderRadius="full"
      borderStyle="solid"
      borderWidth="1"
      onClick={onClick}
      paddingX="12"
      paddingY="4"
      transform={{ active: 'shrink', hover: 'grow' }}
      transition="default"
    >
      <Text
        color={isPrimary ? 'buttonText' : 'accentColor'}
        size="16"
        weight="bold"
      >
        {label}
      </Text>
    </Box>
  );
}
