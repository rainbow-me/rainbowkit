import React, { useContext } from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { DisclaimerLink } from '../Disclaimer/DisclaimerLink';
import { DisclaimerText } from '../Disclaimer/DisclaimerText';
import { AssetsIcon } from '../Icons/Assets';
import { LoginIcon } from '../Icons/Login';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { Text } from '../Text/Text';

export function ConnectModalIntro({ getWallet }: { getWallet: () => void }) {
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext(AppContext);

  return (
    <>
      <Box
        alignItems="center"
        color="accentColor"
        display="flex"
        flexDirection="column"
        height="full"
        justifyContent="space-around"
      >
        <Box marginBottom="10">
          <Text color="modalText" size="18" weight="heavy">
            What is a Wallet?
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="32"
          justifyContent="center"
          marginY="20"
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
          margin="10"
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
        {Disclaimer && (
          <Box marginBottom="8" marginTop="12" textAlign="center">
            <Disclaimer Link={DisclaimerLink} Text={DisclaimerText} />
          </Box>
        )}
      </Box>
    </>
  );
}
