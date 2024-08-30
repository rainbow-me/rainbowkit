import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { isSafari } from '../../utils/browsers';
import { groupBy } from '../../utils/groupBy';
import {
  type WalletConnector,
  useWalletConnectors,
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
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import {
  ModalSizeContext,
  ModalSizeOptions,
} from '../RainbowKitProvider/ModalSizeContext';
import { WalletButtonContext } from '../RainbowKitProvider/WalletButtonContext';
import { Text } from '../Text/Text';

import { addLatestWalletId } from '../../wallets/latestWalletId';
import {
  ConnectDetail,
  DownloadDetail,
  DownloadOptionsDetail,
  GetDetail,
  InstructionDesktopDetail,
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
  InstructionsDesktop = 'INSTRUCTIONS_DESKTOP',
  InstructionsExtension = 'INSTRUCTIONS_EXTENSION',
}

export function DesktopOptions({ onClose }: { onClose: () => void }) {
  const titleId = 'rk_connect_title';
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
  const { i18n } = useContext(I18nContext);
  const safari = isSafari();

  const initialized = useRef(false);

  const { connector } = useContext(WalletButtonContext);

  // The `WalletButton` component made the connect modal appear empty when trying to connect.
  // This happened because of a mix up between EIP-6963 and RainbowKit connectors.
  // The problem was finding the correct `wallet.id`. `WalletButton` uses RainbowKit's id,
  // but EIP-6963 uses `rdns` for its id. We now don't merge EIP-6963 and RainbowKit
  // connectors if user interacts with `WalletButton` component.
  const mergeEIP6963WithRkConnectors = !connector;

  const wallets = useWalletConnectors(mergeEIP6963WithRkConnectors)
    .filter((wallet) => wallet.ready || !!wallet.extensionDownloadUrl)
    .sort((a, b) => a.groupIndex - b.groupIndex);

  const groupedWallets = groupBy(wallets, (wallet) => wallet.groupName);

  const supportedI18nGroupNames = [
    'Recommended',
    'Other',
    'Popular',
    'More',
    'Others',
    'Installed',
  ];

  // If a user hasn't installed the extension we will get the
  // qr code with additional steps on how to get the wallet
  useEffect(() => {
    if (connector && !initialized.current) {
      changeWalletStep(WalletStep.Connect);
      selectWallet(connector);
      initialized.current = true;
    }
  }, [connector]);

  const connectToWallet = (wallet: WalletConnector) => {
    setConnectionError(false);
    if (wallet.ready) {
      wallet?.connect?.()?.catch(() => {
        setConnectionError(true);
      });
    }
  };

  const onDesktopUri = async (wallet: WalletConnector) => {
    const sWallet = wallets.find((w) => wallet.id === w.id);

    if (!sWallet?.getDesktopUri) return;

    setTimeout(async () => {
      const uri = await sWallet?.getDesktopUri?.();
      if (uri) window.open(uri, safari ? '_blank' : '_self');
    }, 0);
  };

  const onQrCode = async (wallet: WalletConnector) => {
    const sWallet = wallets.find((w) => wallet.id === w.id);

    const uri = await sWallet?.getQrCodeUri?.();

    setQrCodeUri(uri);

    // This timeout prevents the UI from flickering if connection is instant,
    // otherwise users will see a flash of the "connecting" state.
    setTimeout(
      () => {
        setSelectedWallet(sWallet);
        changeWalletStep(WalletStep.Connect);
      },
      uri ? 0 : 50,
    );
  };

  const selectWallet = async (wallet: WalletConnector) => {
    // We still want to get the latest wallet id to show connected
    // green badge on our custom WalletButton API
    addLatestWalletId(wallet.id);

    // This ensures that we listen to the provider.once("display_uri")
    // before connecting to the wallet
    if (wallet.ready) {
      onQrCode(wallet);
      onDesktopUri(wallet);
    }

    connectToWallet(wallet);
    setSelectedOptionId(wallet.id);

    if (!wallet.ready) {
      setSelectedWallet(wallet);
      changeWalletStep(
        wallet?.extensionDownloadUrl
          ? WalletStep.DownloadOptions
          : WalletStep.Connect,
      );
    }
  };

  const getWalletDownload = (id: string) => {
    setSelectedOptionId(id);
    const sWallet = wallets.find((w) => id === w.id);
    const isMobile = sWallet?.downloadUrls?.qrCode;
    const isDesktop = !!sWallet?.desktopDownloadUrl;
    const isExtension = !!sWallet?.extensionDownloadUrl;
    setSelectedWallet(sWallet);
    if (isMobile && (isExtension || isDesktop)) {
      changeWalletStep(WalletStep.DownloadOptions);
    } else if (isMobile) {
      changeWalletStep(WalletStep.Download);
    } else if (isDesktop) {
      changeWalletStep(WalletStep.InstructionsDesktop);
    } else {
      changeWalletStep(WalletStep.InstructionsExtension);
    }
  };

  const clearSelectedWallet = () => {
    setSelectedOptionId(undefined);
    setSelectedWallet(undefined);
    setQrCodeUri(undefined);
  };
  const changeWalletStep = (newWalletStep: WalletStep, isBack = false) => {
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
    WalletStep.None,
  );
  const [walletStep, setWalletStep] = useState<WalletStep>(WalletStep.None);

  let walletContent = null;
  let headerLabel = null;
  let headerBackButtonLink: WalletStep | null = null;
  let headerBackButtonCallback: () => void;

  // biome-ignore lint/correctness/useExhaustiveDependencies: expected use to re-render when step changes
  useEffect(() => {
    setConnectionError(false);
  }, [walletStep, selectedWallet]);

  const hasExtension = !!selectedWallet?.extensionDownloadUrl;
  const hasExtensionAndMobile = !!(
    hasExtension && selectedWallet?.mobileDownloadUrl
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
      headerLabel = i18n.t('intro.title');
      headerBackButtonLink = WalletStep.None;
      break;
    case WalletStep.Get:
      walletContent = (
        <GetDetail
          getWalletDownload={getWalletDownload}
          compactModeEnabled={compactModeEnabled}
        />
      );
      headerLabel = i18n.t('get.title');
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
          onClose={onClose}
          qrCodeUri={qrCodeUri}
          reconnect={connectToWallet}
          wallet={selectedWallet}
        />
      );
      headerLabel =
        hasQrCode &&
        (selectedWallet.name === 'WalletConnect'
          ? i18n.t('connect_scan.fallback_title')
          : i18n.t('connect_scan.title', {
              wallet: selectedWallet.name,
            }));
      headerBackButtonLink = compactModeEnabled
        ? connector
          ? null
          : WalletStep.None
        : null;
      headerBackButtonCallback = compactModeEnabled
        ? !connector
          ? clearSelectedWallet
          : () => {}
        : () => {};
      break;
    case WalletStep.DownloadOptions:
      walletContent = selectedWallet && (
        <DownloadOptionsDetail
          changeWalletStep={changeWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel =
        selectedWallet &&
        i18n.t('get_options.short_title', { wallet: selectedWallet.name });
      headerBackButtonLink = connector
        ? WalletStep.Connect
        : compactModeEnabled
          ? WalletStep.None
          : null;
      break;
    case WalletStep.Download:
      walletContent = selectedWallet && (
        <DownloadDetail
          changeWalletStep={changeWalletStep}
          wallet={selectedWallet}
        />
      );
      headerLabel =
        selectedWallet &&
        i18n.t('get_mobile.title', { wallet: selectedWallet.name });
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
        i18n.t('get_options.title', {
          wallet: compactModeEnabled
            ? selectedWallet.shortName || selectedWallet.name
            : selectedWallet.name,
        });
      headerBackButtonLink = WalletStep.Download;
      break;
    case WalletStep.InstructionsExtension:
      walletContent = selectedWallet && (
        <InstructionExtensionDetail wallet={selectedWallet} />
      );
      headerLabel =
        selectedWallet &&
        i18n.t('get_options.title', {
          wallet: compactModeEnabled
            ? selectedWallet.shortName || selectedWallet.name
            : selectedWallet.name,
        });
      headerBackButtonLink = WalletStep.DownloadOptions;
      break;
    case WalletStep.InstructionsDesktop:
      walletContent = selectedWallet && (
        <InstructionDesktopDetail
          connectWallet={selectWallet}
          wallet={selectedWallet}
        />
      );
      headerLabel =
        selectedWallet &&
        i18n.t('get_options.title', {
          wallet: compactModeEnabled
            ? selectedWallet.shortName || selectedWallet.name
            : selectedWallet.name,
        });
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
                testId={'connect-header-label'}
              >
                {i18n.t('connect.title')}
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
                          color={
                            groupName === 'Installed'
                              ? 'accentColor'
                              : 'modalTextSecondary'
                          }
                          size="14"
                          weight="bold"
                        >
                          {supportedI18nGroupNames.includes(groupName)
                            ? i18n.t(
                                `connector_group.${groupName.toLowerCase()}`,
                              )
                            : groupName}
                        </Text>
                      </Box>
                    ) : null}
                    <Box display="flex" flexDirection="column" gap="4">
                      {wallets.map((wallet) => {
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
                            isRainbowKitConnector={wallet.isRainbowKitConnector}
                          />
                        );
                      })}
                    </Box>
                  </Fragment>
                ),
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
                      {i18n.t('connect.new_to_ethereum.description')}
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
                        {i18n.t('connect.new_to_ethereum.learn_more.label')}
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
