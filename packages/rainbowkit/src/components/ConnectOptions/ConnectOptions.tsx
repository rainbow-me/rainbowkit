import React, { useEffect, useState } from 'react';
import { useConnect } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { QRCode } from '../QRCode/QRCode';
import { useWallets } from '../RainbowKitProvider/useWallets';
import { Text } from '../Text/Text';
import { MobileOptions } from './MobileOptions';

export default function ConnectOptions() {
  const wallets = useWallets();
  const titleId = 'rk_connect_title';
  const [uri, setURI] = useState('');
  const [{ data: connectData }, connect] = useConnect();

  useEffect(() => {
    if (!connectData.connector) {
      const walletConnectDefault = new WalletConnectConnector({
        options: {
          qrcode: false,
        },
      });

      connect(walletConnectDefault);
    }

    if (connectData.connector) {
      setURI(connectData.connector.getProvider().connector.uri);
    }
  }, [connect, connectData.connector]);

  return isMobile() ? (
    <MobileOptions />
  ) : (
    <Box display="flex" flexDirection="column" gap="24" padding="14">
      <Text as="h1" color="modalText" id={titleId} size="23">
        Connect Wallet
      </Text>

      <Box style={{ height: '342px' }}>
        {uri && <QRCode logoSize={72} size={342} uri={uri} />}
      </Box>

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
