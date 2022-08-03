import React, { useCallback, useRef } from 'react';
import { useAccount, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { CloseButton } from '../CloseButton/CloseButton';
import { useAuthenticationAdapter } from '../RainbowKitProvider/AuthenticationContext';
import { Text } from '../Text/Text';

export const signInIcon = async () => (await import('./sign.png')).default;

export function SignIn({ onClose }: { onClose: () => void }) {
  const [state, setState] = React.useState<{
    signing?: boolean;
    verifying?: boolean;
    nonce?: string;
  }>({});

  const authAdapter = useAuthenticationAdapter();

  const fetchNonce = useCallback(async () => {
    try {
      const nonce = await authAdapter.fetchNonce();
      setState(x => ({ ...x, nonce }));
    } catch (error) {
      setState(x => ({ ...x, error: error as Error }));
    }
  }, [authAdapter]);

  // Pre-fetch nonce when screen is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  const onceRef = useRef(false);
  React.useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    fetchNonce();
  }, [fetchNonce]);

  const mobile = isMobile();
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const cancel = () => disconnect();

  const signIn = async () => {
    try {
      const chainId = activeChain?.id;
      const { nonce } = state;

      if (!address || !chainId || !nonce) {
        return;
      }

      setState(x => ({ ...x, signing: true }));
      const message = authAdapter.createMessage({ address, chainId, nonce });
      const signature = await signMessageAsync({
        message: authAdapter.prepareMessage({ message }),
      });

      setState(x => ({ ...x, signing: false, verifying: true }));
      const verified = await authAdapter.verify({ message, signature });
      if (!verified) {
        throw new Error();
      }

      setState(x => ({ ...x, verifying: false }));
    } catch (error) {
      setState(x => ({
        ...x,
        nonce: undefined,
        signing: false,
        verifying: false,
      }));
      fetchNonce();
    }
  };

  return (
    <Box position="relative">
      <Box
        display="flex"
        paddingRight="16"
        paddingTop="16"
        position="absolute"
        right="0"
      >
        <CloseButton onClose={onClose} />
      </Box>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap={mobile ? '32' : '24'}
        padding="24"
        paddingX="18"
        style={{ paddingTop: mobile ? '60px' : '36px' }}
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap={mobile ? '6' : '4'}
          style={{ maxWidth: mobile ? 320 : 280 }}
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={mobile ? '32' : '16'}
          >
            <AsyncImage height={40} src={signInIcon} width={40} />
            <Text
              color="modalText"
              size={mobile ? '20' : '18'}
              textAlign="center"
              weight="heavy"
            >
              Verify your account
            </Text>
          </Box>
          <Text
            color="modalTextSecondary"
            size={mobile ? '16' : '14'}
            textAlign="center"
          >
            To finish connecting, you must sign a message in your wallet to
            verify that you are the owner of this account.
          </Text>
        </Box>
        <Box
          alignItems={!mobile ? 'center' : undefined}
          display="flex"
          flexDirection="column"
          gap="8"
          width="full"
        >
          <ActionButton
            disabled={state.signing || state.verifying}
            label={
              state.signing
                ? 'Waiting for signature...'
                : state.verifying
                ? 'Verifying signature...'
                : 'Send message'
            }
            onClick={signIn}
            size={mobile ? 'large' : 'medium'}
          />
          {mobile ? (
            <ActionButton
              label="Cancel"
              onClick={cancel}
              size="large"
              type="secondary"
            />
          ) : (
            <Box
              as="button"
              borderRadius="full"
              className={touchableStyles({ active: 'shrink', hover: 'grow' })}
              display="block"
              onClick={cancel}
              paddingX="10"
              paddingY="5"
              rel="noreferrer"
              style={{ willChange: 'transform' }}
              target="_blank"
              transition="default"
            >
              <Text
                color="closeButton"
                size={mobile ? '16' : '14'}
                weight="bold"
              >
                Cancel
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
