import React, { useState } from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { CloseButton } from '../CloseButton/CloseButton';
import { BackIcon } from '../Icons/Back';
import {
  useWalletConnectors,
  WalletConnector,
} from '../RainbowKitProvider/useWalletConnectors';
import { Text } from '../Text/Text';
import * as styles from './MobileOptions.css';

function WalletButton({ wallet }: { wallet: WalletConnector }) {
  const { iconUrl, id, name, ready, useMobileWalletButton } = wallet;
  const { onClick } = useMobileWalletButton();

  return (
    <Box
      as="button"
      color={ready ? 'modalText' : 'modalTextSecondary'}
      disabled={!ready}
      fontFamily="body"
      key={id}
      onClick={onClick}
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
        <Box
          alt={name}
          as="img"
          borderRadius="10"
          display="block"
          height="60"
          marginBottom="8"
          src={iconUrl}
          width="60"
        />
        <Text
          as="h2"
          color={wallet.ready ? 'modalText' : 'modalTextSecondary'}
          size="13"
          weight="medium"
        >
          {/* Fix button text clipping in Safari: https://stackoverflow.com/questions/41100273/overflowing-button-text-is-being-clipped-in-safari */}
          <Box as="span" position="relative">
            {name}
            {!wallet.ready && ' (unsupported)'}
          </Box>
        </Text>
      </Box>
    </Box>
  );
}

enum MobileWalletStep {
  Connect = 'CONNECT',
  Get = 'GET',
}

export function MobileOptions({ onClose }: { onClose: () => void }) {
  const titleId = 'rk_connect_title';
  const wallets = useWalletConnectors();

  let headerLabel = null;
  let walletContent = null;
  let headerBackButtonLink: MobileWalletStep | null = null;

  const [walletStep, setWalletStep] = useState<MobileWalletStep>(
    MobileWalletStep.Connect
  );

  switch (walletStep) {
    case MobileWalletStep.Connect: {
      headerLabel = 'Connect a wallet';
      walletContent = (
        <>
          <Box className={styles.scroll} display="flex">
            <Box display="flex" style={{ margin: '0 auto' }}>
              {wallets.map(wallet => {
                return (
                  <Box key={wallet.id} paddingX="20">
                    <Box width="60">
                      <WalletButton wallet={wallet} />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box background="modalBorder" height="1" />

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
              style={{ maxWidth: 360 }}
            >
              <Text color="modalText" size="16" weight="bold">
                What is a wallet?
              </Text>
              <Text color="modalTextSecondary" size="16">
                A wallet is used to send, receive, store, and display digital
                assets like Ethereum and NFTs. It&rsquo;s also a new way to log
                in, without needing to create new accounts and passwords
                on&nbsp;every&nbsp;website.
              </Text>
            </Box>
            <Box display="flex" gap="14" justifyContent="center">
              <Button
                label="Get a wallet"
                onClick={() => setWalletStep(MobileWalletStep.Get)}
                size="large"
                type="secondary"
              />
              <Button
                href="https://learn.rainbow.me"
                label="Learn more"
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

      const mobileWallets = wallets?.filter(
        wallet => wallet.downloadUrls?.mobile
      );

      walletContent = (
        <>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            height="full"
            width="full"
          >
            {mobileWallets.map((wallet, index) => {
              const { downloadUrls, iconUrl, name } = wallet;

              if (!downloadUrls?.mobile) {
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
                  <img alt={name} height={48} src={iconUrl} width={48} />
                  <Box display="flex" flexDirection="column" width="full">
                    <Box alignItems="center" display="flex" height="48">
                      <Box width="full">
                        <Text color="modalText" size="18" weight="bold">
                          {name}
                        </Text>
                      </Box>
                      <Button
                        href={downloadUrls.mobile}
                        label="GET"
                        size="small"
                        type="secondary"
                      />
                    </Box>
                    {index < mobileWallets.length - 1 ? (
                      <Box
                        background="modalBorder"
                        height="1"
                        marginY="16"
                        width="full"
                      />
                    ) : null}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="36"
            paddingTop="24"
            paddingX="36"
            style={{ textAlign: 'center' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="12"
              style={{ maxWidth: 360 }}
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
    <Box display="flex" flexDirection="column" gap="20" paddingY="16">
      <Box
        display="flex"
        justifyContent="center"
        paddingBottom="6"
        paddingX="20"
        position="relative"
      >
        {headerBackButtonLink ? (
          <Box
            as="button"
            color="accentColor"
            display="flex"
            onClick={() => setWalletStep(headerBackButtonLink!)}
            padding="20"
            position="absolute"
            style={{
              left: 0,
              marginBottom: -20,
              marginTop: -20,
            }}
            transform={{ active: 'shrinkSm', hover: 'growLg' }}
            transition="default"
          >
            <Box alignItems="center" display="flex" height="24">
              <BackIcon />
            </Box>
          </Box>
        ) : null}

        <Box style={{ textAlign: 'center' }} width="full">
          <Text as="h1" color="modalText" id={titleId} size="20" weight="bold">
            {headerLabel}
          </Text>
        </Box>

        <Box
          alignItems="center"
          display="flex"
          height="full"
          paddingRight="10"
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

      {walletContent}
    </Box>
  );
}
