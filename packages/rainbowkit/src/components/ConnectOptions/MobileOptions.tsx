import React from 'react';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import {
  useWalletConnectors,
  WalletConnector,
} from '../RainbowKitProvider/useWalletConnectors';
import { Text } from '../Text/Text';
import * as styles from './MobileOptions.css';

function WalletButton({ wallet }: { wallet: WalletConnector }) {
  const { iconUrl, id, name, ready, useMobileWalletButton } = wallet;
  const { onClick } = useMobileWalletButton();

  return (
    <Box
      as="button"
      color={ready ? 'modalText' : 'modalTextSecondary'}
      disabled={!ready}
      fontFamily="body"
      key={id}
      onClick={onClick}
      style={{ overflow: 'visible' }}
      type="button"
      width="full"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          alt={name}
          as="img"
          borderRadius="10"
          display="block"
          height="60"
          marginBottom="8"
          src={iconUrl}
          width="60"
        />
        <Text
          as="h2"
          color={wallet.ready ? 'modalText' : 'modalTextSecondary'}
          size="13"
          weight="medium"
        >
          {/* Fix button text clipping in Safari: https://stackoverflow.com/questions/41100273/overflowing-button-text-is-being-clipped-in-safari */}
          <Box as="span" position="relative">
            {name}
            {!wallet.ready && ' (unsupported)'}
          </Box>
        </Text>
      </Box>
    </Box>
  );
}

export function MobileOptions({ onClose }: { onClose: () => void }) {
  const titleId = 'rk_connect_title';
  const wallets = useWalletConnectors();

  return (
    <Box display="flex" flexDirection="column" gap="20" paddingY="16">
      <Box
        display="flex"
        justifyContent="center"
        paddingX="20"
        position="relative"
      >
        <Text as="h1" color="modalText" id={titleId} size="20" weight="bold">
          Connect a Wallet
        </Text>

        <Box
          alignItems="center"
          display="flex"
          height="full"
          paddingRight="10"
          position="absolute"
          right="0"
        >
          <Box
            style={{ marginBottom: -20, marginTop: -20 }} // Vertical bleed
          >
            <CloseButton onClose={onClose} />
          </Box>
        </Box>
      </Box>

      <Box className={styles.scroll} display="flex">
        <Box display="flex" style={{ margin: '0 auto' }}>
          {wallets.map(wallet => {
            return (
              <Box key={wallet.id} paddingX="20">
                <Box width="60">
                  <WalletButton wallet={wallet} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
