import React, { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Box } from '../Box/Box';
import { Network } from '../Network/Network';
import { Profile } from '../Profile/Profile';

import { Connect } from './Connect';

export function ConnectButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  useEffect(() => {
    if (!connectData.connector) {
      const walletConnectDefault = new WalletConnectConnector({
        options: {
          qrcode: false,
        },
      });

      connect(walletConnectDefault);
    }
    setIsMounted(true);
  }, [setIsMounted, connect, connectData.connector]);

  if (!isMounted) {
    return null;
  }

  return accountData ? (
    <Box display="flex" gap="12">
      <Network />
      <Profile />
    </Box>
  ) : (
    <Connect uri={connectData.connector.getProvider().connector.uri} />
  );
}
