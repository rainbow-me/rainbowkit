<a href="https://rainbowkit.com">
  <img alt="rainbowkit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# rainbowkit-siwe-next-auth

[Sign-In with Ethereum](https://login.xyz) and [NextAuth](https://next-auth.js.org) authentication adapter for [RainbowKit](https://www.rainbowkit.com).

## Usage

### Set up Sign-In with Ethereum and NextAuth

### Install

Install the `@rainbow-me/rainbowkit-siwe-next-auth` package and NextAuth v5.

```bash
npm install @rainbow-me/rainbowkit-siwe-next-auth next-auth@5.0.0-beta.31
```

### Set up NextAuth

Create a NextAuth configuration that uses the v5 `Credentials` provider and exports the `auth` helper. Your `authorize` implementation should validate the SIWE message, signature, domain, and nonce before returning the authenticated address.

The complete [`with-next-siwe-next-auth` example](https://github.com/rainbow-me/rainbowkit/tree/main/examples/with-next-siwe-next-auth) shows how to validate the SIWE message with `viem`, compare the nonce against the `csrfToken` value that NextAuth v5 posts to the Credentials provider, and verify the signature.

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
import type { Session } from 'next-auth';
import { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <WagmiProvider {...etc}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider {...etc}>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}
```

With `RainbowKitSiweNextAuthProvider` in place, your users will now be prompted to authenticate by signing a message once they've connected their wallet.

### Customize the SIWE message options

You can customize the [SIWE message options](https://viem.sh/docs/siwe/utilities/createSiweMessage#parameters) by passing a function to the `getSiweMessageOptions` prop on `RainbowKitSiweNextAuthProvider`.

This function will be called whenever a new message is created. Options returned from this function will be merged with the defaults.

```tsx
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to my RainbowKit app',
});

<RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
  ...
</RainbowKitSiweNextAuthProvider>;
```

### Access the session server-side

You can access the session using the `auth` function exported from your auth configuration. If the user has successfully authenticated, the session's `address` property will be the user's address.

You can also pass down the resolved session object from the server via `getServerSideProps` so that NextAuth doesn't need to resolve it again on the client.

For example:

```tsx
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { auth } from '../auth';

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await auth(context.req, context.res);

  const address = session?.address ?? null;
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

- [Next.js authentication guide](https://nextjs.org/docs/app/guides/authentication)
- [NextAuth documentation](https://next-auth.js.org)

## Contributing

Please follow our [contributing guidelines](/.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](/LICENSE) for more information.
