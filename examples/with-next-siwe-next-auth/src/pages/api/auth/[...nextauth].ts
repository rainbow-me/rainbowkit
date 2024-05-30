// Code in this file is based on https://docs.login.xyz/integrations/nextauth.js
// with added process.env.VERCEL_URL detection to support preview deployments
// and with auth option logic extracted into a 'getAuthOptions' function so it
// can be used to get the session server-side with 'getServerSession'
import { IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { ByteArray, Hex, Signature, publicActions } from 'viem';
import { parseSiweMessage } from 'viem/siwe';

import { config } from '../../../wagmi';

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const message = credentials?.message ?? '';

          const { domain, nonce, address } = parseSiweMessage(message);

          if (!address) return null;

          const nextAuthUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : null);

          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;

          if (domain !== nextAuthHost) {
            return null;
          }

          if (
            nonce !== (await getCsrfToken({ req: { headers: req.headers } }))
          ) {
            return null;
          }

          const publicClient = config.getClient().extend(publicActions);

          const valid = await publicClient.verifyMessage({
            address,
            message,
            signature: credentials?.signature as Hex | ByteArray | Signature,
          });

          if (!valid) {
            throw new Error('Invalid message');
          }

          return {
            id: address,
          };
        } catch (e) {
          return null;
        }
      },
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
      name: 'Ethereum',
    }),
  ];

  return {
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub;
        session.user = {
          name: token.sub,
        };
        return session;
      },
    },
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
  };
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send('Bad request');
    return;
  }

  const isDefaultSigninPage =
    req.method === 'GET' &&
    req.query.nextauth.find(value => value === 'signin');

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}
