import React, { useContext } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { SpinnerIcon } from '../Icons/Spinner';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import * as styles from './WalletButton.css';
import { WalletButtonRenderer } from './WalletButtonRenderer';

export const WalletButton = ({ wallet }: { wallet?: string }) => {
  return (
    <WalletButtonRenderer wallet={wallet}>
      {({ ready, connect, connected, mounted, connector, loading }) => {
        const isDisabled = !ready || loading;
        const { i18n } = useContext(I18nContext);
        const connectorName = connector?.name || '';

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
                touchableStyles({
                  active: 'shrink',
                  hover: 'grow',
                }),
              ]}
              minHeight="44"
              onClick={connect}
              disabled={!ready || loading}
              padding="6"
              style={{ willChange: 'transform' }}
              testId={`wallet-button-${connector?.id || ''}`}
              transition="default"
              width="full"
              background="connectButtonBackground"
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
                >
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
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    color="modalText"
                  >
                    <Box testId={`wallet-button-label-${connector?.id || ''}`}>
                      {loading
                        ? i18n.t('connect.status.connecting', {
                            wallet: connectorName,
                          })
                        : connectorName}
                    </Box>
                  </Box>

                  {connected ? (
                    <Box
                      background="connectionIndicator"
                      borderColor="selectedOptionBorder"
                      borderRadius="full"
                      borderStyle="solid"
                      borderWidth="1"
                      height="8"
                      width="8"
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
