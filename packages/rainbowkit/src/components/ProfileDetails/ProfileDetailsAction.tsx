import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { Text } from '../Text/Text';

interface ProfileDetailsActionProps {
  label: string;
  action: () => void;
  icon: JSX.Element;
  color: BoxProps['color'];
}

export function ProfileDetailsAction({
  action,
  color,
  icon,
  label,
}: ProfileDetailsActionProps) {
  return (
    <Box
      as="button"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      onClick={action}
      paddingY="16"
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
