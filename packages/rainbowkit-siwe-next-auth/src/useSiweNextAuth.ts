import {
  AuthenticationConfig,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { SiweMessage } from 'siwe';

export interface UseSiweNextAuthOptions {
  statement?: string;
}

export function useSiweNextAuth({
  statement = 'Sign in with Ethereum to the app.',
}: UseSiweNextAuthOptions = {}): AuthenticationConfig<SiweMessage> {
  const { status } = useSession();
  const adapter = useMemo(
    () =>
      createAuthenticationAdapter({
        createMessage: ({ address, chainId, nonce }) =>
          new SiweMessage({
            address,
            chainId,
            domain: window.location.host,
            nonce,
            statement,
            uri: window.location.origin,
            version: '1',
          }),

        getMessageBody: ({ message }) => message.prepareMessage(),

        getNonce: async () => {
          const nonce = await getCsrfToken();
          if (!nonce) throw new Error();
          return nonce;
        },

        signOut: async () => {
          await signOut({ redirect: false });
        },

        verify: async ({ message, signature }) => {
          const response = await signIn('credentials', {
            message: JSON.stringify(message),
            redirect: false,
            signature,
          });

          return response?.ok ?? false;
        },
      }),
    [statement]
  );

  return { adapter, status };
}
