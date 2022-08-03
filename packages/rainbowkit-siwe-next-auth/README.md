<a href="https://rainbowkit.com">
  <img alt="rainbowkit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# rainbowkit-siwe-next-auth

[Sign-In with Ethereum](https://login.xyz) + [NextAuth.js](https://next-auth.js.org) authentication for [RainbowKit](https://www.rainbowkit.com).

This package is designed to work with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

## Install

```bash
npm install @rainbow-me/rainbowkit-siwe-next-auth
```

## Usage

> 💡 If you haven't already, set up your [Next.js](https://nextjs.org) app with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

First import the authentication provider.

```tsx
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
```

Then wrap `RainbowKitProvider` with `RainbowKitSiweNextAuthProvider`, ensuring it's nested within NextAuth's `SessionProvider` so that it has access to the session.

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

You're done! Your users will now be prompted to authenticate by signing a message once they've connected their wallet.

## Contributing

Please follow our [contributing guidelines](./.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](./LICENSE) for more information.
