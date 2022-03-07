import React, { ElementType } from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { CreateIcon } from '../Icons/Create';
import { ScanIcon } from '../Icons/Scan';
import { SpinnerIcon } from '../Icons/Spinner';
import { QRCode } from '../QRCode/QRCode';
import {
  useWalletConnectors,
  WalletConnector,
} from '../RainbowKitProvider/useWalletConnectors';
import { Text } from '../Text/Text';
import { WalletStep } from './DesktopOptions';
import { walletLogoClassName } from './DesktopOptions.css';

export function GetDetail({
  getMobileWallet,
}: {
  getMobileWallet: (walletId: string) => void;
}) {
  const wallets = useWalletConnectors();

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
        paddingX="4"
        width="full"
      >
        {wallets
          ?.filter(
            wallet =>
              wallet.downloadUrls?.browserExtension ??
              wallet.downloadUrls?.mobileCompanion ??
              wallet.downloadUrls?.desktop
          )
          .map(wallet => {
            const { downloadUrls, iconUrl, id, name } = wallet;
            const mobileDownload = downloadUrls?.mobileCompanion;
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
                  <Box height="48" minWidth="48" width="48">
                    <img alt={name} height={48} src={iconUrl} width={48} />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="4">
                    <Text color="modalText" size="14" weight="bold">
                      {name}
                    </Text>
                    <Text color="modalTextSecondary" size="14" weight="medium">
                      {downloadUrls?.mobileCompanion
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
                  onClick={() => mobileDownload && getMobileWallet(id)}
                  {...(!mobileDownload && downloadUrls?.browserExtension
                    ? linkProps(downloadUrls.browserExtension)
                    : {})}
                >
                  <Button label="GET" onClick={() => {}} type="secondary" />
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
          Not what you&apos;re looking for?
        </Text>
        <Text color="modalTextSecondary" size="14" weight="semibold">
          Select a wallet on the left to get started with a different wallet
          provider.
        </Text>
      </Box>
    </Box>
  );
}

export function ConnectDetail({
  setWalletStep,
  wallet,
}: {
  setWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  const { downloadUrls, iconUrl, name, ready, useDesktopWalletDetail } = wallet;
  const { qrCode } = useDesktopWalletDetail();

  return (
    <Box display="flex" flexDirection="column" height="full" width="full">
      {qrCode ? (
        <Box height="full">
          {qrCode?.uri ? (
            <QRCode
              logoSize={72}
              logoUri={qrCode.logoUri}
              size={378}
              uri={qrCode.uri}
            />
          ) : null}
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
            <img
              alt={name}
              className={walletLogoClassName}
              height="60"
              src={iconUrl}
              width="60"
            />
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
                {ready ? <SpinnerIcon /> : null}
                <Text color="modalTextSecondary" size="16" weight="bold">
                  {ready
                    ? 'Waiting for connection'
                    : downloadUrls?.browserExtension
                    ? `The ${name} extension is not installed in your browser`
                    : `${name} is not available on this device`}
                </Text>
              </Box>
              {!ready && downloadUrls?.browserExtension ? (
                <Box paddingTop="8">
                  <Button
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
        height="34"
        justifyContent="space-between"
        marginTop="6"
        paddingY="8"
      >
        {!ready ? null : name === 'Rainbow' ? (
          <>
            <Text color="menuTextSecondary" size="14" weight="bold">
              Don&apos;t have the Rainbow Mobile App Yet?
            </Text>
            <Button
              label="GET"
              onClick={() => setWalletStep(WalletStep.Download)}
              type="secondary"
            />
          </>
        ) : (
          <>
            <Text color="menuTextSecondary" size="14" weight="bold">
              Confirm the connection in {name}
            </Text>
            <Button
              label="Retry"
              onClick={() => wallet?.connect?.()}
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
  const { downloadUrls } = wallet;
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
          Scan with your phone to download in iOS or Android
        </Text>
      </Box>
      <Box height="full">
        {downloadUrls?.mobile ? (
          <QRCode logoSize={0} size={268} uri={downloadUrls.mobile} />
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
        <Button
          label="Continue"
          onClick={() => setWalletStep(WalletStep.Instructions)}
        />
      </Box>
    </Box>
  );
}

const instructionImgs = [<CreateIcon key="create" />, <ScanIcon key="scan" />];

export function InstructionDetail({
  setWalletStep,
  wallet,
}: {
  setWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  const renderedInstructionImgs = [
    <img
      alt={wallet.name}
      height="48"
      key="logo"
      src={wallet.iconUrl}
      width="48"
    />,
    ...instructionImgs,
  ];
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
        {wallet?.instructions?.map((d, idx) => (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            gap="16"
            key={idx}
          >
            <Box height="48" minWidth="48" width="48">
              {renderedInstructionImgs[idx]}
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <Text color="modalText" size="14" weight="bold">
                {d.title}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {d.subtitle}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="16"
        justifyContent="center"
        marginBottom="24"
      >
        <Button
          label="Connect"
          onClick={() => setWalletStep(WalletStep.Connect)}
        />
        <Text color="accentColor" weight="bold">
          Learn More
        </Text>
      </Box>
    </Box>
  );
}
