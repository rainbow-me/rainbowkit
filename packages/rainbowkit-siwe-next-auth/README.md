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

First, create a Next.js API route for authentication. You have two options depending on your Next.js routing style:

#### Option A: App Router (Next.js 13+)

```typescript
// app/api/auth/[...nextauth]/route.ts
import { mainnet } from "viem/chains";
import { NextAuthHandler } from "@rainbow-me/rainbowkit-siwe-next-auth";

const { GET, POST } = NextAuthHandler({ 
  chain: mainnet,
  // Optional: Custom auth options
  authOptions: {
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

export default NextAuthHandler({ chain: mainnet });
```

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

## Usage

### Access the session server-side

You can access the session token with NextAuth's `getToken` function imported from `next-auth/jwt`. If the user has successfully authenticated, the session token's `sub` property (the "subject" of the token, i.e. the user) will be the user's address.

#### App Router (Next.js 13+)

```tsx
// app/page.tsx
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";

export default async function Page() {
  const token = await getToken({ 
    req: { 
      headers: Object.fromEntries(headers()),
      cookies: headers().get("cookie"),
    } as any,
  });
  
  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  return address ? (
    <h1>Authenticated as {address}</h1>
  ) : (
    <h1>Unauthenticated</h1>
  );
}
```

#### Pages Router

You can also pass down the resolved session object from the server via `getServerSideProps` so that NextAuth doesn't need to resolve it again on the client.

```tsx
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
      session,
    },
  };
};

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function AuthenticatedPage({ address }: AuthenticatedPageProps) {
  return address ? (
    <h1>Authenticated as {address}</h1>
  ) : (
    <h1>Unauthenticated</h1>
  );
}
```

For more information about managing the session, you can refer to the following documentation:
- [Next.js authentication guide](https://nextjs.org/docs/app/building-your-application/authentication)
- [NextAuth documentation](https://next-auth.js.org)

## Contributing

Please follow our [contributing guidelines](/.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](/LICENSE) for more information.
