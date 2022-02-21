import React from 'react';
import { Box } from '../Box/Box';
import { useWallets } from '../RainbowKitProvider/useWallets';
import { Text } from '../Text/Text';

export function MobileOptions() {
  const titleId = 'rk_connect_title';
  const wallets = useWallets();

  return (
    <Box>
      <Box display="flex" justifyContent="center" paddingBottom="12">
        <Text as="h1" color="modalText" id={titleId} size="20" weight="bold">
          Connect a Wallet
        </Text>
      </Box>

      <Box display="flex" gap="36">
        {wallets.map(wallet => {
          return (
            <Box
              as="button"
              color={wallet.ready ? 'modalText' : 'modalTextSecondary'}
              disabled={!wallet.ready}
              fontFamily="body"
              key={wallet.id}
              onClick={wallet.connect}
              type="button"
            >
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Box
                  alt={wallet.name}
                  as="img"
                  borderRadius="10"
                  display="block"
                  height="60"
                  marginBottom="12"
                  src={wallet.iconUrl}
                  width="60"
                />
                <Text as="h2" color="modalText" size="13">
                  {wallet.name}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
