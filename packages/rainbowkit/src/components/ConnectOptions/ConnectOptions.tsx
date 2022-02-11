import React from 'react';
import { Box } from '../Box/Box';
import { useWallets } from '../RainbowKitProvider/useWallets';
import { Text } from '../Text/Text';

export default function ConnectOptions() {
  const wallets = useWallets();
  const titleId = 'rk_connect_title';

  return (
    <Box display="flex" flexDirection="column" gap="24">
      <Text as="h1" color="modalText" id={titleId} size="23">
        Connect Wallet
      </Text>
      <Box display="flex" flexDirection="column" gap="18">
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
                flexDirection="row"
                gap="6"
              >
                <img
                  alt={wallet.name}
                  height="24"
                  src={wallet.iconUrl}
                  width="24"
                />
                <div>
                  {wallet.name}
                  {!wallet.ready && ' (unsupported)'}
                </div>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
