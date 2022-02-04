import React from 'react';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

interface ProfileDetailsActionProps {
  //   accountName: string | null;
  //   balance: string | null;
  //   disconnect: () => void;
  label: string;
  action: () => void;
  icon: JSX.Element;
}

export function ProfileDetailsAction({
  action,
  icon,
  label,
}: ProfileDetailsActionProps) {
  return (
    <Box
      as="button"
      display="flex"
      flexDirection="row"
      gap="4"
      justifyContent="space-between"
      onClick={action}
      paddingY="8"
    >
      {/* text */}
      <Box>
        <Text color="modalText" size="18" weight="bold">
          {label}
        </Text>
      </Box>
      <Box>{icon}</Box>
    </Box>
  );
}
