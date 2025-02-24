<a href="https://rainbowkit.com">
  <img alt="rainbowkit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# rainbowkit-siwe-next-auth

[Sign-In with Ethereum](https://login.xyz) and [NextAuth](https://next-auth.js.org) authentication adapter for [RainbowKit](https://www.rainbowkit.com).

## Installation

Install the `@rainbow-me/rainbowkit-siwe-next-auth` package.

```bash
npm install @rainbow-me/rainbowkit-siwe-next-auth
```

## Setup

### 1. Create the auth API route

First, create a Next.js API route for authentication. The `NextAuthHandler` utility simplifies setting up SIWE authentication by:
- Configuring NextAuth.js with the correct SIWE settings
- Setting up the necessary API endpoints for authentication
- Handling message verification and session management

You have two options depending on your Next.js routing style:

#### Option A: App Router (Next.js 13+)

```typescript
// app/api/auth/[...nextauth]/route.ts
import { mainnet } from "viem/chains";
import { NextAuthHandler } from "@rainbow-me/rainbowkit-siwe-next-auth";

// The handler creates both GET and POST endpoints required by NextAuth.js
const { GET, POST } = NextAuthHandler({ 
  chain: mainnet,  // The chain to use for SIWE message verification
  authOptions: {   // Optional: Additional NextAuth.js configuration
    // ...
  }
});

export { GET, POST };
```

#### Option B: Pages Router

```typescript
// pages/api/auth/[...nextauth].ts
import { mainnet } from "viem/chains";
import { NextAuthHandler } from "@rainbow-me/rainbowkit-siwe-next-auth";

// The handler creates a Next.js API route handler with SIWE configuration
export default NextAuthHandler({ chain: mainnet });
```

The `NextAuthHandler` accepts the following options:
- `chain`: The chain to use for verifying SIWE messages (e.g., mainnet, sepolia)
- `authOptions`: Optional NextAuth.js configuration that will be merged with the SIWE settings

### 2. Set up the providers

In your `App` component, wrap your application with the required providers. You have two options:

#### Option A: Combined Provider (Recommended for App Router)

```tsx
// app/providers.tsx
"use client";

import { RainbowKitSiweNextAuthProviderWithSession } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

export function Providers({ children }) {
  return (
    <WagmiConfig {...etc}>
      <RainbowKitSiweNextAuthProviderWithSession>
        <RainbowKitProvider {...etc}>
          {children}
        </RainbowKitProvider>
      </RainbowKitSiweNextAuthProviderWithSession>
    </WagmiConfig>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

#### Option B: Separate Providers (Traditional Setup)

```tsx
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <WagmiConfig {...etc}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider {...etc}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
```

With these providers in place, your users will be prompted to authenticate by signing a message once they've connected their wallet.

### 3. Customize the SIWE message (Optional)

You can customize the [SIWE message options](https://viem.sh/docs/siwe/utilities/createSiweMessage#parameters) by passing a function to the `getSiweMessageOptions` prop on either provider:

```tsx
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to my RainbowKit app',
});

// Use with either provider:
<RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
  ...
</RainbowKitSiweNextAuthProvider>;
```

### 4. Configure Authentication Options (Optional)

The `NextAuthHandler` accepts additional authentication options that let you customize the authentication behavior:

```typescript
// app/api/auth/[...nextauth]/route.ts
import { mainnet } from "viem/chains";
import { NextAuthHandler } from "@rainbow-me/rainbowkit-siwe-next-auth";

const { GET, POST } = NextAuthHandler({ 
  chain: mainnet,
  authOptions: {
    // Add custom user data on successful authentication
    onSuccess: async (address) => {
      // Fetch user data from your database
      const userData = await db.users.findUnique({ 
        where: { address: address.toLowerCase() } 
      });
      
      // Return additional user data to include in the session
      return {
        id: address,
        address,
        username: userData?.username,
        role: userData?.role,
      };
    },
    
    // Handle authentication errors
    onError: async (error) => {
      // Log the error or notify monitoring service
      console.error("Authentication error:", error);
      await notifyError(error);
    },
  }
});

