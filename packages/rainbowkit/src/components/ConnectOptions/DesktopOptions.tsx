import React from 'react';
import { Box } from '../Box/Box';
import { QRCode } from '../QRCode/QRCode';
import { useWallets } from '../RainbowKitProvider/useWallets';
import { WalletConnector } from '../RainbowKitProvider/wallet';
import { Text } from '../Text/Text';

function WalletDetail({
  useWalletDetail,
}: {
  useWalletDetail: NonNullable<WalletConnector['useWalletDetail']>;
}) {
  const { qrCode } = useWalletDetail();

  if (!qrCode) {
    return null;
  }

  return (
    <Box style={{ height: '342px' }}>
      {qrCode?.uri ? (
        <QRCode
          logoSize={72}
          logoUri={qrCode.logoUri}
          size={342}
          uri={qrCode.uri}
        />
      ) : null}
    </Box>
  );
}

export function DesktopOptions() {
  const titleId = 'rk_connect_title';
  const wallets = useWallets();

  // Hard coded for now
  const rainbowWallet = wallets.find(wallet => wallet.id === 'rainbow');

  return (
    <Box display="flex" flexDirection="column" gap="24" padding="14">
      <Text as="h1" color="modalText" id={titleId} size="23">
        Connect Wallet
      </Text>

      {
        // Hard coded for now
        rainbowWallet?.useWalletDetail && (
          <WalletDetail useWalletDetail={rainbowWallet.useWalletDetail} />
        )
      }

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
