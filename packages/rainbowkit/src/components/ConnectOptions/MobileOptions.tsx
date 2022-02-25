import React from 'react';
import { Box } from '../Box/Box';
import {
  useWalletConnectors,
  WalletConnector,
} from '../RainbowKitProvider/useWalletConnectors';
import { Text } from '../Text/Text';

function WalletButton({ wallet }: { wallet: WalletConnector }) {
  const button = wallet.useMobileWalletButton();

  return (
    <Box
      {...(button.type === 'link'
        ? {
            as: 'a',
            href: button.url,
            style: !button.url ? { opacity: 0.5 } : undefined,
          }
        : {
            as: 'button',
            disabled: !wallet.ready,
            onClick: wallet.connect,
            type: 'button',
          })}
      color={wallet.ready ? 'modalText' : 'modalTextSecondary'}
      fontFamily="body"
      key={wallet.id}
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
}

export function MobileOptions() {
  const titleId = 'rk_connect_title';
  const wallets = useWalletConnectors();

  return (
    <Box>
      <Box display="flex" justifyContent="center" paddingBottom="12">
        <Text as="h1" color="modalText" id={titleId} size="20" weight="bold">
          Connect a Wallet
        </Text>
      </Box>

      <Box display="flex" gap="36">
        {wallets.map(wallet => {
          return <WalletButton key={wallet.id} wallet={wallet} />;
        })}
      </Box>
    </Box>
  );
}
