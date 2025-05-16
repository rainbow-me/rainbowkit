import NextAuth, { type NextAuthOptions } from 'next-auth';
import type { Chain } from 'viem';
import { siweAuthOptions } from './authOptions';

interface NextAuthHandlerProps {
  chain: Chain;
  authOptions?: Partial<NextAuthOptions>;
}

/**
 * Creates a Next.js Auth route handler with SIWE (Sign-In with Ethereum) configuration
 * This is useful for Next.js 13+ apps using SIWE with RainbowKit
 *
 * @example
 * ```typescript
 * // app/api/auth/[...nextauth]/route.ts
 * import { mainnet } from "viem/chains";
 * import { NextAuthHandler } from "@rainbow-me/rainbowkit-siwe-next-auth";
 *
 * const { GET, POST } = NextAuthHandler({ chain: mainnet });
 * export { GET, POST };
 * ```
 */
export const NextAuthHandler = ({
  chain,
  authOptions = {},
}: NextAuthHandlerProps) => {
  const handler = NextAuth(
    siweAuthOptions({
      chain,
      ...authOptions,
    }),
  );

  return handler;
};
