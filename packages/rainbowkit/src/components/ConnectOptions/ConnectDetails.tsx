import React, { ReactNode, useContext, useEffect } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { useWindowSize } from '../../hooks/useWindowSize';
import { BrowserType, getBrowser, isSafari } from '../../utils/browsers';
import { getGradientRGBAs } from '../../utils/colors';
import { InstructionStepName } from '../../wallets/Wallet';
import { getBrowserDownloadUrl } from '../../wallets/getDownloadUrl';
import {
  useWalletConnectors,
  WalletConnector,
} from '../../wallets/useWalletConnectors';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { Box, BoxProps } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { CreateIcon, preloadCreateIcon } from '../Icons/Create';
import { preloadRefreshIcon, RefreshIcon } from '../Icons/Refresh';
import { preloadScanIcon, ScanIcon } from '../Icons/Scan';
import { SpinnerIcon } from '../Icons/Spinner';
import { QRCode } from '../QRCode/QRCode';
import { ModalSizeContext } from '../RainbowKitProvider/ModalSizeContext';
import { Text } from '../Text/Text';
import { WalletStep } from './DesktopOptions';

const getBrowserSrc: () => Promise<string> = async () => {
  const browser = getBrowser();
  switch (browser) {
    case BrowserType.Arc:
      return (await import(`../Icons/Arc.svg`)).default;
    case BrowserType.Brave:
      return (await import(`../Icons/Brave.svg`)).default;
    case BrowserType.Chrome:
      return (await import(`../Icons/Chrome.svg`)).default;
    case BrowserType.Edge:
      return (await import(`../Icons/Edge.svg`)).default;
    case BrowserType.Firefox:
      return (await import(`../Icons/Firefox.svg`)).default;
    case BrowserType.Opera:
      return (await import(`../Icons/Opera.svg`)).default;
    case BrowserType.Safari:
      return (await import(`../Icons/Safari.svg`)).default;
    default:
      return (await import(`../Icons/Browser.svg`)).default;
  }
};

const preloadBrowserIcon = () => loadImages(getBrowserSrc);

