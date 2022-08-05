<a href="https://rainbowkit.com">
  <img alt="rainbowkit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# rainbowkit-siwe-next-auth

[Sign-In with Ethereum](https://login.xyz) and [NextAuth.js](https://next-auth.js.org) authentication adapter for [RainbowKit](https://www.rainbowkit.com).

This package is designed to work with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

## Usage

### Set up Sign-In with Ethereum and NextAuth.js

If you haven't already, first set up your [Next.js](https://nextjs.org) project with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

### Install

Install the `@rainbow-me/rainbowkit-siwe-next-auth` package.

```bash
npm install @rainbow-me/rainbowkit-siwe-next-auth
```

### Set up the provider

In your `App` component, import `RainbowKitSiweNextAuthProvider`.

```tsx
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
```

Wrap `RainbowKitProvider` with `RainbowKitSiweNextAuthProvider`, ensuring it's nested within NextAuth's `SessionProvider` so that it has access to the session.

```tsx
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

export default function App({ Component, pageProps }: AppProps) {
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

With `RainbowKitSiweNextAuthProvider` in place, your users will now be prompted to authenticate by signing a message once they've connected their wallet.

### Access the session server-side

You can access the session token with NextAuth's `getToken` function imported from `next-auth/jwt`. If the user has successfully authenticated, the session token's `sub` property (the "subject" of the token, i.e. the user) will be the user's address.

For example, you can access their address within `getServerSideProps`.

```tsx
import { getToken } from 'next-auth/jwt';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
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

- [Next.js authentication guide](https://nextjs.org/docs/authentication)
- [NextAuth.js documentation](https://next-auth.js.org)

## Contributing

Please follow our [contributing guidelines](./.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](./LICENSE) for more information.
