import React, { useContext, useState } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';
import * as styles from './WalletButton.css';
import { WalletButtonRenderer } from './WalletButtonRenderer';

export interface WalletButtonProps {
  wallet: string;
}

export function WalletButton() {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const connectionStatus = useConnectionStatus();
  const { setConnector } = useContext(RainbowButtonContext);

  const [rainbowWallet] = useWalletConnectors('rainbow');

  return (
    <WalletButtonRenderer>
      {({ mounted, openConnectModal }) => {
        const ready = mounted && connectionStatus !== 'loading';
        return (
          <Box
            display="flex"
            flexDirection="column"
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            <Box
              as="button"
              borderRadius="menuButton"
              borderStyle="solid"
              borderWidth="1"
              className={[
                styles.border,
                touchableStyles({
                  active: 'shrink',
                }),
              ]}
              onClick={() => {
                setConnector(rainbowWallet);
                openConnectModal();
              }}
              padding="6"
              style={{ willChange: 'transform' }}
              testId={`wallet-button-${rainbowWallet.id}`}
              transition="default"
              width="full"
              {...{
                background: { hover: 'menuItemBackground' },
              }}
            >
              <Box
                color="modalText"
                disabled={!ready}
                fontFamily="body"
                fontSize="16"
                fontWeight="bold"
                transition="default"
              >
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  gap="12"
                  paddingRight="6"
                >
                  <Box>
                    <AsyncImage
                      background={rainbowWallet.iconBackground}
                      {...(isMouseOver
                        ? {}
                        : { borderColor: 'actionButtonBorder' })}
                      borderRadius="6"
                      height="28"
                      src={rainbowWallet.iconUrl}
                      width="28"
                    />
                  </Box>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    width="full"
                  >
                    <Box>{rainbowWallet.name}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      }}
    </WalletButtonRenderer>
  );
}
