import WalletConnect from '@walletconnect/client';
import React, { useEffect, useRef, useState } from 'react';

import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { QRCode } from '../QRCode/QRCode';
import { useWallets } from '../RainbowKitProvider/useWallets';
import { Text } from '../Text/Text';

export function Connect() {
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const titleId = 'rk_connect_title';
  const wallets = useWallets();
  const [uri, setUri] = useState('');

  useEffect(() => {
    if (open) {
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
      });

      if (connector && !connector.connected) {
        connector.createSession({ chainId: 1 }).then(() => {
          setUri(connector.uri);
        });
      }
    }
  }, [open]);

  return (
    <>
      <div>
        <Box background="connectButtonBackground" borderRadius="connectButton">
          <Box
            as="button"
            background="connectButtonInnerBackground"
            borderColor={
              open ? 'connectedProfileBorder' : 'connectButtonBackground'
            }
            borderRadius="connectButton"
            borderStyle="solid"
            borderWidth="2"
            boxShadow="connectButton"
            color="connectButtonText"
            fontFamily="body"
            fontWeight="bold"
            onClick={() => setOpen(true)}
            padding="8"
            type="button"
          >
            Connect Wallet
          </Box>
        </Box>
      </div>

      <Dialog
        initialFocusRef={initialFocusRef}
        onClose={() => setOpen(false)}
        open={open}
        titleId={titleId}
      >
        <DialogContent>
          <Box display="flex" flexDirection="column" gap="24">
            <Text
              as="h1"
              color="modalText"
              id={titleId}
              ref={initialFocusRef}
              size="23"
              tabIndex={-1}
            >
              Connect Wallet
            </Text>
            <Box>{uri && <QRCode logoSize={72} size={342} uri={uri} />}</Box>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
