import React, { useState } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import * as styles from './RainbowButton.css';
import { WalletButtonRenderer } from './WalletButtonRenderer';

export const RainbowButton = () => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const [rainbowWallet] = useWalletConnectors('rainbow');

  return (
    <WalletButtonRenderer>
      {({ isReady, connect }) => {
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
              onClick={connect}
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
                disabled={!isReady}
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
};

RainbowButton.Custom = WalletButtonRenderer;