export function GetDetail({
  getWalletDownload,
}: {
  getWalletDownload: (walletId: string) => void;
}) {
  const wallets = useWalletConnectors();
  const shownWallets = wallets.splice(0, 5);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="full"
      marginTop="18"
      width="full"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="28"
        height="full"
        width="full"
      >
        {shownWallets
          ?.filter(
            wallet =>
              getBrowserDownloadUrl(wallet) ||
              (wallet.qrCode && wallet.downloadUrls?.qrCode)
          )
          .map(wallet => {
            const { downloadUrls, iconBackground, iconUrl, id, name, qrCode } =
              wallet;
            const hasMobileCompanionApp = downloadUrls?.qrCode && qrCode;
            const hasExtension = !!getBrowserDownloadUrl(wallet);
            const hasMobileAndExtension = downloadUrls?.qrCode && hasExtension;

            return (
              <Box
                alignItems="center"
                display="flex"
                gap="16"
                justifyContent="space-between"
                key={wallet.id}
                width="full"
              >
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  gap="16"
                >
                  <AsyncImage
                    background={iconBackground}
                    borderColor="actionButtonBorder"
                    borderRadius="10"
                    height="48"
                    src={iconUrl}
                    width="48"
                  />
                  <Box display="flex" flexDirection="column" gap="2">
                    <Text color="modalText" size="14" weight="bold">
                      {name}
                    </Text>
                    <Text color="modalTextSecondary" size="14" weight="medium">
                      {hasMobileAndExtension
                        ? 'Mobile Wallet and Extension'
                        : hasMobileCompanionApp
                        ? 'Mobile Wallet'
                        : hasExtension
                        ? 'Browser Extension'
                        : null}
                    </Text>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap="4">
                  <ActionButton
                    label="GET"
                    onClick={() => getWalletDownload(id)}
                    type="secondary"
                  />
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box
        alignItems="center"
        borderRadius="10"
        display="flex"
        flexDirection="column"
        gap="8"
        justifyContent="space-between"
        marginBottom="4"
        paddingY="8"
        style={{ maxWidth: 275, textAlign: 'center' }}
      >
        <Text color="modalText" size="14" weight="bold">
          Not what you&rsquo;re looking for?
        </Text>
        <Text color="modalTextSecondary" size="14" weight="medium">
          Select a wallet on the left to get started with a different wallet
          provider.
        </Text>
      </Box>
    </Box>
  );
}

const LOGO_SIZE: BoxProps['height'] = '44'; // size of wallet logo in Connect tab
export function ConnectDetail({
  changeWalletStep,
  compactModeEnabled,
  connectionError,
  qrCodeUri,
  reconnect,
  wallet,
}: {
  changeWalletStep: (newWalletStep: WalletStep) => void;
  compactModeEnabled: boolean;
  connectionError: boolean;
  qrCodeUri?: string;
  reconnect: (wallet: WalletConnector) => void;
  wallet: WalletConnector;
}) {
  const {
    downloadUrls,
    iconBackground,
    iconUrl,
    name,
    qrCode,
    ready,
    showWalletConnectModal,
  } = wallet;
  const getDesktopDeepLink = wallet.desktop?.getUri;
  const safari = isSafari();

  const hasExtension = !!getBrowserDownloadUrl(wallet);
  const hasQrCodeAndExtension = downloadUrls?.qrCode && hasExtension;
  const hasQrCode = qrCode && qrCodeUri;

  const secondaryAction: {
    description: string;
    label: string;
    onClick?: () => void;
    href?: string;
  } | null = showWalletConnectModal
    ? {
        description: `Need the ${
          compactModeEnabled ? '' : 'official'
        } WalletConnect modal?`,
        label: 'OPEN',
        onClick: showWalletConnectModal,
      }
    : hasQrCode
    ? {
        description: `Don\u2019t have ${name}?`,
        label: 'GET',
        onClick: () =>
          changeWalletStep(
            hasQrCodeAndExtension
              ? WalletStep.DownloadOptions
              : WalletStep.Download
          ),
      }
    : null;

  const { width: windowWidth } = useWindowSize();
  const smallWindow = windowWidth && windowWidth < 768;

  useEffect(() => {
    // Preload icon used on next screen
    preloadBrowserIcon();
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="full" width="full">
      {hasQrCode ? (
        <Box
          alignItems="center"
          display="flex"
          height="full"
          justifyContent="center"
        >
          <QRCode
            logoBackground={iconBackground}
            logoSize={compactModeEnabled ? 60 : 72}
            logoUrl={iconUrl}
            size={
              compactModeEnabled
                ? 318
                : smallWindow
                ? Math.max(280, Math.min(windowWidth - 308, 382))
                : 382
            }
            uri={qrCodeUri}
          />
        </Box>
      ) : (
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          style={{ flexGrow: 1 }}
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="8"
          >
            <Box borderRadius="10" height={LOGO_SIZE} overflow="hidden">
              <AsyncImage height={LOGO_SIZE} src={iconUrl} width={LOGO_SIZE} />
            </Box>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              gap="4"
              paddingX="32"
              style={{ textAlign: 'center' }}
            >
              <Text color="modalText" size="18" weight="bold">
                {ready
                  ? `Opening ${name}...`
                  : hasExtension
                  ? `${name} is not installed`
                  : `${name} is not available`}
              </Text>
              {!ready && hasExtension ? (
                <Box paddingTop="20">
                  <ActionButton
                    href={getBrowserDownloadUrl(wallet)}
                    label="INSTALL"
                    type="secondary"
                  />
                </Box>
              ) : null}
              {ready && !hasQrCode && (
                <>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text
                      color="modalTextSecondary"
                      size="14"
                      textAlign="center"
                      weight="medium"
                    >
                      Confirm connection in the extension
                    </Text>
                  </Box>
                  <Box
                    alignItems="center"
                    color="modalText"
                    display="flex"
                    flexDirection="row"
                    height="32"
                    marginTop="8"
                  >
                    {connectionError ? (
                      <ActionButton
                        label="RETRY"
                        onClick={
                          getDesktopDeepLink
                            ? async () => {
                                const uri = await getDesktopDeepLink();
                                window.open(uri, safari ? '_blank' : '_self');
                              }
                            : () => {
                                reconnect(wallet);
                              }
                        }
                      />
                    ) : (
                      <Box color="modalTextSecondary">
                        <SpinnerIcon />
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      )}

      <Box
        alignItems="center"
        borderRadius="10"
        display="flex"
        flexDirection="row"
        gap="8"
        height="28"
        justifyContent="space-between"
        marginTop="12"
      >
        {ready && secondaryAction && (
          <>
            <Text color="modalTextSecondary" size="14" weight="medium">
              {secondaryAction.description}
            </Text>
            <ActionButton
              label={secondaryAction.label}
              onClick={secondaryAction.onClick}
              type="secondary"
            />
          </>
        )}
      </Box>
    </Box>
  );
}

const DownloadOptionsBox = ({
  actionLabel,
  description,
  iconAccent,
  iconBackground,
  iconUrl,
  isCompact,
  onAction,
  title,
  url,
  variant,
}: {
  iconAccent?: string;
  title: string;
  description: string;
  onAction?: () => void;
  actionLabel: string;
  url?: string;
  isCompact: boolean;
  iconUrl: string | (() => Promise<string>);
  iconBackground?: string;
  variant: 'browser' | 'app';
}) => {
  const isBrowserCard = variant === 'browser';
  const gradientRgbas =
    !isBrowserCard && iconAccent && getGradientRGBAs(iconAccent);
  return (
    <Box
      alignItems="center"
      borderRadius="13"
      display="flex"
      justifyContent="center"
      overflow="hidden"
      paddingX={isCompact ? '18' : '44'}
      position="relative"
      style={{ flex: 1, isolation: 'isolate' }}
      width="full"
    >
      <Box
        borderColor="actionButtonBorder"
        borderRadius="13"
        borderStyle="solid"
        borderWidth="1"
        style={{
          bottom: '0',
          left: '0',
          position: 'absolute',
          right: '0',
          top: '0',
          zIndex: 1,
        }}
      />
      {isBrowserCard && (
        <Box
          background="downloadTopCardBackground"
          height="full"
          position="absolute"
          style={{
            zIndex: 0,
          }}
          width="full"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            style={{
              bottom: '0',
              filter: 'blur(20px)',
              left: '0',
              position: 'absolute',
              right: '0',
              top: '0',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <Box
              style={{
                filter: 'blur(100px)',
                marginLeft: -27,
                marginTop: -20,
                opacity: 0.6,
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <AsyncImage
                borderRadius="full"
                height="200"
                src={iconUrl}
                width="200"
              />
            </Box>
            <Box
              style={{
                filter: 'blur(100px)',
                marginRight: 0,
                marginTop: 105,
                opacity: 0.6,
                overflow: 'auto',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <AsyncImage
                borderRadius="full"
                height="200"
                src={iconUrl}
                width="200"
              />
            </Box>
          </Box>
        </Box>
      )}
      {!isBrowserCard && gradientRgbas && (
        <Box
          background="downloadBottomCardBackground"
          style={{
            bottom: '0',
            left: '0',
            position: 'absolute',
            right: '0',
            top: '0',
          }}
        >
          <Box
            position="absolute"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[0]} 0%, ${gradientRgbas[1]} 25%, rgba(0,0,0,0) 100%)`,
              height: 564,
              left: -215,
              top: -197,
              transform: 'translate3d(0, 0, 0)',
              width: 564,
            }}
          />
          <Box
            position="absolute"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[2]} 0%, rgba(0, 0, 0, 0) 100%)`,
              height: 564,
              left: -1,
              top: -76,
              transform: 'translate3d(0, 0, 0)',
              width: 564,
            }}
          />
        </Box>
      )}
      <Box
        alignItems="flex-start"
        display="flex"
        flexDirection="row"
        gap="24"
        height="max"
        justifyContent="center"
        style={{ zIndex: 1 }}
      >
        <Box>
          <AsyncImage
            height="60"
            src={iconUrl}
            width="60"
            {...(iconBackground
              ? {
                  background: iconBackground,
                  borderColor: 'generalBorder',
                  borderRadius: '10',
                }
              : null)}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="4"
          style={{ flex: 1 }}
          width="full"
        >
          <Text color="modalText" size="14" weight="bold">
            {title}
          </Text>
          <Text color="modalTextSecondary" size="14" weight="medium">
            {description}
          </Text>
          <Box marginTop="14" width="max">
            <ActionButton
              href={url}
              label={actionLabel}
              onClick={onAction}
              size="medium"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export function DownloadOptionsDetail({
  changeWalletStep,
  wallet,
}: {
  changeWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  const browser = getBrowser();
  const modalSize = useContext(ModalSizeContext);
  const isCompact = modalSize === 'compact';
  const { extension } = wallet;

  useEffect(() => {
    // Preload icons used on next screen
    preloadCreateIcon();
    preloadScanIcon();
    preloadRefreshIcon();
  }, []);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="24"
      height="full"
      marginBottom="8"
      marginTop="4"
      width="full"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="8"
        height="full"
        justifyContent="center"
        width="full"
      >
        <DownloadOptionsBox
          actionLabel={`Add to ${browser}`}
          description="Access your wallet right from your favorite web browser."
          iconUrl={getBrowserSrc}
          isCompact={isCompact}
          onAction={() =>
            changeWalletStep(
              extension?.instructions
                ? WalletStep.InstructionsExtension
                : WalletStep.Connect
            )
          }
          title={`${wallet.name} for ${browser}`}
          url={getBrowserDownloadUrl(wallet)}
          variant="browser"
        />
        <DownloadOptionsBox
          actionLabel="Get the app"
          description="Use the mobile wallet to explore the world of Ethereum."
          iconAccent={wallet.iconAccent}
          iconBackground={wallet.iconBackground}
          iconUrl={wallet.iconUrl}
          isCompact={isCompact}
          onAction={() => {
            changeWalletStep(WalletStep.Download);
          }}
          title={`${wallet.name} for Mobile`}
          variant="app"
        />
      </Box>
    </Box>
  );
}

export function DownloadDetail({
  changeWalletStep,
  wallet,
}: {
  changeWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  const { downloadUrls, qrCode } = wallet;

  useEffect(() => {
    // Preload icons used on next screen
    preloadCreateIcon();
    preloadScanIcon();
  }, []);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="24"
      height="full"
      width="full"
    >
      <Box style={{ maxWidth: 220, textAlign: 'center' }}>
        <Text color="modalTextSecondary" size="14" weight="semibold">
          Scan with your phone to download on iOS or Android
        </Text>
      </Box>
      <Box height="full">
        {downloadUrls?.qrCode ? (
          <QRCode logoSize={0} size={268} uri={downloadUrls.qrCode} />
        ) : null}
      </Box>

      <Box
        alignItems="center"
        borderRadius="10"
        display="flex"
        flexDirection="row"
        gap="8"
        height="34"
        justifyContent="space-between"
        marginBottom="12"
        paddingY="8"
      >
        <ActionButton
          label="Continue"
          onClick={() =>
            changeWalletStep(
              qrCode?.instructions
                ? WalletStep.InstructionsMobile
                : WalletStep.Connect
            )
          }
        />
      </Box>
    </Box>
  );
}

const stepIcons: Record<
  InstructionStepName,
  (wallet: WalletConnector) => ReactNode
> = {
  create: () => <CreateIcon />,
  install: wallet => (
    <AsyncImage
      background={wallet.iconBackground}
      borderColor="generalBorder"
      borderRadius="10"
      height="48"
      src={wallet.iconUrl}
      width="48"
    />
  ),
  refresh: () => <RefreshIcon />,
  scan: () => <ScanIcon />,
};

export function InstructionMobileDetail({
  connectWallet,
  wallet,
}: {
  connectWallet: (wallet: WalletConnector) => void;
  wallet: WalletConnector;
}) {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="full"
      width="full"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="28"
        height="full"
        justifyContent="center"
        paddingY="32"
        style={{ maxWidth: 320 }}
      >
        {wallet?.qrCode?.instructions?.steps.map((d, idx) => (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            gap="16"
            key={idx}
          >
            <Box
              borderRadius="10"
              height="48"
              minWidth="48"
              overflow="hidden"
              position="relative"
              width="48"
            >
              {stepIcons[d.step]?.(wallet)}
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <Text color="modalText" size="14" weight="bold">
                {d.title}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {d.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="12"
        justifyContent="center"
        marginBottom="16"
      >
        <ActionButton label="Connect" onClick={() => connectWallet(wallet)} />
        <Box
          as="a"
          className={touchableStyles({ active: 'shrink', hover: 'grow' })}
          display="block"
          href={wallet?.qrCode?.instructions?.learnMoreUrl}
          paddingX="12"
          paddingY="4"
          rel="noreferrer"
          style={{ willChange: 'transform' }}
          target="_blank"
          transition="default"
        >
          <Text color="accentColor" size="14" weight="bold">
            Learn More
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export function InstructionExtensionDetail({
  wallet,
}: {
  wallet: WalletConnector;
}) {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="full"
      width="full"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="28"
        height="full"
        justifyContent="center"
        paddingY="32"
        style={{ maxWidth: 320 }}
      >
        {wallet?.extension?.instructions?.steps.map((d, idx) => (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            gap="16"
            key={idx}
          >
            <Box
              borderRadius="10"
              height="48"
              minWidth="48"
              overflow="hidden"
              position="relative"
              width="48"
            >
              {stepIcons[d.step]?.(wallet)}
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <Text color="modalText" size="14" weight="bold">
                {d.title}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {d.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="12"
        justifyContent="center"
        marginBottom="16"
      >
        <ActionButton
          label="Refresh"
          onClick={window.location.reload.bind(window.location)}
        />
        <Box
          as="a"
          className={touchableStyles({ active: 'shrink', hover: 'grow' })}
          display="block"
          href={wallet?.extension?.instructions?.learnMoreUrl}
          paddingX="12"
          paddingY="4"
          rel="noreferrer"
          style={{ willChange: 'transform' }}
          target="_blank"
          transition="default"
        >
          <Text color="accentColor" size="14" weight="bold">
            Learn More
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