export { GET, POST };
```

#### Available Options

The `authOptions` object accepts the following configuration:

- `onSuccess`: Async callback that runs after successful authentication
  - Receives the user's address as a parameter
  - Can return additional user data to include in the session
  - Useful for loading user data from a database
  
- `onError`: Async callback that runs when authentication fails
  - Receives the error object as a parameter
  - Useful for error logging and monitoring

- Any other [NextAuth.js options](https://next-auth.js.org/configuration/options) are also supported and will be merged with the SIWE configuration

#### Accessing Custom Data

Any data returned from `onSuccess` will be available in the session:

```typescript
// In server components/pages
const token = await getToken();
const username = token.username;
const role = token.role;

// In client components
const { data: session } = useSession();
const username = session?.user?.username;
const role = session?.user?.role;
```

For more information about session handling, see the [NextAuth.js documentation](https://next-auth.js.org/getting-started/client#usesession).

## Usage

### Access the session

You can access the session data in different ways depending on where you need it:

#### In Client Components

```typescript
// app/components/Profile.tsx
'use client';

import { useSession } from "next-auth/react";

export function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const address = session?.user?.address;
  return address ? (
    <div>Connected as {address}</div>
  ) : (
    <div>Not connected</div>
  );
}
```

This method:
- Provides real-time session state
- Automatically handles session updates
- Includes loading states
- Works with React Suspense

#### In Server Components (Recommended)

```typescript
// app/page.tsx
import { getServerSession } from "next-auth";
import { siweAuthOptions } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { mainnet } from "viem/chains";

export default async function Page() {
  const session = await getServerSession(
    siweAuthOptions({ chain: mainnet })
  );
  
  const address = session?.user?.address;
  return address ? (
    <h1>Authenticated as {address}</h1>
  ) : (
    <h1>Unauthenticated</h1>
  );
}
```

This method:
- Works in both server components and API routes
- Is more efficient than alternatives
- Prevents unnecessary client-side requests
- Uses the same auth options as your API route

#### Alternative Methods

For specific use cases, you can also use `getToken` or `getSession`, though these are generally not recommended over the above methods.

For more information about managing the session, you can refer to the following documentation:
- [Next.js authentication guide](https://nextjs.org/docs/app/building-your-application/authentication)
- [NextAuth documentation](https://next-auth.js.org)

## Contributing

Please follow our [contributing guidelines](/.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](/LICENSE) for more information.

#### Provider Options

Both providers accept the following props:

##### RainbowKitSiweNextAuthProviderWithSession

```typescript
interface RainbowKitSiweNextAuthProviderWithSessionProps {
  // RainbowKitSiweNextAuthProvider props
  enabled?: boolean;                    // Enable/disable SIWE authentication
  getSiweMessageOptions?: GetSiweMessageOptions;  // Customize SIWE message

  // SessionProvider props
  session?: Session | null;             // Initial session state
  refetchInterval?: number;             // How often to refetch the session
  refetchOnWindowFocus?: boolean;       // Refetch session on window focus

  children: ReactNode;
}
```

##### RainbowKitSiweNextAuthProvider

```typescript
interface RainbowKitSiweNextAuthProviderProps {
  enabled?: boolean;                    // Enable/disable SIWE authentication
  getSiweMessageOptions?: GetSiweMessageOptions;  // Customize SIWE message
  children: ReactNode;
}
```

Example usage with all options:

```tsx
// Combined provider (recommended for App Router)
<RainbowKitSiweNextAuthProviderWithSession
  enabled={true}
  getSiweMessageOptions={() => ({
    statement: 'Sign in to my app',
    // ... other SIWE message options
  })}
  session={session}
  refetchInterval={0}
  refetchOnWindowFocus={false}
>
  {children}
</RainbowKitSiweNextAuthProviderWithSession>

// Separate providers
<SessionProvider
  session={session}
  refetchInterval={0}
  refetchOnWindowFocus={false}
>
  <RainbowKitSiweNextAuthProvider
    enabled={true}
    getSiweMessageOptions={() => ({
      statement: 'Sign in to my app',
      // ... other SIWE message options
    })}
  >
    {children}
  </RainbowKitSiweNextAuthProvider>
</SessionProvider>
```

The `enabled` prop can be used to conditionally enable/disable SIWE authentication. When `false`, users can connect their wallets without signing a message.
