import React from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { LoginIcon } from '../Icons/Login';
import { Text } from '../Text/Text';

export function ConnectModalIntro() {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="16"
      justifyContent="center"
    >
      <LoginIcon />
      <Text color="modalText" size="18" weight="bold">
        A New Way to Log In
      </Text>
      <Text color="modalTextSecondary" size="16">
        Instead of a creating a new username and password on every site, you can
        use a wallet to log in instantly
      </Text>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="16"
        justifyContent="center"
        marginTop="16"
      >
        <Button label="Get a Wallet" />
        <Text color="menuTextAction" weight="bold">
          Learn More
        </Text>
      </Box>
    </Box>
  );
}
