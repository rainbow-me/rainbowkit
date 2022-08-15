import {
  AuthenticationConfig,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { SiweMessage } from 'siwe';

type UnconfigurableSiweMessageOptions = {
  address: string;
  chainId: number;
  nonce: string;
};

type UnconfigurableSiweMessageOption = keyof UnconfigurableSiweMessageOptions;

type ConfigurableSiweMessageOptions = Omit<
  Partial<SiweMessage>,
  UnconfigurableSiweMessageOption
> & {
  [Key in UnconfigurableSiweMessageOption]?: never;
};

export type GetSiweMessageOptions = () => ConfigurableSiweMessageOptions;

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
          const configurableSiweMessageOptions: ConfigurableSiweMessageOptions =
            {
              domain: window.location.host,
              statement: 'Sign in with Ethereum to the app.',
              uri: window.location.origin,
              version: '1',
            };

          const unconfigurableSiweMessageOptions: UnconfigurableSiweMessageOptions =
            {
              address,
              chainId,
              nonce,
            };

          return new SiweMessage({
            ...configurableSiweMessageOptions,

            // Spread custom SIWE message options provided by the consumer
            ...getSiweMessageOptions?.(),

            // Spread unconfigurable options last so they can't be overridden
            ...unconfigurableSiweMessageOptions,
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
