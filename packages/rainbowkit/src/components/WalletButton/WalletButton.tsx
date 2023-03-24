import React, { useContext } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { Box } from '../Box/Box';
import { ConnectorContext } from '../RainbowKitProvider/ConnectorContext';
import { WalletButtonRenderer } from './WalletButtonRenderer';

export interface WalletButtonProps {
  wallet?: string;
}

const defaultProps = {
  wallet: 'rainbow',
} as const;

export function WalletButton({ wallet: walletId }: WalletButtonProps) {
  const connectionStatus = useConnectionStatus();

  const [walletConnector] = useWalletConnectors().filter(
    wallet => wallet.id === walletId
  );

  const [, setConnector] = useContext(ConnectorContext);

  return (
    <WalletButtonRenderer>
      {({ mounted, openConnectModal }) => {
        const ready = mounted && connectionStatus !== 'loading';

        return (
          <Box
            display="flex"
            gap="12"
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            <Box
              as="button"
              background="accentColor"
              borderRadius="connectButton"
              boxShadow="connectButton"
              className={touchableStyles({ active: 'shrink', hover: 'grow' })}
              color="accentColorForeground"
              fontFamily="body"
              fontWeight="bold"
              height="40"
              key="connect"
              onClick={() => {
                setConnector?.(walletConnector);
                openConnectModal();
              }}
              paddingX="14"
              testId="connect-button"
              transition="default"
              type="button"
            >
              {walletConnector?.name || 'Connect'}
            </Box>
          </Box>
        );
      }}
    </WalletButtonRenderer>
  );
}

WalletButton.defaultProps = defaultProps;
WalletButton.Rainbow = () => WalletButton({ wallet: 'rainbow' });

export const RainbowButton = WalletButton.Rainbow;
