import React, { useCallback, useRef } from 'react';
import {
  useAccount,
  useDisconnect,
  useNetwork,
  UserRejectedRequestError,
  useSignMessage,
} from 'wagmi';
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
  const [{ status, ...state }, setState] = React.useState<{
    status: 'idle' | 'signing' | 'verifying';
    errorMessage?: string;
    nonce?: string;
  }>({ status: 'idle' });

  const authAdapter = useAuthenticationAdapter();

  const getNonce = useCallback(async () => {
    try {
      const nonce = await authAdapter.getNonce();
      setState(x => ({ ...x, nonce }));
    } catch (error) {
      setState(x => ({
        ...x,
        errorMessage: 'Error preparing message, please retry!',
        status: 'idle',
      }));
    }
  }, [authAdapter]);

  // Pre-fetch nonce when screen is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  const onceRef = useRef(false);
  React.useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    getNonce();
  }, [getNonce]);

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

      setState(x => ({
        ...x,
        errorMessage: undefined,
        status: 'signing',
      }));

      const message = authAdapter.createMessage({ address, chainId, nonce });
      let signature: string;

      try {
        signature = await signMessageAsync({
          message: authAdapter.getMessageBody({ message }),
        });
      } catch (error) {
        if (error instanceof UserRejectedRequestError) {
          // It's not really an "error" so we silently ignore and reset to idle state
          return setState(x => ({
            ...x,
            status: 'idle',
          }));
        }

        return setState(x => ({
          ...x,
          errorMessage: 'Error signing message, please retry!',
          status: 'idle',
        }));
      }

      setState(x => ({ ...x, status: 'verifying' }));

      try {
        const verified = await authAdapter.verify({ message, signature });

        if (verified) {
          return;
        } else {
          throw new Error();
        }
      } catch (error) {
        return setState(x => ({
          ...x,
          errorMessage: 'Error verifying signature, please retry!',
          status: 'idle',
        }));
      }
    } catch (error) {
      setState({
        errorMessage: 'Oops, something went wrong!',
        status: 'idle',
      });
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
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={mobile ? '16' : '12'}
          >
            <Text
              color="modalTextSecondary"
              size={mobile ? '16' : '14'}
              textAlign="center"
            >
              To finish connecting, you must sign a message in your wallet to
              verify that you are the owner of this account.
            </Text>
            {status === 'idle' && state.errorMessage ? (
              <Text
                color="error"
                size={mobile ? '16' : '14'}
                textAlign="center"
                weight="bold"
              >
                {state.errorMessage}
              </Text>
            ) : null}
          </Box>
        </Box>

        <Box
          alignItems={!mobile ? 'center' : undefined}
          display="flex"
          flexDirection="column"
          gap="8"
          width="full"
        >
          <ActionButton
            disabled={
              !state.nonce || status === 'signing' || status === 'verifying'
            }
            label={
              !state.nonce
                ? 'Preparing message...'
                : status === 'signing'
                ? 'Waiting for signature...'
                : status === 'verifying'
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
