import {
  AuthenticationProp,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { SiweMessage } from 'siwe';

interface CreateSiweNextAuthAdapterOptions {
  statement?: string;
}

export function createSiweNextAuthAdapter({
  statement = 'Sign in with Ethereum to the app.',
}: CreateSiweNextAuthAdapterOptions = {}) {
  const adapter = createAuthenticationAdapter({
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

    fetchNonce: async () => {
      const nonce = await getCsrfToken();
      if (!nonce) throw new Error();
      return nonce;
    },

    logout: async () => {
      await signOut({ redirect: false });
    },

    prepareMessage: ({ message }) => message.prepareMessage(),

    verify: async ({ message, signature }) => {
      const response = await signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });

      return response?.ok ?? false;
    },
  });

  function useSiweNextAuthAdapter(): AuthenticationProp<SiweMessage> {
    const { status } = useSession();
    return { adapter, status };
  }

  return {
    useSiweNextAuthAdapter,
  };
}
