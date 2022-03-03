import React from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { CreateIcon } from '../Icons/Create';
import { ScanIcon } from '../Icons/Scan';
import { SpinnerIcon } from '../Icons/Spinner';
import { QRCode } from '../QRCode/QRCode';
import { WalletConnector } from '../RainbowKitProvider/useWalletConnectors';
import { Text } from '../Text/Text';
import { WalletStep } from './DesktopOptions';
import { walletLogoClassName } from './DesktopOptions.css';

export function ConnectDetail({
  setWalletStep,
  wallet,
}: {
  setWalletStep: (newWalletStep: WalletStep) => void;
  wallet: WalletConnector;
}) {
  const { iconUrl, name, useDesktopWalletDetail } = wallet;
  // @ts-ignore couldn't fix this error rn, need another type impl that can be added in another PR
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
            >
              <Text color="modalText" size="20" weight="bold">
                Opening {name}
              </Text>
              <Box
                color="modalTextSecondary"
                display="flex"
                flexDirection="row"
                gap="6"
              >
                <SpinnerIcon />
                <Text color="modalTextSecondary" size="16" weight="bold">
                  Waiting for connection
                </Text>
              </Box>
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
        {name === 'Rainbow' ? (
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
  const { downloadUrl, useDesktopWalletDetail } = wallet;
  // @ts-ignore couldn't fix this error rn, need another type impl that can be added in another PR
  const { qrCode } = useDesktopWalletDetail();
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
        {qrCode?.logoUri && downloadUrl ? (
          <QRCode
            logoSize={0}
            logoUri={qrCode.logoUri}
            size={268}
            uri={downloadUrl}
          />
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
