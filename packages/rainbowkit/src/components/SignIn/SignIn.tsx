import React, { useCallback, useRef } from 'react';
import { useAccount, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { useAuthenticator } from '../RainbowKitProvider/AuthenticationContext';
import { Text } from '../Text/Text';

export function SignIn() {
  const [state, setState] = React.useState<{
    signing?: boolean;
    nonce?: string;
  }>({});

  const authenticator = useAuthenticator();

  const fetchNonce = useCallback(async () => {
    try {
      const nonce = await authenticator.fetchNonce();
      setState(x => ({ ...x, nonce }));
    } catch (error) {
      setState(x => ({ ...x, error: error as Error }));
    }
  }, [authenticator]);

  // Pre-fetch nonce when screen is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  const onceRef = useRef(false);
  React.useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    fetchNonce();
  }, [authenticator, fetchNonce]);

  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const signIn = async () => {
    try {
      const chainId = activeChain?.id;
      const { nonce } = state;

      if (!address || !chainId || !nonce) {
        return;
      }

      setState(x => ({ ...x, signing: true }));
      const message = authenticator.createMessage({ address, chainId, nonce });
      const signature = await signMessageAsync({
        message: authenticator.prepareMessage({ message }),
      });

      const verified = await authenticator.verify({ message, signature });
      if (!verified) {
        throw new Error();
      }

      setState(x => ({ ...x, signing: false }));
    } catch (error) {
      setState(x => ({ ...x, nonce: undefined, signing: false }));
      fetchNonce();
    }
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="24"
      padding="28"
    >
      <Box alignItems="center" display="flex" flexDirection="column" gap="14">
        <Text color="modalText" size="20" textAlign="center" weight="heavy">
          Verify your account
        </Text>
        <Text color="modalTextSecondary" size="18" textAlign="center">
          To finish connecting, you must sign a message in your wallet to verify
          that you are the owner of this account.
        </Text>
      </Box>
      <Box alignItems="center" display="flex" flexDirection="column" gap="12">
        <ActionButton
          label={state.signing ? 'Confirm In Wallet...' : 'Send Message'}
          onClick={signIn}
          size="large"
        />
        <Box
          as="button"
          borderRadius="full"
          className={touchableStyles({ active: 'shrink', hover: 'grow' })}
          display="block"
          onClick={() => disconnect()}
          paddingX="12"
          paddingY="4"
          rel="noreferrer"
          style={{ willChange: 'transform' }}
          target="_blank"
          transition="default"
        >
          <Text color="accentColor" size="16" weight="bold">
            Cancel
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
