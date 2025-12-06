import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { type Chain, createPublicClient, http } from 'viem';
import { parseSiweMessage } from 'viem/siwe';

export interface SiweUser {
  id: string;
  address: string;
}

export type SiweAuthConfig = {
  onSuccess?: (address: string) => Promise<Partial<SiweUser> | void>;
  onError?: (error: Error) => Promise<void>;
  chain: Chain;
};

export const siweAuthOptions = ({
  chain,
  ...config
}: SiweAuthConfig): NextAuthOptions => {
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });

  return {
    providers: [
      CredentialsProvider({
        id: 'credentials',
        name: 'Ethereum',
        credentials: {
          message: {
            label: 'Message',
            type: 'text',
          },
          signature: {
            label: 'Signature',
            type: 'text',
          },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.message || !credentials?.signature) return null;

            const parsedMessage = parseSiweMessage(credentials.message);

            const valid = await publicClient.verifySiweMessage({
              message: credentials.message,
              signature: credentials.signature as `0x${string}`,
              domain: parsedMessage.domain,
              nonce: parsedMessage.nonce,
            });

            if (valid && parsedMessage.address) {
              const baseUser = {
                id: parsedMessage.address,
                address: parsedMessage.address,
              };

              const additionalData = await config?.onSuccess?.(
                parsedMessage.address,
              );

              return {
                ...baseUser,
                ...additionalData,
              };
            }
            return null;
          } catch (error) {
            console.error('SIWE verification error:', error);
            await config?.onError?.(error as Error);
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return {
            ...token,
            ...user,
          };
        }
        return token;
      },
      async session({ session, token }) {
        return {
          ...session,
          id: token.id,
          address: token.address,
          user: {
            ...session.user,
            ...token,
          },
        };
      },
    },
  };
};
