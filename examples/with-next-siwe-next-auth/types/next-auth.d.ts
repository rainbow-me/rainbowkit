import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `auth`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** The user's public Ethereum address. */
    address?: string;
    user: DefaultSession['user'];
  }
}
