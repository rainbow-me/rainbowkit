import React, { useState } from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { ConnectModalIntro } from '../ConnectModal/ConnectModalIntro';
import { CloseIcon } from '../Icons/Close';
import { MenuButton } from '../MenuButton/MenuButton';
import {
  useWalletConnectors,
  WalletConnector,
} from '../RainbowKitProvider/useWalletConnectors';
import { Text } from '../Text/Text';
import {
  ConnectDetail,
  DownloadDetail,
  InstructionDetail,
} from './ConnectDetails';
import { walletLogoClassName } from './DesktopOptions.css';

export enum WalletStep {
  None = 'NONE',
  Connect = 'CONNECT',
  Download = 'DOWNLOAD',
  Instructions = 'INSTRUCTIONS',
}

export function DesktopOptions({ onClose }: { onClose: () => void }) {
  const titleId = 'rk_connect_title';
  const [selectedOptionId, setSelectedOptionId] = useState<
    string | undefined
  >();
  const [selectedWallet, setSelectedWallet] = useState<WalletConnector>();
  const isRainbow = selectedOptionId === 'rainbow';
  const wallets = useWalletConnectors();

  const onSelectWallet = (wallet: WalletConnector) => {
    setSelectedOptionId(wallet.id);
    const sWallet = wallets.find(w => wallet.id === w.id);
    setSelectedWallet(sWallet);
    setWalletStep(WalletStep.Connect);
    wallet?.connect?.();
  };

  const getWallet = () => {
    setSelectedOptionId('rainbow');
    const sWallet = wallets.find(w => 'rainbow' === w.id);
    setSelectedWallet(sWallet);
    setWalletStep(WalletStep.Download);
  };

  const [walletStep, setWalletStep] = useState<WalletStep>(WalletStep.None);

  let walletContent = null;
  let headerLabel = null;

  switch (walletStep) {
    case WalletStep.None:
      walletContent = <ConnectModalIntro getWallet={getWallet} />;
      break;
    case WalletStep.Connect:
      walletContent = selectedWallet && (
        <ConnectDetail setWalletStep={setWalletStep} wallet={selectedWallet} />
      );
      headerLabel = isRainbow && 'Scan with Rainbow to connect';
      break;
    case WalletStep.Download:
      walletContent = selectedWallet && (
        <DownloadDetail setWalletStep={setWalletStep} wallet={selectedWallet} />
      );
      headerLabel = isRainbow && 'Scan to download Rainbow';

      break;
    case WalletStep.Instructions:
      walletContent = selectedWallet && (
        <InstructionDetail
          setWalletStep={setWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel = isRainbow && 'Get started with Rainbow';
      break;
    default:
      break;
  }

  return (
    <Box display="flex" flexDirection="row">
      <Box
        display="flex"
        flexDirection="column"
        gap="6"
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
        <Box marginTop="8">
          <Text color="modalTextSecondary" size="14" weight="bold">
            Popular
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
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              marginBottom="6"
            >
              <Box marginLeft="6">
                {isRainbow && (
                  <Text color="modalText" size="18" weight="heavy">
                    {headerLabel}
                  </Text>
                )}
              </Box>
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
                height="full"
                justifyContent="center"
                marginTop="6"
                marginX="6"
              >
                {walletContent}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
