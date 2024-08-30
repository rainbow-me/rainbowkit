import React, { useCallback, useContext, useRef } from 'react';
import { UserRejectedRequestError } from 'viem';
import { useAccount, useSignMessage } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { CloseButton } from '../CloseButton/CloseButton';
import { useAuthenticationAdapter } from '../RainbowKitProvider/AuthenticationContext';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { Text } from '../Text/Text';

export const signInIcon = async () => (await import('./sign.png')).default;

export function SignIn({
  onClose,
  onCloseModal,
}: {
  onClose: () => void;
  onCloseModal: () => void;
}) {
  const { i18n } = useContext(I18nContext);
  const [{ status, ...state }, setState] = React.useState<{
    status: 'idle' | 'signing' | 'verifying';
    errorMessage?: string;
    nonce?: string;
  }>({ status: 'idle' });

  const authAdapter = useAuthenticationAdapter();

  const getNonce = useCallback(async () => {
    try {
      const nonce = await authAdapter.getNonce();
      setState((x) => ({ ...x, nonce }));
    } catch {
      setState((x) => ({
        ...x,
        errorMessage: i18n.t('sign_in.message.preparing_error'),
        status: 'idle',
      }));
    }
  }, [authAdapter, i18n.t]);

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
  const { address, chain: activeChain } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      const chainId = activeChain?.id;
      const { nonce } = state;

      if (!address || !chainId || !nonce) {
        return;
      }

      setState((x) => ({
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
          return setState((x) => ({
            ...x,
            status: 'idle',
          }));
        }

        return setState((x) => ({
          ...x,
          errorMessage: i18n.t('sign_in.signature.signing_error'),
          status: 'idle',
        }));
      }

      setState((x) => ({ ...x, status: 'verifying' }));

      try {
        const verified = await authAdapter.verify({ message, signature });

        if (verified) {
          // This will ensure that 'connectModalOpen' state doesn't
          // stay to true after a successful authentication
          onCloseModal();
          return;
        }

        throw new Error();
      } catch {
        return setState((x) => ({
          ...x,
          errorMessage: i18n.t('sign_in.signature.verifying_error'),
          status: 'idle',
        }));
      }
    } catch {
      setState({
        errorMessage: i18n.t('sign_in.signature.oops_error'),
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
              {i18n.t('sign_in.label')}
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
              {i18n.t('sign_in.description')}
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
                ? i18n.t('sign_in.message.preparing')
                : status === 'signing'
                  ? i18n.t('sign_in.signature.waiting')
                  : status === 'verifying'
                    ? i18n.t('sign_in.signature.verifying')
                    : i18n.t('sign_in.message.send')
            }
            onClick={signIn}
            size={mobile ? 'large' : 'medium'}
            testId="auth-message-button"
          />
          {mobile ? (
            <ActionButton
              label="Cancel"
              onClick={onClose}
              size="large"
              type="secondary"
            />
          ) : (
            <Box
              as="button"
              borderRadius="full"
              className={touchableStyles({ active: 'shrink', hover: 'grow' })}
              display="block"
              onClick={onClose}
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
                {i18n.t('sign_in.message.cancel')}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
