import React, { useContext, useRef, useState } from 'react';
import { useConnect } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { WalletsContext } from '../RainbowKitProvider/WalletsContext';
import { Text } from '../Text/Text';

export function Connect() {
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const [{ data: connectData }, connect] = useConnect();
  const titleId = 'rk_connect_title';

  const wallets = useContext(WalletsContext);

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
            <Box display="flex" flexDirection="column" gap="18">
              {wallets.map(wallet => {
                const walletConnector = connectData.connectors.find(
                  connector => connector instanceof wallet.connectorClass
                );

                if (!walletConnector) {
                  return null;
                }

                return (
                  <Box
                    as="button"
                    color={
                      walletConnector.ready ? 'modalText' : 'modalTextSecondary'
                    }
                    disabled={!walletConnector.ready}
                    fontFamily="body"
                    key={walletConnector.id}
                    onClick={() => connect(walletConnector)}
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
                        {!walletConnector.ready && ' (unsupported)'}
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
