import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import {
  type SiweMessage,
  parseSiweMessage,
  validateSiweMessage,
} from 'viem/siwe';
import { createTransports } from './transports';

const transports = createTransports([mainnet]);

const publicClient = createPublicClient({
  chain: mainnet,
  // Reuse the example's configured transport for ERC-1271 eth_call support
  // instead of falling back to public default RPCs during server verification.
  transport: transports[mainnet.id],
});

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          placeholder: '0x0',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          placeholder: '0x0',
          type: 'text',
        },
      },
      async authorize(credentials) {
        try {
          const siweMessage = parseSiweMessage(
            credentials?.message as string,
          ) as SiweMessage;

          if (
            !validateSiweMessage({
              address: siweMessage?.address,
              message: siweMessage,
            })
          ) {
            return null;
          }

          const authUrl =
            process.env.AUTH_URL ||
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : null);
          if (!authUrl) {
            return null;
          }

          const authHost = new URL(authUrl).host;
          if (siweMessage.domain !== authHost) {
            return null;
          }

          const csrfToken =
            credentials && 'csrfToken' in credentials
              ? credentials.csrfToken
              : undefined;

          if (siweMessage.nonce !== csrfToken) {
            return null;
          }

          const verificationStartedAt = Date.now();
          let valid: boolean;

          try {
            valid = await publicClient.verifyMessage({
              address: siweMessage?.address,
              message: credentials?.message as string,
              signature: credentials?.signature as `0x${string}`,
            });
          } catch (error) {
            const durationMs = Date.now() - verificationStartedAt;
            const isTimeoutError =
              error instanceof Error &&
              /timeout|timed out|abort/i.test(error.message);

            console.error(
              isTimeoutError
                ? 'siwe signature verification timed out'
                : 'siwe signature verification failed',
              { durationMs },
              error,
            );

            return null;
          }

          if (!valid) {
            return null;
          }

          return {
            id: siweMessage.address,
          };
        } catch (e) {
          console.error('siwe authorization failed', e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.address = token.sub;
      session.user = {
        ...session.user,
        name: token.sub,
      };
      return session;
    },
  },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
