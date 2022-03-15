import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { Text, TextProps } from '../Text/Text';

type Size = 'small' | 'medium' | 'large';

const sizeVariants: Record<
  Size,
  {
    paddingX: BoxProps['paddingX'];
    paddingY: BoxProps['paddingY'];
    fontSize: TextProps['size'];
    height?: BoxProps['height'];
  }
> = {
  large: {
    fontSize: '16',
    paddingX: '24',
    paddingY: '10',
  },
  medium: {
    fontSize: '14',
    height: '28',
    paddingX: '12',
    paddingY: '4',
  },
  small: {
    fontSize: '14',
    paddingX: '10',
    paddingY: '4',
  },
};

export function ActionButton({
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
  const { fontSize, height, paddingX, paddingY } = sizeVariants[size];
  return (
    <Box
      {...(href
        ? { as: 'a', href, rel: 'noreferrer noopener', target: '_blank' }
        : { as: 'button', type: 'button' })}
      background={isPrimary ? 'accentColor' : 'actionButtonSecondaryBackground'}
      borderColor="actionButtonBorder"
      borderRadius="actionButton"
      borderStyle="solid"
      borderWidth="1"
      display="block"
      onClick={onClick}
      paddingX={paddingX}
      paddingY={paddingY}
      style={{ boxSizing: 'border-box', willChange: 'transform' }}
      transform={{ active: 'shrinkSm', hover: 'grow' }}
      transition="default"
      {...(height ? { height } : {})}
    >
      <Text
        color={isPrimary ? 'actionButtonText' : 'accentColor'}
        size={fontSize}
        weight="bold"
      >
        {label}
      </Text>
    </Box>
  );
}
