import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { MenuButton } from '../MenuButton/MenuButton';
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
    <MenuButton as={url ? 'a' : 'button'} onClick={action} {...urlProps}>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box>
          <Text color={color} size="18" weight="bold">
            {label}
          </Text>
        </Box>
        <Box color={color} height="max">
          {icon}
        </Box>
      </Box>
    </MenuButton>
  );
}
