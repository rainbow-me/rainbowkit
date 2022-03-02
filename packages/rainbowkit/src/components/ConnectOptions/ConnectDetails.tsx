import React from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
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
                color="accentColor"
                display="flex"
                flexDirection="row"
                gap="6"
              >
                <SpinnerIcon />
                <Text color="accentColor" size="16" weight="bold">
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
            />
          </>
        ) : (
          <>
            <Text color="menuTextSecondary" size="14" weight="bold">
              Confirm the connection in {name}
            </Text>
            <Button label="Reopen" onClick={() => wallet?.connect?.()} />
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
    <Box display="flex" flexDirection="column" height="full" width="full">
      <Box height="full">
        {qrCode?.logoUri && downloadUrl ? (
          <QRCode
            logoSize={72}
            logoUri={qrCode.logoUri}
            size={378}
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
        marginTop="6"
        paddingY="8"
      >
        <>
          <Text color="menuTextSecondary" size="14" weight="bold">
            Successfully downloaded?
          </Text>
          <Button
            label="Continue"
            onClick={() => setWalletStep(WalletStep.Instructions)}
          />
        </>
      </Box>
    </Box>
  );
}

const instructionData = (wallet: WalletConnector) => [
  {
    id: 1,
    label: `Open ${wallet.name}`,
    logo: <img alt={wallet.name} height={40} src={wallet.iconUrl} width={40} />,
  },
  {
    id: 2,
    label: `Create or import a wallet`,
    logo: (
      <Box color="modalText">
        <ScanIcon />
      </Box>
    ),
  },
  {
    id: 3,
    label: `Tap the scan button`,
    logo: (
      <Box color="modalText">
        <ScanIcon />
      </Box>
    ),
  },
];

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
        gap="20"
        height="full"
        justifyContent="center"
        marginLeft="28"
      >
        {wallet &&
          instructionData(wallet).map(d => (
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              gap="20"
              key={d.id}
            >
              <Box
                alignItems="center"
                background="accentColor"
                borderRadius="full"
                display="flex"
                height="20"
                justifyContent="center"
                width="20"
              >
                <Text color="buttonText" size="13" weight="heavy">
                  {d.id}
                </Text>
              </Box>
              <Box>{d.logo}</Box>
              <Text color="modalText" size="16" weight="heavy">
                {d.label}
              </Text>
            </Box>
          ))}
      </Box>

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
        <>
          <Text color="menuTextSecondary" size="14" weight="bold">
            Completed these steps?
          </Text>
          <Button
            label="Connect"
            onClick={() => setWalletStep(WalletStep.Connect)}
          />
        </>
      </Box>
    </Box>
  );
}
