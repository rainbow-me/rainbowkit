import React from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { SpinnerIcon } from '../Icons/Spinner';
import * as styles from './WalletButton.css';
import { WalletButtonRenderer } from './WalletButtonRenderer';

export const WalletButton = () => {
  return (
    <WalletButtonRenderer>
      {({ ready, connect, connector, loading, error }) => {
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pointerEvents={loading ? 'none' : 'all'}
          >
            <Box
              as="button"
              borderRadius="menuButton"
              borderStyle="solid"
              borderWidth="1"
              className={[
                styles.maxWidth,
                styles.border,
                !loading
                  ? touchableStyles({
                      active: 'shrink',
                    })
                  : '',
              ]}
              onClick={connect}
              disabled={!ready || loading}
              padding="6"
              style={{ willChange: 'transform' }}
              testId={`wallet-button-${connector?.id || ''}`}
              transition="default"
              width="full"
              {...(!loading
                ? {
                    background: { hover: 'menuItemBackground' },
                  }
                : {})}
            >
              {loading ? (
                <Box
                  color="modalText"
                  fontFamily="body"
                  fontSize="16"
                  fontWeight="bold"
                  transition="default"
                  display="flex"
                  alignItems="center"
                  paddingY="3"
                  paddingBottom="3"
                >
                  <SpinnerIcon />
                  <Box paddingLeft="6">Connecting...</Box>
                </Box>
              ) : (
                <Box
                  color="modalText"
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
                        background={connector?.iconBackground}
                        borderRadius="6"
                        height="28"
                        src={connector?.iconUrl}
                        width="28"
                      />
                    </Box>
                    <Box
                      alignItems="center"
                      display="flex"
                      flexDirection="column"
                      width="full"
                    >
                      <Box>{connector?.name}</Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {error ? <Box marginTop="8">{error}</Box> : null}
          </Box>
        );
      }}
    </WalletButtonRenderer>
  );
};

WalletButton.Custom = WalletButtonRenderer;
