import {
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import React, { ReactNode, useMemo } from 'react';
import type { Address } from 'viem';
import {
  type CreateSiweMessageParameters,
  createSiweMessage,
  parseSiweMessage,
} from 'viem/siwe';

type UnconfigurableMessageOptions = {
  address: Address;
  chainId: number;
  nonce: string;
};

type ConfigurableMessageOptions = Omit<
  CreateSiweMessageParameters,
  keyof UnconfigurableMessageOptions
>;

export type GetSiweMessageOptions = () => Partial<ConfigurableMessageOptions>;

interface RainbowKitSiweNextAuthProviderProps {
  enabled?: boolean;
  getSiweMessageOptions?: GetSiweMessageOptions;
  children: ReactNode;
}

export function RainbowKitSiweNextAuthProvider({
  children,
  enabled,
  getSiweMessageOptions,
}: RainbowKitSiweNextAuthProviderProps) {
  const { status } = useSession();
  const adapter = useMemo(
    () =>
      createAuthenticationAdapter({
        createMessage: ({ address, chainId, nonce }) => {
          const defaultConfigurableOptions: ConfigurableMessageOptions = {
            domain: window.location.host,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
          };

          const unconfigurableOptions: UnconfigurableMessageOptions = {
            address,
            chainId,
            nonce,
          };

          const { domain, uri, version, statement, ...restSiweOptions } =
            getSiweMessageOptions?.() ?? {};

          return createSiweMessage({
            // Use provided SIWE message options, fallback to defaults if undefined
            domain: domain ?? defaultConfigurableOptions.domain,
            uri: uri ?? defaultConfigurableOptions.uri,
            version: version ?? defaultConfigurableOptions.version,
            statement: statement ?? defaultConfigurableOptions.statement,

            // Spread custom SIWE message options provided by the consumer
            ...restSiweOptions,

            // Spread unconfigurable options last so they can't be overridden
            ...unconfigurableOptions,
          });
        },

        getMessageBody: ({ message }) => message,

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
            // Consumers will receive a stringified JSON, which they can parse afterwards.
            // This approach is taken to prevent breaking changes for previous versions.
            message: JSON.stringify(parseSiweMessage(message)),
            redirect: false,
            signature,
          });

          return response?.ok ?? false;
        },
      }),
    [getSiweMessageOptions],
  );

  return (
    <RainbowKitAuthenticationProvider
      adapter={adapter}
      enabled={enabled}
      status={status}
    >
      {children}
    </RainbowKitAuthenticationProvider>
  );
}
