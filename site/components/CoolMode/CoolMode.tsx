import { Box } from 'components/Box/Box';
import { Text } from 'components/Text/Text';
import { vars } from 'css/vars.css';
import { useCoolMode } from 'lib/useCoolMode';
import React from 'react';

export function CoolMode() {
  const coolModeRef = useCoolMode('https://ped.ro/rainbow.png');
  return (
    <Box
      backgroundColor="pink"
      borderColor="fillElevated"
      borderRadius="5"
      borderWidth="1"
      ref={coolModeRef}
      style={{
        alignItems: 'center',
        backgroundImage: `linear-gradient(270deg, ${vars.colors.red50}, ${vars.colors.pink60})`,
        display: 'flex',
        height: '300px',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <Text color="white100" variant="title2" weight="bold">
        Hit me
      </Text>
    </Box>
  );
}
