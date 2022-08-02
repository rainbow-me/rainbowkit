<a href="https://rainbowkit.com">
  <img alt="rainbowkit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# rainbowkit-siwe-next-auth

[RainbowKit](https://www.rainbowkit.com) authentication adapter for [Sign-In with Ethereum](https://login.xyz) + [NextAuth.js.](https://next-auth.js.org)

Note that this adapter is designed to work with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

## Install

```bash
npm install @rainbow-me/rainbowkit-siwe-next-auth
```

## Usage

If you haven't already, set up your [Next.js](https://nextjs.org) project with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

Then pass the result of the `useSiweNextAuth` Hook to the `authentication` prop on `RainbowKitProvider`.

```tsx
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useSiweNextAuth } from '@rainbow-me/rainbowkit-siwe-next-auth';

<RainbowKitProvider authentication={useSiweNextAuth()} {...etc}>
```

💡 Note that `useSiweNextAuthAdapter` and `SessionProvider` cannot be used in the same component since the Hook needs access to the session context. You will need to split your App component into multiple components to achieve this, for example:

```tsx
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { useSiweNextAuth } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next';

function RainbowKitApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig {...etc}>
      <RainbowKitProvider authentication={useSiweNextAuth()} {...etc}>
        <Component {...pageProps} />
      </RainbowKit>
    </WagmiConfig>
  );
}

export default function App(appProps: AppProps) {
  const { session } = appProps.pageProps;

  return (
    <SessionProvider refetchInterval={0} session={session}>
      <RainbowKitApp {...appProps}>
    </SessionProvider>
  );
};
```

## Contributing

Please follow our [contributing guidelines](./.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](./LICENSE) for more information.
