import React from 'react';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
export function Button({
  href,
  label,
  uppercase,
}: {
  label: string;
  href?: string;
  uppercase?: boolean;
}) {
  return (
    <Box
      {...(href
        ? { as: 'a', href, rel: 'noopener noreferrer', target: '_blank' }
        : { as: 'button', type: 'button' })}
      background="accentColor"
      borderRadius="full"
      paddingX="12"
      paddingY="6"
      transform={{ active: 'shrink', hover: 'grow' }}
      transition="default"
    >
      <Text color="buttonText" size="16" uppercase={uppercase} weight="bold">
        {label}
      </Text>
    </Box>
  );
}
