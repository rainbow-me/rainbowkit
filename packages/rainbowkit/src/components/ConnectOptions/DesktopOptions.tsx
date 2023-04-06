import React, { Fragment, useContext, useEffect, useState } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { isSafari } from '../../utils/browsers';
import { groupBy } from '../../utils/groupBy';
import { getBrowserDownloadUrl } from '../../wallets/getDownloadUrl';
import {
  useWalletConnectors,
  WalletConnector,
} from '../../wallets/useWalletConnectors';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { ConnectModalIntro } from '../ConnectModal/ConnectModalIntro';
import { DisclaimerLink } from '../Disclaimer/DisclaimerLink';
import { DisclaimerText } from '../Disclaimer/DisclaimerText';
import { BackIcon } from '../Icons/Back';
import { InfoButton } from '../InfoButton/InfoButton';
import { ModalSelection } from '../ModalSelection/ModalSelection';
import { AppContext } from '../RainbowKitProvider/AppContext';
import {
  ModalSizeContext,
  ModalSizeOptions,
} from '../RainbowKitProvider/ModalSizeContext';
import { Text } from '../Text/Text';

import {
  ConnectDetail,
  DownloadDetail,
  DownloadOptionsDetail,
  GetDetail,
  InstructionExtensionDetail,
  InstructionMobileDetail,
} from './ConnectDetails';
import {
  ScrollClassName,
  sidebar,
  sidebarCompactMode,
} from './DesktopOptions.css';

export enum WalletStep {
  None = 'NONE',
  LearnCompact = 'LEARN_COMPACT',
  Get = 'GET',
  Connect = 'CONNECT',
  DownloadOptions = 'DOWNLOAD_OPTIONS',
  Download = 'DOWNLOAD',
  InstructionsMobile = 'INSTRUCTIONS_MOBILE',
  InstructionsExtension = 'INSTRUCTIONS_EXTENSION',
}

