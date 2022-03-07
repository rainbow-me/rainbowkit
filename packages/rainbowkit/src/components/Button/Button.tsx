import React from 'react';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
export function Button({
  href,
  label,
  onClick,
  type = 'primary',
}: {
  href?: string;
  label: string;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
}) {
  const isPrimary = type === 'primary';
  return (
    <Box
      {...(href
        ? { as: 'a', href, rel: 'noreferrer noopener', target: '_blank' }
        : { as: 'button', type: 'button' })}
      background={isPrimary ? 'accentColor' : 'buttonSecondaryBackground'}
      borderColor="buttonBorder"
      borderRadius="full"
      borderStyle="solid"
      borderWidth="1"
      display="block"
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
