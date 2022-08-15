import {
  AuthenticationConfig,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { SiweMessage } from 'siwe';

type ImmutableSiweOptions = {
  address: string;
  chainId: number;
  nonce: string;
};

type ImmutableSiweOption = keyof ImmutableSiweOptions;

export type GetSiweMessageOptions = () => Omit<
  Partial<SiweMessage>,
  ImmutableSiweOption
> & {
  [Key in ImmutableSiweOption]?: never;
};

export interface UseSiweNextAuthOptions {
  getSiweMessageOptions?: GetSiweMessageOptions;
}

export function useSiweNextAuth({
  getSiweMessageOptions,
}: UseSiweNextAuthOptions = {}): AuthenticationConfig<SiweMessage> {
  const { status } = useSession();
  const adapter = useMemo(
    () =>
      createAuthenticationAdapter({
        createMessage: ({ address, chainId, nonce }) => {
          const immutableOptions = {
            address,
            chainId,
            nonce,
          };

          const defaultOptions = {
            ...immutableOptions,
            domain: window.location.host,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
          };

          return new SiweMessage({
            ...defaultOptions,

            // Resolve any custom SIWE message options
            ...getSiweMessageOptions?.(),

            // Spread the immutable options last so they can't be overridden
            ...immutableOptions,
          });
        },

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
    [getSiweMessageOptions]
  );

  return { adapter, status };
}
