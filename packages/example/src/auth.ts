import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import {
  type SiweMessage,
  parseSiweMessage,
  validateSiweMessage,
} from 'viem/siwe';

// Create a server-side public client for signature verification
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
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
      async authorize(credentials, request) {
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

          // In v5, get nonce from request cookies
          const cookieHeader =
            request.headers instanceof Headers
              ? request.headers.get('cookie')
              : '';
          const cookies = cookieHeader || '';
          const csrfTokenCookie = cookies
            .split(';')
            .find((c) => c.trim().startsWith('authjs.csrf-token='));
          const csrfToken = csrfTokenCookie?.split('=')[1]?.split('%')[0];

          if (siweMessage.nonce !== csrfToken) {
            return null;
          }

          const valid = await publicClient.verifyMessage({
            address: siweMessage?.address,
            message: credentials?.message as string,
            signature: credentials?.signature as `0x${string}`,
          });

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
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
