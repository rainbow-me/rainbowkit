import React, { ElementType, ReactNode } from 'react';
import { InstructionStepName } from '../../wallets/Wallet';
import {
  useWalletConnectors,
  WalletConnector,
} from '../../wallets/useWalletConnectors';
import { Box, BoxProps } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { CreateIcon } from '../Icons/Create';
import { ScanIcon } from '../Icons/Scan';
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

  const linkProps = (
    link: string
  ): { as: ElementType; href: string; rel: string; target: string } => ({
    as: 'a',
    href: link,
    rel: 'noreferrer',
    target: '_blank',
  });

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
            const { downloadUrls, iconUrl, id, name, qrCode } = wallet;
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
                  <Box
                    borderRadius="10"
                    height="48"
                    src={iconUrl}
                    style={{
                      background: `url(${iconUrl})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      touchCallout: 'none',
                      userSelect: 'none',
                    }}
                    width="48"
                  >
                    <Box
                      borderColor="actionButtonBorder"
                      borderRadius="10"
                      borderStyle="solid"
                      borderWidth="1"
                      height="full"
                      width="full"
                    />
                  </Box>
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
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="4"
                  onClick={() => hasMobileCompanionApp && getMobileWallet(id)}
                  {...(!hasMobileCompanionApp && downloadUrls?.browserExtension
                    ? linkProps(downloadUrls.browserExtension)
                    : {})}
                >
                  <ActionButton
                    label="GET"
                    onClick={() => {}}
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
  connectionError,
  setWalletStep,
  wallet,
}: {
  connectionError: boolean;
  setWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  const { downloadUrls, iconUrl, name, qrCode, ready, showWalletConnectModal } =
    wallet;

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
    onClick: () => void;
  } = showWalletConnectModal
    ? {
        description: 'Need the official WalletConnect modal?',
        label: 'OPEN',
        onClick: showWalletConnectModal,
      }
    : qrCode
    ? {
        description: `Don\u2019t have the ${name} App?`,
        label: 'GET',
        onClick: () => setWalletStep(WalletStep.Download),
      }
    : {
        description: `Confirm the connection in ${name}`,
        label: 'RETRY',
        onClick: () => wallet?.connect?.(),
      };

  return (
    <Box display="flex" flexDirection="column" height="full" width="full">
      {qrCode ? (
        <Box height="full">
          <QRCode
            logoSize={72}
            logoUri={qrCode.iconUrl ?? iconUrl}
            size={382}
            uri={qrCode.getUri()}
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
              <img
                alt={name}
                height={LOGO_SIZE}
                src={iconUrl}
                width={LOGO_SIZE}
              />
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
                paddingX="28"
              >
                {connectionError ? (
                  <Text color="error" size="16" weight="bold">
                    Error connecting, please retry!
                  </Text>
                ) : (
                  <>
                    {ready ? <SpinnerIcon /> : null}
                    <Text color="modalTextSecondary" size="16" weight="bold">
                      {readyMsg}
                    </Text>
                  </>
                )}
              </Box>
              {!ready && downloadUrls?.browserExtension ? (
                <Box paddingTop="8">
                  <ActionButton
                    href={downloadUrls.browserExtension}
                    label="Install"
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
        marginTop="6"
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
  setWalletStep,
  wallet,
}: {
  setWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  const { downloadUrls, qrCode } = wallet;
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
            setWalletStep(
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
    <Box
      alt={wallet.name}
      as="img"
      height="48"
      src={wallet.iconUrl}
      width="48"
    />
  ),
  scan: () => <ScanIcon />,
};

export function InstructionDetail({
  setWalletStep,
  wallet,
}: {
  setWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  return (
    <Box display="flex" flexDirection="column" height="full" width="full">
      <Box
        display="flex"
        flexDirection="column"
        gap="28"
        height="full"
        justifyContent="center"
        padding="32"
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
          label="Connect"
          onClick={() => setWalletStep(WalletStep.Connect)}
        />
        <Box
          as="a"
          href={wallet?.qrCode?.instructions?.learnMoreUrl}
          paddingX="12"
          paddingY="4"
          rel="noreferrer"
          style={{ willChange: 'transform' }}
          target="_blank"
          transform={{ active: 'shrink', hover: 'grow' }}
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
