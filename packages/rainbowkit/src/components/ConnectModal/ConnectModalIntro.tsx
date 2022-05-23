import React, { useContext } from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { AssetsIcon } from '../Icons/Assets';
import { LoginIcon } from '../Icons/Login';
import { AppContext } from '../RainbowKitProvider/AppContext';

import { Text } from '../Text/Text';

export function ConnectModalIntro({ getWallet }: { getWallet: () => void }) {
  const { appName, learnMoreUrl, termsOfService } = useContext(AppContext);
  const termsOfServiceState = !termsOfService
    ? 0
    : termsOfService?.url && !termsOfService?.disclaimerUrl
    ? 1
    : 2;
  return (
    <>
      <Box
        alignItems="center"
        color="accentColor"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={{
          gap:
            termsOfServiceState === 0
              ? 62
              : termsOfServiceState === 1
              ? 50
              : 30,
        }}
      >
        <Text color="modalText" size="18" weight="heavy">
          What is a Wallet?
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          gap="32"
          height="full"
          justifyContent="center"
          style={{ maxWidth: 312 }}
        >
          <Box alignItems="center" display="flex" flexDirection="row" gap="16">
            <Box borderRadius="6" height="48" minWidth="48" width="48">
              <AssetsIcon />
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <Text color="modalText" size="14" weight="bold">
                A Home for your Digital Assets
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                Wallets are used to send, receive, store, and display digital
                assets like Ethereum and NFTs.
              </Text>
            </Box>
          </Box>
          <Box alignItems="center" display="flex" flexDirection="row" gap="16">
            <Box borderRadius="6" height="48" minWidth="48" width="48">
              <LoginIcon />
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <Text color="modalText" size="14" weight="bold">
                A New Way to Log In
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                Instead of creating new accounts and passwords on every website,
                just connect your wallet.
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap="12"
          justifyContent="center"
        >
          <ActionButton label="Get a Wallet" onClick={getWallet} />
          <Box
            as="a"
            className={increaseHitAreaForHoverTransform.grow}
            display="block"
            href={learnMoreUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Box
              paddingX="12"
              paddingY="4"
              style={{ willChange: 'transform' }}
              transform={{ active: 'shrink', hover: 'grow' }}
              transition="default"
            >
              <Text color="accentColor" size="14" weight="bold">
                Learn More
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      {termsOfService?.url && (
        <Box marginBottom="8" marginTop="20">
          <Text
            color="modalTextSecondary"
            size="12"
            textAlign="center"
            weight="medium"
          >
            By connecting, you agree to {appName}&apos;s{' '}
            <Text
              color="accentColor"
              display="inline"
              size="12"
              weight="medium"
            >
              <a
                href={termsOfService.url}
                rel="noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  width: 'fit-content',
                }}
                target="_blank"
              >
                Terms of Service
              </a>
            </Text>
            {termsOfService?.disclaimerUrl && (
              <>
                {' '}
                and acknowledge that you have read and understand {appName}
                &apos;s{' '}
                <Text
                  color="accentColor"
                  display="inline"
                  size="12"
                  weight="medium"
                >
                  <a
                    href={termsOfService.disclaimerUrl}
                    rel="noreferrer"
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      width: 'fit-content',
                    }}
                    target="_blank"
                  >
                    Disclaimer
                  </a>
                </Text>
              </>
            )}
          </Text>
        </Box>
      )}
    </>
  );
}
