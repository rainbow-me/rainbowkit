import React, { useEffect, useState } from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { ConnectModalIntro } from '../ConnectModal/ConnectModalIntro';
import { BackIcon } from '../Icons/Back';
import { ModalSelection } from '../ModalSelection/ModalSelection';
import {
  useWalletConnectors,
  WalletConnector,
} from '../RainbowKitProvider/useWalletConnectors';
import { Text } from '../Text/Text';
import {
  ConnectDetail,
  DownloadDetail,
  GetDetail,
  InstructionDetail,
} from './ConnectDetails';
import { walletLogoClassName } from './DesktopOptions.css';

export enum WalletStep {
  None = 'NONE',
  Get = 'GET',
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
  const [connectionError, setConnectionError] = useState(false);
  const wallets = useWalletConnectors().filter(
    wallet => wallet.ready || wallet.downloadUrls?.desktop
  );

  const onSelectWallet = (wallet: WalletConnector) => {
    setSelectedOptionId(wallet.id);
    const sWallet = wallets.find(w => wallet.id === w.id);
    setSelectedWallet(sWallet);
    setWalletStep(WalletStep.Connect);

    if (wallet.ready) {
      wallet?.connect?.().then(x => {
        if (x.error) {
          setConnectionError(true);
        }
      });
    }
  };

  const getMobileWallet = (id: string) => {
    setSelectedOptionId(id);
    const sWallet = wallets.find(w => id === w.id);
    setSelectedWallet(sWallet);
    setWalletStep(WalletStep.Download);
  };

  const [walletStep, setWalletStep] = useState<WalletStep>(WalletStep.None);

  let walletContent = null;
  let headerLabel = null;
  let headerBackButtonLink: WalletStep | null = null;

  useEffect(() => {
    setConnectionError(false);
  }, [walletStep, selectedWallet]);

  switch (walletStep) {
    case WalletStep.None:
      walletContent = (
        <ConnectModalIntro getWallet={() => setWalletStep(WalletStep.Get)} />
      );
      break;
    case WalletStep.Get:
      walletContent = <GetDetail getMobileWallet={getMobileWallet} />;
      headerLabel = 'Get a Wallet';
      headerBackButtonLink = WalletStep.None;
      break;
    case WalletStep.Connect:
      walletContent = selectedWallet && (
        <ConnectDetail
          connectionError={connectionError}
          setWalletStep={setWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel = isRainbow && 'Scan with Rainbow to connect';
      break;
    case WalletStep.Download:
      walletContent = selectedWallet && (
        <DownloadDetail setWalletStep={setWalletStep} wallet={selectedWallet} />
      );
      headerLabel = isRainbow && 'Install Rainbow';
      headerBackButtonLink = WalletStep.Connect;
      break;
    case WalletStep.Instructions:
      walletContent = selectedWallet && (
        <InstructionDetail
          setWalletStep={setWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel = isRainbow && 'Get started with Rainbow';
      headerBackButtonLink = WalletStep.Download;
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
        margin="18"
        style={{ minWidth: isMobile() ? 'full' : '248px' }}
      >
        <Box marginBottom="16" marginLeft="6" paddingTop="4">
          <Text as="h1" color="modalText" id={titleId} size="18" weight="heavy">
            Connect a Wallet
          </Text>
        </Box>
        <Box marginLeft="6" marginY="4">
          <Text color="modalTextSecondary" size="14" weight="bold">
            Popular
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="8">
          {wallets.map(wallet => {
            return (
              <ModalSelection
                currentlySelected={wallet.id === selectedOptionId}
                key={wallet.id}
                onClick={() => onSelectWallet(wallet)}
              >
                <Box
                  color={
                    wallet.id === selectedOptionId ? 'buttonText' : 'modalText'
                  }
                  disabled={!wallet.ready}
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
                  >
                    <img
                      alt={wallet.name}
                      className={walletLogoClassName}
                      height="28"
                      src={wallet.iconUrl}
                      width="28"
                    />
                    <div>{wallet.name}</div>
                  </Box>
                </Box>
              </ModalSelection>
            );
          })}
        </Box>
      </Box>
      {!isMobile() && (
        <>
          <Box background="modalBorder" minWidth="1" width="1" />
          <Box
            display="flex"
            flexDirection="column"
            margin="16"
            style={{ flexGrow: 1 }}
          >
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              marginBottom="12"
            >
              <Box>
                {headerBackButtonLink && (
                  <Box
                    as="button"
                    color="accentColor"
                    onClick={() =>
                      headerBackButtonLink &&
                      setWalletStep(headerBackButtonLink)
                    }
                    paddingX="8"
                    paddingY="4"
                    style={{ height: 17 }}
                    transform={{ active: 'shrinkSm', hover: 'growLg' }}
                    transition="default"
                  >
                    <BackIcon />
                  </Box>
                )}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                style={{ flexGrow: 1 }}
              >
                {headerLabel && (
                  <Text color="modalText" size="18" weight="heavy">
                    {headerLabel}
                  </Text>
                )}
              </Box>
              <CloseButton onClose={onClose} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              style={{ minHeight: 438 }}
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
