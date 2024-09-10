import React, { type ReactNode, useContext, useEffect } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { useWindowSize } from '../../hooks/useWindowSize';
import { BrowserType, getBrowser, isSafari } from '../../utils/browsers';
import { getGradientRGBAs } from '../../utils/colors';
import { PlatformType, getPlatform } from '../../utils/platforms';
import type { InstructionStepName } from '../../wallets/Wallet';
import {
  type WalletConnector,
  useWalletConnectors,
} from '../../wallets/useWalletConnectors';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { Box, type BoxProps } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { ConnectIcon, preloadConnectIcon } from '../Icons/Connect';
import { CreateIcon, preloadCreateIcon } from '../Icons/Create';
import { RefreshIcon, preloadRefreshIcon } from '../Icons/Refresh';
import { ScanIcon, preloadScanIcon } from '../Icons/Scan';
import { SpinnerIcon } from '../Icons/Spinner';
import { QRCode } from '../QRCode/QRCode';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { ModalSizeContext } from '../RainbowKitProvider/ModalSizeContext';
import { Text } from '../Text/Text';
import { WalletStep } from './DesktopOptions';

const getBrowserSrc: () => Promise<string> = async () => {
  const browser = getBrowser();
  switch (browser) {
    case BrowserType.Arc:
      return (await import('../Icons/Arc.svg')).default;
    case BrowserType.Brave:
      return (await import('../Icons/Brave.svg')).default;
    case BrowserType.Chrome:
      return (await import('../Icons/Chrome.svg')).default;
    case BrowserType.Edge:
      return (await import('../Icons/Edge.svg')).default;
    case BrowserType.Firefox:
      return (await import('../Icons/Firefox.svg')).default;
    case BrowserType.Opera:
      return (await import('../Icons/Opera.svg')).default;
    case BrowserType.Safari:
      return (await import('../Icons/Safari.svg')).default;
    default:
      return (await import('../Icons/Browser.svg')).default;
  }
};

const preloadBrowserIcon = () => loadImages(getBrowserSrc);

const getPlatformSrc: () => Promise<string> = async () => {
  const platform = getPlatform();
  switch (platform) {
    case PlatformType.Windows:
      return (await import('../Icons/Windows.svg')).default;
    case PlatformType.MacOS:
      return (await import('../Icons/Macos.svg')).default;
    case PlatformType.Linux:
      return (await import('../Icons/Linux.svg')).default;
    default:
      return (await import('../Icons/Linux.svg')).default;
  }
};

const preloadPlatformIcon = () => loadImages(getPlatformSrc);

