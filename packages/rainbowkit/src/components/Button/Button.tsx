import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { Text } from '../Text/Text';

type Size = 'small' | 'medium' | 'large';

const sizeVariants: Record<
  Size,
  {
    paddingX: BoxProps['paddingX'];
    paddingY: BoxProps['paddingY'];
  }
> = {
  large: {
    paddingX: '18',
    paddingY: '12',
  },
  medium: {
    paddingX: '12',
    paddingY: '4',
  },
  small: {
    paddingX: '10',
    paddingY: '4',
  },
};

export function Button({
  href,
  label,
  onClick,
  size = 'medium',
  type = 'primary',
}: {
  href?: string;
  label: string;
  onClick?: () => void;
  size?: Size;
  type?: 'primary' | 'secondary';
}) {
  const isPrimary = type === 'primary';
  const { paddingX, paddingY } = sizeVariants[size];
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
      paddingX={paddingX}
      paddingY={paddingY}
      style={{ willChange: 'transform' }}
      transform={{ active: 'shrinkSm', hover: 'grow' }}
      transition="default"
    >
      <Text
        color={isPrimary ? 'buttonText' : 'accentColor'}
        size="14"
        weight="bold"
      >
        {label}
      </Text>
    </Box>
  );
}
