import React from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { SpinnerIcon } from '../Icons/Spinner';
import * as styles from './WalletButton.css';
import { WalletButtonRenderer } from './WalletButtonRenderer';

export const WalletButton = ({ wallet }: { wallet?: string }) => {
  return (
    <WalletButtonRenderer wallet={wallet}>
      {({ ready, connect, connected, mounted, connector, loading, error }) => {
        const isDisabled = !ready || loading;

        // SSR mismatch issue in next.js:
        // By default, "rainbow wallet" text is expected.
        // If new custom connector is detected the text will change on the client side.
        // To prevent errors in next.js, we ensure the component mounts on the client side.
        if (!mounted) return;

        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            disabled={isDisabled}
            pointerEvents={isDisabled ? 'none' : 'all'}
          >
            <Box
              as="button"
              borderRadius="menuButton"
              borderStyle="solid"
              borderWidth="1"
              className={[
                styles.maxWidth,
                styles.border,
                !connected
                  ? touchableStyles({
                      active: 'shrink',
                      hover: 'grow',
                    })
                  : '',
              ]}
              minHeight="44"
              onClick={() => {
                if (connected) return;

                connect();
              }}
              disabled={!ready || loading}
              padding="6"
              style={{ willChange: 'transform' }}
              testId={`wallet-button-${connector?.id || ''}`}
              transition="default"
              width="full"
              background={{
                base: error
                  ? 'connectButtonBackgroundError'
                  : 'accentColorForeground',
                hover: error
                  ? 'connectButtonBackgroundError'
                  : 'menuItemBackground',
              }}
            >
              <Box
                color="modalText"
                fontFamily="body"
                fontSize="16"
                fontWeight="bold"
                transition="default"
                display="flex"
                alignItems="center"
              >
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  gap="12"
                  paddingRight="6"
                  paddingLeft={error ? '6' : '0'}
                >
                  {!error ? (
                    <Box>
                      {loading ? (
                        <SpinnerIcon />
                      ) : (
                        <AsyncImage
                          background={connector?.iconBackground}
                          borderRadius="6"
                          height="28"
                          src={connector?.iconUrl}
                          width="28"
                        />
                      )}
                    </Box>
                  ) : null}

                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    width="full"
                    color={error ? 'connectButtonTextError' : 'modalText'}
                  >
                    <Box>{error ? error : connector?.name}</Box>
                  </Box>

                  {connected ? (
                    <Box
                      background="standby"
                      height="8"
                      width="8"
                      minWidth="8"
                      minHeight="8"
                      borderRadius="full"
                    />
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      }}
    </WalletButtonRenderer>
  );
};

WalletButton.Custom = WalletButtonRenderer;