export function GetDetail({
  getWalletDownload,
  compactModeEnabled,
}: {
  getWalletDownload: (walletId: string) => void;
  compactModeEnabled: boolean;
}) {
  const wallets = useWalletConnectors().filter(
    (wallet) => wallet.isRainbowKitConnector,
  );

  const shownWallets = wallets.splice(0, 5);

  const { i18n } = useContext(I18nContext);

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
            (wallet) =>
              wallet.extensionDownloadUrl ||
              wallet.desktopDownloadUrl ||
              (wallet.qrCode && wallet.downloadUrls?.qrCode),
          )
          .map((wallet) => {
            const { downloadUrls, iconBackground, iconUrl, id, name, qrCode } =
              wallet;
            const hasMobileCompanionApp = downloadUrls?.qrCode && qrCode;
            const hasExtension = !!wallet.extensionDownloadUrl;
            const hasMobileAndExtension = downloadUrls?.qrCode && hasExtension;
            const hasMobileAndDesktop =
              downloadUrls?.qrCode && !!wallet.desktopDownloadUrl;

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
                        ? i18n.t('get.mobile_and_extension.description')
                        : hasMobileAndDesktop
                          ? i18n.t('get.mobile_and_desktop.description')
                          : hasMobileCompanionApp
                            ? i18n.t('get.mobile.description')
                            : hasExtension
                              ? i18n.t('get.extension.description')
                              : null}
                    </Text>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap="4">
                  <ActionButton
                    label={i18n.t('get.action.label')}
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
          {i18n.t('get.looking_for.title')}
        </Text>
        <Text color="modalTextSecondary" size="14" weight="medium">
          {compactModeEnabled
            ? i18n.t('get.looking_for.desktop.compact_description')
            : i18n.t('get.looking_for.desktop.wide_description')}
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
  onClose,
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
  onClose: () => void;
}) {
  const {
    downloadUrls,
    iconBackground,
    iconUrl,
    name,
    qrCode,
    ready,
    showWalletConnectModal,
    getDesktopUri,
  } = wallet;
  const isDesktopDeepLinkAvailable = !!getDesktopUri;
  const safari = isSafari();

  const { i18n } = useContext(I18nContext);

  const hasExtension = !!wallet.extensionDownloadUrl;
  const hasQrCodeAndExtension = downloadUrls?.qrCode && hasExtension;
  const hasQrCodeAndDesktop =
    downloadUrls?.qrCode && !!wallet.desktopDownloadUrl;
  const hasQrCode = qrCode && qrCodeUri;

  const onDesktopUri = async () => {
    const uri = await getDesktopUri?.();
    window.open(uri, safari ? '_blank' : '_self');
  };

  const secondaryAction: {
    description: string;
    label: string;
    onClick?: () => void;
    href?: string;
  } | null = showWalletConnectModal
    ? {
        description: !compactModeEnabled
          ? i18n.t('connect.walletconnect.description.full')
          : i18n.t('connect.walletconnect.description.compact'),
        label: i18n.t('connect.walletconnect.open.label'),
        onClick: () => {
          onClose();
          showWalletConnectModal();
        },
      }
    : hasQrCode
      ? {
          description: i18n.t('connect.secondary_action.get.description', {
            wallet: name,
          }),
          label: i18n.t('connect.secondary_action.get.label'),
          onClick: () =>
            changeWalletStep(
              hasQrCodeAndExtension || hasQrCodeAndDesktop
                ? WalletStep.DownloadOptions
                : WalletStep.Download,
            ),
        }
      : null;

  const { width: windowWidth } = useWindowSize();
  const smallWindow = windowWidth && windowWidth < 768;

  useEffect(() => {
    // Preload icon used on next screen
    preloadBrowserIcon();
    preloadPlatformIcon();
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
              <AsyncImage
                useAsImage={!wallet.isRainbowKitConnector}
                height={LOGO_SIZE}
                src={iconUrl}
                width={LOGO_SIZE}
              />
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
                  ? i18n.t('connect.status.opening', {
                      wallet: name,
                    })
                  : hasExtension
                    ? i18n.t('connect.status.not_installed', {
                        wallet: name,
                      })
                    : i18n.t('connect.status.not_available', {
                        wallet: name,
                      })}
              </Text>
              {!ready && hasExtension ? (
                <Box paddingTop="20">
                  <ActionButton
                    href={wallet.extensionDownloadUrl}
                    label={i18n.t('connect.secondary_action.install.label')}
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
                      {i18n.t('connect.status.confirm')}
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
                        label={i18n.t('connect.secondary_action.retry.label')}
                        onClick={async () => {
                          if (isDesktopDeepLinkAvailable) onDesktopUri();
                          reconnect(wallet);
                        }}
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
  variant: 'browser' | 'app' | 'desktop';
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
  const platform = getPlatform();
  const modalSize = useContext(ModalSizeContext);
  const isCompact = modalSize === 'compact';
  const {
    desktop,
    desktopDownloadUrl,
    extension,
    extensionDownloadUrl,
    mobileDownloadUrl,
  } = wallet;

  const { i18n } = useContext(I18nContext);

  useEffect(() => {
    // Preload icons used on next screen
    preloadCreateIcon();
    preloadScanIcon();
    preloadRefreshIcon();
    preloadConnectIcon();
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
        {extensionDownloadUrl && (
          <DownloadOptionsBox
            actionLabel={i18n.t('get_options.extension.download.label', {
              browser,
            })}
            description={i18n.t('get_options.extension.description')}
            iconUrl={getBrowserSrc}
            isCompact={isCompact}
            onAction={() =>
              changeWalletStep(
                extension?.instructions
                  ? WalletStep.InstructionsExtension
                  : WalletStep.Connect,
              )
            }
            title={i18n.t('get_options.extension.title', {
              wallet: wallet.name,
              browser,
            })}
            url={extensionDownloadUrl}
            variant="browser"
          />
        )}
        {desktopDownloadUrl && (
          <DownloadOptionsBox
            actionLabel={i18n.t('get_options.desktop.download.label', {
              platform,
            })}
            description={i18n.t('get_options.desktop.description')}
            iconUrl={getPlatformSrc}
            isCompact={isCompact}
            onAction={() =>
              changeWalletStep(
                desktop?.instructions
                  ? WalletStep.InstructionsDesktop
                  : WalletStep.Connect,
              )
            }
            title={i18n.t('get_options.desktop.title', {
              wallet: wallet.name,
              platform,
            })}
            url={desktopDownloadUrl}
            variant="desktop"
          />
        )}
        {mobileDownloadUrl && (
          <DownloadOptionsBox
            actionLabel={i18n.t('get_options.mobile.download.label', {
              wallet: wallet.name,
            })}
            description={i18n.t('get_options.mobile.description')}
            iconAccent={wallet.iconAccent}
            iconBackground={wallet.iconBackground}
            iconUrl={wallet.iconUrl}
            isCompact={isCompact}
            onAction={() => {
              changeWalletStep(WalletStep.Download);
            }}
            title={i18n.t('get_options.mobile.title', { wallet: wallet.name })}
            variant="app"
          />
        )}
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

  const { i18n } = useContext(I18nContext);

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
          {i18n.t('get_mobile.description')}
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
          label={i18n.t('get_mobile.continue.label')}
          onClick={() =>
            changeWalletStep(
              qrCode?.instructions
                ? WalletStep.InstructionsMobile
                : WalletStep.Connect,
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
  connect: () => <ConnectIcon />,
  create: () => <CreateIcon />,
  install: (wallet) => (
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
  const { i18n } = useContext(I18nContext);

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
                {i18n.t(d.title, undefined, {
                  rawKeyIfTranslationMissing: true,
                })}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {i18n.t(d.description, undefined, {
                  rawKeyIfTranslationMissing: true,
                })}
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
          label={i18n.t('get_instructions.mobile.connect.label')}
          onClick={() => connectWallet(wallet)}
        />
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
            {i18n.t('get_instructions.mobile.learn_more.label')}
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
  const { i18n } = useContext(I18nContext);

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
                {i18n.t(d.title, undefined, {
                  rawKeyIfTranslationMissing: true,
                })}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {i18n.t(d.description, undefined, {
                  rawKeyIfTranslationMissing: true,
                })}
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
          label={i18n.t('get_instructions.extension.refresh.label')}
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
            {i18n.t('get_instructions.extension.learn_more.label')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export function InstructionDesktopDetail({
  connectWallet,
  wallet,
}: {
  connectWallet: (wallet: WalletConnector) => void;
  wallet: WalletConnector;
}) {
  const { i18n } = useContext(I18nContext);

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
        {wallet?.desktop?.instructions?.steps.map((d, idx) => (
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
                {i18n.t(d.title, undefined, {
                  rawKeyIfTranslationMissing: true,
                })}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {i18n.t(d.description, undefined, {
                  rawKeyIfTranslationMissing: true,
                })}
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
          label={i18n.t('get_instructions.desktop.connect.label')}
          onClick={() => connectWallet(wallet)}
        />
        <Box
          as="a"
          className={touchableStyles({ active: 'shrink', hover: 'grow' })}
          display="block"
          href={wallet?.desktop?.instructions?.learnMoreUrl}
          paddingX="12"
          paddingY="4"
          rel="noreferrer"
          style={{ willChange: 'transform' }}
          target="_blank"
          transition="default"
        >
          <Text color="accentColor" size="14" weight="bold">
            {i18n.t('get_instructions.desktop.learn_more.label')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
