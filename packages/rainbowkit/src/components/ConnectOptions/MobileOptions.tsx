import React, { useCallback, useContext, useState } from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { isIOS } from '../../utils/isMobile';
import {
  useWalletConnectors,
  WalletConnector,
} from '../../wallets/useWalletConnectors';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { CloseButton } from '../CloseButton/CloseButton';
import { BackIcon } from '../Icons/Back';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { useCoolMode } from '../RainbowKitProvider/useCoolMode';
import { Text } from '../Text/Text';
import * as styles from './MobileOptions.css';

function WalletButton({
  onConnect,
  wallet,
}: {
  wallet: WalletConnector;
  onConnect?: () => void;
}) {
  const {
    connect,
    iconBackground,
    iconUrl,
    id,
    mobile,
    name,
    onConnecting,
    ready,
    shortName,
  } = wallet;
  const getMobileUri = mobile?.getUri;
  const coolModeRef = useCoolMode(iconUrl);

  return (
    <Box
      as="button"
      color={ready ? 'modalText' : 'modalTextSecondary'}
      disabled={!ready}
      fontFamily="body"
      key={id}
      onClick={useCallback(async () => {
        connect?.();
        onConnect?.();

        onConnecting?.(async () => {
          if (getMobileUri) {
            window.location.href = await getMobileUri();
          }
        });
      }, [connect, getMobileUri, onConnecting, onConnect])}
      ref={coolModeRef}
      style={{ overflow: 'visible', textAlign: 'center' }}
      type="button"
      width="full"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box paddingBottom="8" paddingTop="10">
          <AsyncImage
            background={iconBackground}
            borderRadius="13"
            boxShadow="walletLogo"
            height="60"
            src={iconUrl}
            width="60"
          />
        </Box>
        <Box display="flex" flexDirection="column" textAlign="center">
          <Text
            as="h2"
            color={wallet.ready ? 'modalText' : 'modalTextSecondary'}
            size="13"
            weight="medium"
          >
            {/* Fix button text clipping in Safari: https://stackoverflow.com/questions/41100273/overflowing-button-text-is-being-clipped-in-safari */}
            <Box as="span" position="relative">
              {shortName ?? name}
              {!wallet.ready && ' (unsupported)'}
            </Box>
          </Text>

          {wallet.recent && (
            <Text color="accentColor" size="12" weight="medium">
              Recent
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

enum MobileWalletStep {
  Connect = 'CONNECT',
  Get = 'GET',
}

export function MobileOptions({
  onClose,
  onConnect,
}: {
  onClose: () => void;
  onConnect?: () => void;
}) {
  const titleId = 'rk_connect_title';
  const wallets = useWalletConnectors();
  const { learnMoreUrl } = useContext(AppContext);

  let headerLabel = null;
  let walletContent = null;
  let headerBackgroundContrast = false;
  let headerBackButtonLink: MobileWalletStep | null = null;

  const [walletStep, setWalletStep] = useState<MobileWalletStep>(
    MobileWalletStep.Connect
  );

  const ios = isIOS();

  switch (walletStep) {
    case MobileWalletStep.Connect: {
      headerLabel = 'Connect a Wallet';
      headerBackgroundContrast = true;
      walletContent = (
        <>
          <Box
            background="profileForeground"
            className={styles.scroll}
            display="flex"
            paddingBottom="20"
            paddingTop="6"
          >
            <Box display="flex" style={{ margin: '0 auto' }}>
              {wallets
                .filter(wallet => wallet.ready)
                .map(wallet => {
                  return (
                    <Box key={wallet.id} paddingX="20">
                      <Box width="60">
                        <WalletButton onConnect={onConnect} wallet={wallet} />
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>

          <Box
            background="generalBorder"
            height="1"
            marginBottom="32"
            marginTop="-1"
          />

          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="32"
            paddingX="32"
            style={{ textAlign: 'center' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="8"
              textAlign="center"
            >
              <Text color="modalText" size="16" weight="bold">
                What is a Wallet?
              </Text>
              <Text color="modalTextSecondary" size="16">
                A wallet is used to send, receive, store, and display digital
                assets. It&rsquo;s also a new way to log in, without needing to
                create new accounts and passwords on&nbsp;every&nbsp;website.
              </Text>
            </Box>
          </Box>

          <Box paddingTop="32" paddingX="20">
            <Box display="flex" gap="14" justifyContent="center">
              <ActionButton
                label="Get a Wallet"
                onClick={() => setWalletStep(MobileWalletStep.Get)}
                size="large"
                type="secondary"
              />
              <ActionButton
                href={learnMoreUrl}
                label="Learn More"
                size="large"
                type="secondary"
              />
            </Box>
          </Box>
        </>
      );
      break;
    }
    case MobileWalletStep.Get: {
      headerLabel = 'Get a Wallet';
      headerBackButtonLink = MobileWalletStep.Connect;

      const mobileWallets = wallets
        ?.filter(
          wallet => wallet.downloadUrls?.ios || wallet.downloadUrls?.android
        )
        ?.splice(0, 3);

      walletContent = (
        <>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            height="full"
            marginBottom="36"
            marginTop="5"
            paddingTop="12"
            width="full"
          >
            {mobileWallets.map((wallet, index) => {
              const { downloadUrls, iconBackground, iconUrl, name } = wallet;

              if (!downloadUrls?.ios && !downloadUrls?.android) {
                return null;
              }

              return (
                <Box
                  display="flex"
                  gap="16"
                  key={wallet.id}
                  paddingX="20"
                  width="full"
                >
                  <Box style={{ minHeight: 48, minWidth: 48 }}>
                    <AsyncImage
                      background={iconBackground}
                      borderColor="generalBorder"
                      borderRadius="10"
                      height="48"
                      src={iconUrl}
                      width="48"
                    />
                  </Box>
                  <Box display="flex" flexDirection="column" width="full">
                    <Box alignItems="center" display="flex" height="48">
                      <Box width="full">
                        <Text color="modalText" size="18" weight="bold">
                          {name}
                        </Text>
                      </Box>
                      <ActionButton
                        href={ios ? downloadUrls?.ios : downloadUrls?.android}
                        label="GET"
                        size="small"
                        type="secondary"
                      />
                    </Box>
                    {index < mobileWallets.length - 1 && (
                      <Box
                        background="generalBorderDim"
                        height="1"
                        marginY="10"
                        width="full"
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
          {/* spacer */}
          <Box style={{ marginBottom: '42px' }} />
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="36"
            paddingX="36"
            style={{ textAlign: 'center' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="12"
              textAlign="center"
            >
              <Text color="modalText" size="16" weight="bold">
                Not what you&rsquo;re looking for?
              </Text>
              <Text color="modalTextSecondary" size="16">
                Select a wallet on the main screen to get started with a
                different wallet provider.
              </Text>
            </Box>
          </Box>
        </>
      );
      break;
    }
  }

  return (
    <Box display="flex" flexDirection="column" paddingBottom="36">
      {/* header section */}
      <Box
        background={
          headerBackgroundContrast ? 'profileForeground' : 'modalBackground'
        }
        display="flex"
        flexDirection="column"
        paddingBottom="4"
        paddingTop="14"
      >
        <Box
          display="flex"
          justifyContent="center"
          paddingBottom="6"
          paddingX="20"
          position="relative"
        >
          {headerBackButtonLink && (
            <Box
              display="flex"
              position="absolute"
              style={{
                left: 0,
                marginBottom: -20,
                marginTop: -20,
              }}
            >
              <Box
                as="button"
                className={increaseHitAreaForHoverTransform.growLg}
                onClick={() => setWalletStep(headerBackButtonLink!)}
                type="button"
              >
                <Box
                  alignItems="center"
                  color="accentColor"
                  display="flex"
                  marginLeft="4"
                  marginTop="20"
                  padding="16"
                  style={{ height: 17, willChange: 'transform' }}
                  transform={{ active: 'shrinkSm', hover: 'growLg' }}
                  transition="default"
                >
                  <BackIcon />
                </Box>
              </Box>
            </Box>
          )}

          <Box marginTop="4" textAlign="center" width="full">
            <Text
              as="h1"
              color="modalText"
              id={titleId}
              size="20"
              weight="bold"
            >
              {headerLabel}
            </Text>
          </Box>

          <Box
            alignItems="center"
            display="flex"
            height="32"
            paddingRight="14"
            position="absolute"
            right="0"
          >
            <Box
              style={{ marginBottom: -20, marginTop: -20 }} // Vertical bleed
            >
              <CloseButton onClose={onClose} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        {walletContent}
      </Box>
    </Box>
  );
}
