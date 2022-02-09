import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { Text } from '../Text/Text';

interface ProfileDetailsActionProps {
  label: string;
  action?: () => void;
  icon: JSX.Element;
  color: BoxProps['color'];
  url?: string;
}

export function ProfileDetailsAction({
  action,
  color,
  icon,
  label,
  url,
}: ProfileDetailsActionProps) {
  const urlProps = url
    ? {
        href: url,
        rel: 'noreferrer',
        target: '_blank',
      }
    : {};
  return (
    <Box
      as={url ? 'a' : 'button'}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      onClick={action}
      paddingY="16"
      {...urlProps}
    >
      <Box>
        <Text color={color} size="18" weight="bold">
          {label}
        </Text>
      </Box>
      <Box color={color}>{icon}</Box>
    </Box>
  );
}
