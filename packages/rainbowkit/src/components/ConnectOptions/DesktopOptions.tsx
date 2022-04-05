import React, { Fragment, useEffect, useState } from 'react';
import { groupBy } from '../../utils/groupBy';
import { isMobile } from '../../utils/isMobile';
import {
  useWalletConnectors,
  WalletConnector,
} from '../../wallets/useWalletConnectors';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { ConnectModalIntro } from '../ConnectModal/ConnectModalIntro';
import { BackIcon } from '../Icons/Back';
import { ModalSelection } from '../ModalSelection/ModalSelection';
import { Text } from '../Text/Text';
import {
  ConnectDetail,
  DownloadDetail,
  GetDetail,
  InstructionDetail,
} from './ConnectDetails';
import { ScrollClassName } from './DesktopOptions.css';

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
  const hasQrCode = !!selectedWallet?.qrCode;
  const [connectionError, setConnectionError] = useState(false);
  const wallets = useWalletConnectors().filter(
    wallet => wallet.ready || wallet.downloadUrls?.browserExtension
  );

  const groupedWallets = groupBy(wallets, wallet => wallet.groupName);

  const connectToWallet = (wallet: WalletConnector) => {
    setConnectionError(false);
    if (wallet.ready) {
      wallet?.connect?.().then(x => {
        if (x.error) {
          setConnectionError(true);
        }
      });
    }
  };

  const onSelectWallet = (wallet: WalletConnector) => {
    connectToWallet(wallet);
    // Update selected wallet state on next tick so QR code URIs are ready to render
    setTimeout(() => {
      setSelectedOptionId(wallet.id);
      const sWallet = wallets.find(w => wallet.id === w.id);
      setSelectedWallet(sWallet);
      setWalletStep(WalletStep.Connect);
    }, 0);
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
          reconnect={connectToWallet}
          setWalletStep={setWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel =
        hasQrCode &&
        `Scan with ${
          selectedWallet.name === 'WalletConnect'
            ? 'your phone'
            : selectedWallet.name
        }`;
      break;
    case WalletStep.Download:
      walletContent = selectedWallet && (
        <DownloadDetail setWalletStep={setWalletStep} wallet={selectedWallet} />
      );
      headerLabel = hasQrCode && `Install ${selectedWallet.name}`;
      headerBackButtonLink = WalletStep.Connect;
      break;
    case WalletStep.Instructions:
      walletContent = selectedWallet && (
        <InstructionDetail
          setWalletStep={setWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel = hasQrCode && `Get started with ${selectedWallet.name}`;
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
        marginTop="18"
        style={{
          minWidth: isMobile() ? 'full' : '287px',
        }}
      >
        <Box marginLeft="6" paddingBottom="10" paddingX="18">
          <Text as="h1" color="modalText" id={titleId} size="18" weight="heavy">
            Connect a Wallet
          </Text>
        </Box>
        <Box className={ScrollClassName} paddingBottom="18">
          {Object.entries(groupedWallets).map(
            ([groupName, wallets], index) =>
              wallets.length > 0 && (
                <Fragment key={index}>
                  {groupName ? (
                    <Box marginBottom="8" marginTop="16" marginX="6">
                      <Text color="modalTextSecondary" size="14" weight="bold">
                        {groupName}
                      </Text>
                    </Box>
                  ) : null}
                  <Box display="flex" flexDirection="column" gap="4">
                    {wallets.map(wallet => {
                      return (
                        <ModalSelection
                          currentlySelected={wallet.id === selectedOptionId}
                          iconBackground={wallet.iconBackground}
                          iconUrl={wallet.iconUrl}
                          key={wallet.id}
                          name={wallet.name}
                          onClick={() => onSelectWallet(wallet)}
                          ready={wallet.ready}
                        />
                      );
                    })}
                  </Box>
                </Fragment>
              )
          )}
        </Box>
      </Box>
      {!isMobile() && (
        <>
          <Box background="generalBorder" minWidth="1" width="1" />
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
              <Box width="28">
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
                    style={{
                      boxSizing: 'content-box',
                      height: 17,
                      willChange: 'transform',
                    }}
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
              style={{ minHeight: 432 }}
            >
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                gap="6"
                height="full"
                justifyContent="center"
                marginTop="6"
                marginX="8"
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