export function DesktopOptions({ onClose }: { onClose: () => void }) {
  const titleId = 'rk_connect_title';
  const safari = isSafari();
  const [selectedOptionId, setSelectedOptionId] = useState<
    string | undefined
  >();
  const [selectedWallet, setSelectedWallet] = useState<WalletConnector>();
  const [qrCodeUri, setQrCodeUri] = useState<string>();
  const hasQrCode = !!selectedWallet?.qrCode && qrCodeUri;
  const [connectionError, setConnectionError] = useState(false);
  const modalSize = useContext(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  const { disclaimer: Disclaimer } = useContext(AppContext);

  const wallets = useWalletConnectors()
    .filter(wallet => wallet.ready || !!getBrowserDownloadUrl(wallet))
    .sort((a, b) => a.groupIndex - b.groupIndex);

  const groupedWallets = groupBy(wallets, wallet => wallet.groupName);

  const connectToWallet = (wallet: WalletConnector) => {
    setConnectionError(false);
    if (wallet.ready) {
      wallet?.connect?.()?.catch(() => {
        setConnectionError(true);
      });

      const getDesktopDeepLink = wallet.desktop?.getUri;
      if (getDesktopDeepLink) {
        // if desktop deep link, wait for uri
        setTimeout(async () => {
          const uri = await getDesktopDeepLink();
          window.open(uri, safari ? '_blank' : '_self');
        }, 0);
      }
    }
  };

  const selectWallet = (wallet: WalletConnector) => {
    connectToWallet(wallet);
    setSelectedOptionId(wallet.id);

    if (wallet.ready) {
      // We need to guard against "onConnecting" callbacks being fired
      // multiple times since connector instances can be shared between
      // wallets. Ideally wagmi would let us scope the callback to the
      // specific "connect" call, but this will work in the meantime.
      let callbackFired = false;

      wallet?.onConnecting?.(async () => {
        if (callbackFired) return;
        callbackFired = true;

        const sWallet = wallets.find(w => wallet.id === w.id);
        const uri = await sWallet?.qrCode?.getUri();
        setQrCodeUri(uri);

        // This timeout prevents the UI from flickering if connection is instant,
        // otherwise users will see a flash of the "connecting" state.
        setTimeout(
          () => {
            setSelectedWallet(sWallet);
            changeWalletStep(WalletStep.Connect);
          },
          uri ? 0 : 50
        );

        // If the WalletConnect request is rejected, restart the wallet
        // selection flow to create a new connection with a new QR code
        const provider = await sWallet?.connector.getProvider();
        const connection = provider?.signer?.connection;
        if (connection?.on && connection?.off) {
          const handleConnectionClose = () => {
            removeHandlers();
            selectWallet(wallet);
          };
          const removeHandlers = () => {
            connection.off('close', handleConnectionClose);
            connection.off('open', removeHandlers);
          };
          connection.on('close', handleConnectionClose);
          connection.on('open', removeHandlers);
        }
      });
    } else {
      setSelectedWallet(wallet);
      changeWalletStep(WalletStep.Connect);
    }
  };

  const getWalletDownload = (id: string) => {
    setSelectedOptionId(id);
    const sWallet = wallets.find(w => id === w.id);
    const isMobile = sWallet?.downloadUrls?.qrCode;
    const isExtension = !!getBrowserDownloadUrl(sWallet);
    setSelectedWallet(sWallet);
    if (isMobile && isExtension) {
      changeWalletStep(WalletStep.DownloadOptions);
    } else if (isMobile) {
      changeWalletStep(WalletStep.Download);
    } else {
      changeWalletStep(WalletStep.InstructionsExtension);
    }
  };

  const clearSelectedWallet = () => {
    setSelectedOptionId(undefined);
    setSelectedWallet(undefined);
    setQrCodeUri(undefined);
  };
  const changeWalletStep = (
    newWalletStep: WalletStep,
    isBack: boolean = false
  ) => {
    if (
      isBack &&
      newWalletStep === WalletStep.Get &&
      initialWalletStep === WalletStep.Get
    ) {
      clearSelectedWallet();
    } else if (!isBack && newWalletStep === WalletStep.Get) {
      setInitialWalletStep(WalletStep.Get);
    } else if (!isBack && newWalletStep === WalletStep.Connect) {
      setInitialWalletStep(WalletStep.Connect);
    }
    setWalletStep(newWalletStep);
  };
  const [initialWalletStep, setInitialWalletStep] = useState<WalletStep>(
    WalletStep.None
  );
  const [walletStep, setWalletStep] = useState<WalletStep>(WalletStep.None);

  let walletContent = null;
  let headerLabel = null;
  let headerBackButtonLink: WalletStep | null = null;
  let headerBackButtonCallback: () => void;

  useEffect(() => {
    setConnectionError(false);
  }, [walletStep, selectedWallet]);

  const hasExtensionAndMobile = !!(
    !!getBrowserDownloadUrl(selectedWallet) &&
    (selectedWallet?.downloadUrls?.android ||
      selectedWallet?.downloadUrls?.ios ||
      selectedWallet?.downloadUrls?.mobile)
  );

  switch (walletStep) {
    case WalletStep.None:
      walletContent = (
        <ConnectModalIntro getWallet={() => changeWalletStep(WalletStep.Get)} />
      );
      break;
    case WalletStep.LearnCompact:
      walletContent = (
        <ConnectModalIntro
          compactModeEnabled={compactModeEnabled}
          getWallet={() => changeWalletStep(WalletStep.Get)}
        />
      );
      headerLabel = 'What is a Wallet?';
      headerBackButtonLink = WalletStep.None;
      break;
    case WalletStep.Get:
      walletContent = <GetDetail getWalletDownload={getWalletDownload} />;
      headerLabel = 'Get a Wallet';
      headerBackButtonLink = compactModeEnabled
        ? WalletStep.LearnCompact
        : WalletStep.None;
      break;
    case WalletStep.Connect:
      walletContent = selectedWallet && (
        <ConnectDetail
          changeWalletStep={changeWalletStep}
          compactModeEnabled={compactModeEnabled}
          connectionError={connectionError}
          qrCodeUri={qrCodeUri}
          reconnect={connectToWallet}
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
      headerBackButtonLink = compactModeEnabled ? WalletStep.None : null;
      headerBackButtonCallback = compactModeEnabled
        ? clearSelectedWallet
        : () => {};
      break;
    case WalletStep.DownloadOptions:
      walletContent = selectedWallet && (
        <DownloadOptionsDetail
          changeWalletStep={changeWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel = selectedWallet && `Get ${selectedWallet.name}`;
      headerBackButtonLink = initialWalletStep;
      break;
    case WalletStep.Download:
      walletContent = selectedWallet && (
        <DownloadDetail
          changeWalletStep={changeWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel = selectedWallet && `Install ${selectedWallet.name}`;
      headerBackButtonLink = hasExtensionAndMobile
        ? WalletStep.DownloadOptions
        : initialWalletStep;
      break;
    case WalletStep.InstructionsMobile:
      walletContent = selectedWallet && (
        <InstructionMobileDetail
          connectWallet={selectWallet}
          wallet={selectedWallet}
        />
      );
      headerLabel =
        selectedWallet &&
        `Get started with ${
          compactModeEnabled
            ? selectedWallet.shortName || selectedWallet.name
            : selectedWallet.name
        }`;
      headerBackButtonLink = WalletStep.Download;
      break;
    case WalletStep.InstructionsExtension:
      walletContent = selectedWallet && (
        <InstructionExtensionDetail wallet={selectedWallet} />
      );
      headerLabel =
        selectedWallet &&
        `Get started with ${
          compactModeEnabled
            ? selectedWallet.shortName || selectedWallet.name
            : selectedWallet.name
        }`;
      headerBackButtonLink = WalletStep.DownloadOptions;
      break;
    default:
      break;
  }
  return (
    <Box
      display="flex"
      flexDirection="row"
      style={{ maxHeight: compactModeEnabled ? 468 : 504 }}
    >
      {(compactModeEnabled ? walletStep === WalletStep.None : true) && (
        <Box
          className={compactModeEnabled ? sidebarCompactMode : sidebar}
          display="flex"
          flexDirection="column"
          marginTop="16"
        >
          <Box display="flex" justifyContent="space-between">
            {compactModeEnabled && Disclaimer && (
              <Box marginLeft="16" width="28">
                <InfoButton
                  onClick={() => changeWalletStep(WalletStep.LearnCompact)}
                />
              </Box>
            )}
            {compactModeEnabled && !Disclaimer && (
              <Box marginLeft="16" width="28" />
            )}
            <Box
              marginLeft={compactModeEnabled ? '0' : '6'}
              paddingBottom="8"
              paddingTop="2"
              paddingX="18"
            >
              <Text
                as="h1"
                color="modalText"
                id={titleId}
                size="18"
                weight="heavy"
              >
                Connect a Wallet
              </Text>
            </Box>
            {compactModeEnabled && (
              <Box marginRight="16">
                <CloseButton onClose={onClose} />
              </Box>
            )}
          </Box>
          <Box className={ScrollClassName} paddingBottom="18">
            {Object.entries(groupedWallets).map(
              ([groupName, wallets], index) =>
                wallets.length > 0 && (
                  <Fragment key={index}>
                    {groupName ? (
                      <Box marginBottom="8" marginTop="16" marginX="6">
                        <Text
                          color="modalTextSecondary"
                          size="14"
                          weight="bold"
                        >
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
                            onClick={() => selectWallet(wallet)}
                            ready={wallet.ready}
                            recent={wallet.recent}
                            testId={`wallet-option-${wallet.id}`}
                          />
                        );
                      })}
                    </Box>
                  </Fragment>
                )
            )}
          </Box>
          {compactModeEnabled && (
            <>
              <Box background="generalBorder" height="1" marginTop="-1" />
              {Disclaimer ? (
                <Box paddingX="24" paddingY="16" textAlign="center">
                  <Disclaimer Link={DisclaimerLink} Text={DisclaimerText} />
                </Box>
              ) : (
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                  paddingX="24"
                  paddingY="16"
                >
                  <Box paddingY="4">
                    <Text color="modalTextSecondary" size="14" weight="medium">
                      New to Ethereum wallets?
                    </Text>
                  </Box>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    gap="4"
                    justifyContent="center"
                  >
                    <Box
                      className={touchableStyles({
                        active: 'shrink',
                        hover: 'grow',
                      })}
                      cursor="pointer"
                      onClick={() => changeWalletStep(WalletStep.LearnCompact)}
                      paddingY="4"
                      style={{ willChange: 'transform' }}
                      transition="default"
                    >
                      <Text color="accentColor" size="14" weight="bold">
                        Learn More
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
      {(compactModeEnabled ? walletStep !== WalletStep.None : true) && (
        <>
          {!compactModeEnabled && (
            <Box background="generalBorder" minWidth="1" width="1" />
          )}
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
                    className={touchableStyles({
                      active: 'shrinkSm',
                      hover: 'growLg',
                    })}
                    color="accentColor"
                    onClick={() => {
                      headerBackButtonLink &&
                        changeWalletStep(headerBackButtonLink, true);
                      headerBackButtonCallback?.();
                    }}
                    paddingX="8"
                    paddingY="4"
                    style={{
                      boxSizing: 'content-box',
                      height: 17,
                      willChange: 'transform',
                    }}
                    transition="default"
                    type="button"
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
                  <Text
                    color="modalText"
                    size="18"
                    textAlign="center"
                    weight="heavy"
                  >
                    {headerLabel}
                  </Text>
                )}
              </Box>
              <CloseButton onClose={onClose} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              style={{ minHeight: compactModeEnabled ? 396 : 432 }}
            >
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                gap="6"
                height="full"
                justifyContent="center"
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
