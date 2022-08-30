import React, { ReactNode, useEffect } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { useWindowSize } from '../../hooks/useWindowSize';
import { isSafari } from '../../utils/browsers';
import { InstructionStepName } from '../../wallets/Wallet';
import {
  useWalletConnectors,
  WalletConnector,
} from '../../wallets/useWalletConnectors';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box, BoxProps } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { CreateIcon, preloadCreateIcon } from '../Icons/Create';
import { preloadScanIcon, ScanIcon } from '../Icons/Scan';
import { SpinnerIcon } from '../Icons/Spinner';
import { QRCode } from '../QRCode/QRCode';
import { Text } from '../Text/Text';
import { WalletStep } from './DesktopOptions';

export function GetDetail({
  getMobileWallet,
}: {
  getMobileWallet: (walletId: string) => void;
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
              wallet.downloadUrls?.browserExtension ||
              (wallet.qrCode && wallet.downloadUrls?.qrCode)
          )
          .map(wallet => {
            const { downloadUrls, iconBackground, iconUrl, id, name, qrCode } =
              wallet;
            const hasMobileCompanionApp = downloadUrls?.qrCode && qrCode;
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
                      {hasMobileCompanionApp
                        ? 'Mobile Wallet'
                        : downloadUrls?.browserExtension
                        ? 'Browser Extension'
                        : null}
                    </Text>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap="4">
                  <ActionButton
                    label="GET"
                    onClick={() => hasMobileCompanionApp && getMobileWallet(id)}
                    {...(!hasMobileCompanionApp &&
                    downloadUrls?.browserExtension
                      ? { href: downloadUrls.browserExtension }
                      : {})}
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

const LOGO_SIZE: BoxProps['height'] = '60'; // size of wallet logo in Connect tab
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
    shortName,
    showWalletConnectModal,
  } = wallet;
  const getDesktopDeepLink = wallet.desktop?.getUri;
  const safari = isSafari();
  let readyMsg;
  if (ready) {
    readyMsg = 'Waiting for connection';
  } else if (downloadUrls?.browserExtension) {
    readyMsg = `The ${name} extension is not installed in your browser`;
  } else {
    readyMsg = `${name} is not available on this device`;
  }

  const secondaryAction: {
    description: string;
    label: string;
    onClick?: () => void;
    href?: string;
  } = showWalletConnectModal
    ? {
        description: `Need the ${
          compactModeEnabled ? '' : 'official'
        } WalletConnect modal?`,
        label: 'OPEN',
        onClick: showWalletConnectModal,
      }
    : qrCode && qrCodeUri
    ? {
        description: `Don\u2019t have the ${name} app?`,
        label: 'GET',
        onClick: () => changeWalletStep(WalletStep.Download),
      }
    : {
        description: `Confirm connection in ${
          compactModeEnabled ? shortName || name : name
        }`,
        label: 'RETRY',
        onClick: getDesktopDeepLink
          ? async () => {
              const uri = await getDesktopDeepLink();
              window.open(uri, safari ? '_blank' : '_self');
            }
          : () => reconnect(wallet),
      };
  const { width: windowWidth } = useWindowSize();
  const smallWindow = windowWidth && windowWidth < 768;

  return (
    <Box display="flex" flexDirection="column" height="full" width="full">
      {qrCode && qrCodeUri ? (
        <Box
          alignItems="center"
          display="flex"
          height="full"
          justifyContent="center"
        >
          <QRCode
            logoBackground={iconBackground}
            logoSize={smallWindow ? 60 : 72}
            logoUrl={iconUrl}
            size={
              smallWindow
                ? Math.max(280, Math.min(windowWidth - 308, 382))
                : compactModeEnabled
                ? 318
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
            gap="20"
          >
            <Box borderRadius="10" height={LOGO_SIZE} overflow="hidden">
              <AsyncImage height={LOGO_SIZE} src={iconUrl} width={LOGO_SIZE} />
            </Box>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              gap="10"
              paddingX="32"
              style={{ textAlign: 'center' }}
            >
              <Text color="modalText" size="20" weight="bold">
                {ready
                  ? `Opening ${name}`
                  : downloadUrls?.browserExtension
                  ? `${name} is not installed`
                  : `${name} is not available`}
              </Text>
              <Box
                color="modalTextSecondary"
                display="flex"
                flexDirection="row"
                gap="6"
                height="24"
              >
                {connectionError ? (
                  <Text
                    color="error"
                    size="16"
                    textAlign="center"
                    weight="bold"
                  >
                    Error connecting, please retry!
                  </Text>
                ) : (
                  <>
                    {ready ? <SpinnerIcon /> : null}
                    <Text
                      color="modalTextSecondary"
                      size="16"
                      textAlign="center"
                      weight="bold"
                    >
                      {readyMsg}
                    </Text>
                  </>
                )}
              </Box>
              {!ready && downloadUrls?.browserExtension ? (
                <Box paddingTop="20">
                  <ActionButton
                    href={downloadUrls.browserExtension}
                    label="INSTALL"
                    type="secondary"
                  />
                </Box>
              ) : null}
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
        {!ready ? null : (
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
                ? WalletStep.Instructions
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
  scan: () => <ScanIcon />,
};

export function InstructionDetail({
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
