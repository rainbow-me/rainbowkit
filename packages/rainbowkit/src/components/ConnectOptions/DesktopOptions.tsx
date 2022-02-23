import React, { useState } from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { ConnectModalIntro } from '../ConnectModal/ConnectModalIntro';
import { CloseIcon } from '../Icons/Close';
import { SpinnerIcon } from '../Icons/Spinner';
import { MenuButton } from '../MenuButton/MenuButton';
import { QRCode } from '../QRCode/QRCode';
import { useWallets } from '../RainbowKitProvider/useWallets';
import { WalletConnector, WalletMeta } from '../RainbowKitProvider/wallet';
import { Text } from '../Text/Text';
import { walletLogoClassName } from './DesktopOptions.css';

function WalletDetail({
  useWalletDetail,
}: {
  useWalletDetail: NonNullable<WalletConnector['useWalletDetail']>;
}) {
  const { qrCode } = useWalletDetail();

  if (!qrCode) {
    return null;
  }

  return (
    <Box>
      {qrCode?.uri ? (
        <QRCode
          logoSize={72}
          logoUri={qrCode.logoUri}
          size={350}
          uri={qrCode.uri}
        />
      ) : null}
    </Box>
  );
}

export function DesktopOptions({ onClose }: { onClose: () => void }) {
  const titleId = 'rk_connect_title';
  const [selectedOptionId, setSelectedOptionId] = useState<
    string | undefined
  >();
  const [selectedWallet, setSelectedWallet] = useState<
    | (WalletMeta & {
        ready?: boolean | undefined;
        connect?: (() => void) | undefined;
      })
    | undefined
  >();
  const isRainbow = selectedOptionId === 'rainbow';
  const wallets = useWallets();

  const onSelectWallet = (
    wallet: WalletMeta & {
      ready?: boolean | undefined;
      connect?: (() => void) | undefined;
    }
  ) => {
    setSelectedOptionId(wallet.id);
    const sWallet = wallets.find(w => wallet.id === w.id);
    setSelectedWallet(sWallet);
    wallet?.connect?.();
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box
        display="flex"
        flexDirection="column"
        gap="8"
        marginX="14"
        paddingX="6"
        paddingY="14"
        style={{ minWidth: isMobile() ? 'full' : '260px' }}
      >
        <Box paddingY="8">
          <Text as="h1" color="modalText" id={titleId} size="18" weight="heavy">
            Connect a Wallet
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="6">
          {wallets.map(wallet => {
            return (
              <MenuButton
                currentlySelected={wallet.id === selectedOptionId}
                key={wallet.id}
                onClick={() => onSelectWallet(wallet)}
              >
                <Box
                  color={wallet.ready ? 'modalText' : 'modalTextSecondary'}
                  disabled={!wallet.ready}
                  fontFamily="body"
                  fontSize="16"
                  fontWeight="bold"
                >
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    gap="12"
                  >
                    <img
                      alt={wallet.name}
                      className={walletLogoClassName}
                      height="28"
                      src={wallet.iconUrl}
                      width="28"
                    />
                    <div>
                      {wallet.name}
                      {!wallet.ready && ' (unsupported)'}
                    </div>
                  </Box>
                </Box>
              </MenuButton>
            );
          })}
        </Box>
      </Box>
      {!isMobile() && (
        <>
          <Box background="menuDivider" width="2" />
          <Box
            display="flex"
            flexDirection="column"
            margin="14"
            style={{ flexGrow: 1 }}
          >
            <Box display="flex" justifyContent="flex-end">
              <Box
                as="button"
                onClick={onClose}
                transform={{ active: 'shrinkSm', hover: 'growLg' }}
                transition="default"
              >
                <CloseIcon />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              style={{ minHeight: 442 }}
            >
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                gap="6"
                justifyContent="center"
                marginTop="12"
                marginX="6"
                style={{ height: 382 }}
              >
                {' '}
                {selectedOptionId ? (
                  isRainbow && selectedWallet?.useWalletDetail ? (
                    <WalletDetail
                      useWalletDetail={selectedWallet?.useWalletDetail}
                    />
                  ) : (
                    <>
                      <Text color="modalText" size="20" weight="bold">
                        Opening {selectedOptionId}
                      </Text>
                      <Box display="flex" flexDirection="row" gap="6">
                        <SpinnerIcon />
                        <Text color="menuTextAction" size="16" weight="bold">
                          Waiting for connection
                        </Text>
                      </Box>
                    </>
                  )
                ) : (
                  <ConnectModalIntro />
                )}
              </Box>
              <Box
                alignItems="center"
                borderRadius="10"
                display="flex"
                flexDirection="row"
                gap="8"
                height="34"
                marginTop="12"
                marginX="6"
                paddingY="8"
              >
                {isRainbow && (
                  <>
                    <Text color="menuTextSecondary" size="16" weight="bold">
                      Don&apos;t have the Rainbow Mobile App Yet?
                    </Text>
                    <Button label="GET" />
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
