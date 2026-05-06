# @rainbow-me/rainbow-button

## 0.2.28

### Patch Changes

- f52657f: Fixed `RainbowButton.Custom` types in Next.js 16.2 projects.
- Updated dependencies [f52657f]
  - @rainbow-me/rainbowkit@2.2.11

## 0.2.27

### Patch Changes

- Updated dependencies [16963de]
  - @rainbow-me/rainbowkit@2.2.10

## 0.2.26

### Patch Changes

- 87257e6: Expose `useRainbowConnectModal` hook for programmatic control of the connect modal. The hook returns `connect` and `connectModalOpen` properties
- Updated dependencies [1520f59]
  - @rainbow-me/rainbowkit@2.2.9

## 0.2.25

### Patch Changes

- Updated dependencies [f542876]
  - @rainbow-me/rainbowkit@2.2.8

## 0.2.24

### Patch Changes

- Updated dependencies [15ddd4a]
  - @rainbow-me/rainbowkit@2.2.7

## 0.2.23

### Patch Changes

- Updated dependencies [f6ad6aa]
  - @rainbow-me/rainbowkit@2.2.6

## 0.2.22

### Patch Changes

- Updated dependencies [03ae0d0]
  - @rainbow-me/rainbowkit@2.2.5

## 0.2.21

### Patch Changes

- Updated dependencies [e4547b8]
  - @rainbow-me/rainbowkit@2.2.4

## 0.2.20

### Patch Changes

- Updated dependencies [b5a7878]
  - @rainbow-me/rainbowkit@2.2.3

## 0.2.19

### Patch Changes

- Updated dependencies [f533ac2]
  - @rainbow-me/rainbowkit@2.2.2

## 0.2.18

### Patch Changes

- Updated dependencies [7fceab8]
  - @rainbow-me/rainbowkit@2.2.1

## 0.2.17

### Patch Changes

- Updated dependencies [f02bced]
  - @rainbow-me/rainbowkit@2.2.0

## 0.2.16

### Patch Changes

- Updated dependencies [6393498]
  - @rainbow-me/rainbowkit@2.1.7

## 0.2.15

### Patch Changes

- Updated dependencies [d46637a]
  - @rainbow-me/rainbowkit@2.1.6

## 0.2.14

### Patch Changes

- Updated dependencies [9c36bfd]
  - @rainbow-me/rainbowkit@2.1.5

## 0.2.13

### Patch Changes

- Updated dependencies [d02d73f]
  - @rainbow-me/rainbowkit@2.1.4

## 0.2.12

### Patch Changes

- Updated dependencies [001a0a9]
  - @rainbow-me/rainbowkit@2.1.3

## 0.2.11

### Patch Changes

- 9694368: Resolved an issue where the Rainbow Button styling was not exported. You can now import the styling in your project like so:

  ```tsx
  import "@rainbow-me/rainbow-button/styles.css";
  ```

- Updated dependencies [fea278a]
  - @rainbow-me/rainbowkit@2.1.2

## 0.2.10

### Patch Changes

- Updated dependencies [9be5452]
  - @rainbow-me/rainbowkit@2.1.1

## 0.2.9

### Patch Changes

- Updated dependencies [82153ed]
  - @rainbow-me/rainbowkit@2.1.0

## 0.2.8

### Patch Changes

- Updated dependencies [8841891]
  - @rainbow-me/rainbowkit@2.0.8

## 0.2.7

### Patch Changes

- Updated dependencies [f0b3b25]
  - @rainbow-me/rainbowkit@2.0.7

## 0.2.6

### Patch Changes

- Updated dependencies [515498f]
  - @rainbow-me/rainbowkit@2.0.6

## 0.2.5

### Patch Changes

- Updated dependencies [ec41346]
  - @rainbow-me/rainbowkit@2.0.5

## 0.2.4

### Patch Changes

- Updated dependencies [5c60239]
  - @rainbow-me/rainbowkit@2.0.4

## 0.2.3

### Patch Changes

- Updated dependencies [b25db9a]
  - @rainbow-me/rainbowkit@2.0.3

## 0.2.2

### Patch Changes

- Updated dependencies [df572f1]
  - @rainbow-me/rainbowkit@2.0.2

## 0.2.1

### Patch Changes

- Updated dependencies [1a08977]
  - @rainbow-me/rainbowkit@2.0.1

## 0.2.0

### Minor Changes

- aa0269e: **Breaking:**

  The [wagmi](https://wagmi.sh) and [viem](https://viem.sh) peer dependencies have reached `2.x.x` with breaking changes.

  Follow the steps below to migrate.

  **1. Upgrade Rainbow Button, `wagmi`, and `viem` to their latest versions\*\***

  ```bash
  npm i @rainbow-me/rainbow-button@2 wagmi@2 viem@2.x
  ```

  **2. Install `@tanstack/react-query` peer dependency**

  With Wagmi v2, [TanStack Query](https://tanstack.com/query/v5/docs/react/overview) is now a required peer dependency.

  Install it with the following command:

  ```bash
  npm i @tanstack/react-query
  ```

  **3. Upgrade your Rainbow Button and Wagmi configurations**

  `RainbowConnector` is now `rainbowConnector`, and requires `appName` and no longer accepts the `chains` parameter.

  ```diff
  - import { RainbowConnector } from '@rainbow-me/rainbow-button'
  + import { rainbowConnector } from '@rainbow-me/rainbow-button'
    import { createConfig } from 'wagmi'

    const config = createConfig({
  -   connectors: [new RainbowConnector({ chains, projectId })],
  +   connectors: [
  +     rainbowConnector({
  +       appName: "RainbowKit demo",
  +       projectId: "YOUR_PROJECT_ID",
  +     }),
  +   ],
    })
  ```

  Follow the [Wagmi v2 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2) for additional configuration changes.

  **4. Check for breaking changes in `wagmi` and `viem`**

  If you use `wagmi` hooks and `viem` actions in your dApp, you will need to follow the full migration guides for v2:

  - [Wagmi v2 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2)
  - [Viem v2 Breaking Changes](https://viem.sh/docs/migration-guide.html#_2-x-x-breaking-changes)

### Patch Changes

- Updated dependencies [aa0269e]
  - @rainbow-me/rainbowkit@2.0.0

## 0.1.6

### Patch Changes

- Updated dependencies [33a8266]
  - @rainbow-me/rainbowkit@1.3.6

## 0.1.5

### Patch Changes

- Updated dependencies [2b0c7b3]
  - @rainbow-me/rainbowkit@1.3.5

## 0.1.4

### Patch Changes

- Updated dependencies [a79609b]
  - @rainbow-me/rainbowkit@1.3.4

## 0.1.3

### Patch Changes

- Updated dependencies [5a184e9]
  - @rainbow-me/rainbowkit@1.3.3

## 0.1.2

### Patch Changes

- Updated dependencies [7ba94f48]
  - @rainbow-me/rainbowkit@1.3.2

## 0.1.1

### Patch Changes

- Updated dependencies [dba51779]
  - @rainbow-me/rainbowkit@1.3.1

## 0.1.0

### Minor Changes

- 9ce75a65: The `RainbowButton` component is the simplest way to add support for Rainbow Wallet to dApps that use `wagmi` and prefer a more custom connector experience over [RainbowKit](https://www.rainbowkit.com/docs/installation).

  **1. Install `@rainbow-me/rainbow-button` and its peer dependencies**

  The package is compatible with Next.js, React, and Vite. Ensure that you follow peer dependency warnings.

  ```bash
  npm install @rainbow-me/rainbow-button wagmi viem
  ```

  **2. Configure with Wagmi and install the RainbowButton**

  Pass an instance of the `RainbowConnector` to your Wagmi connector list, and wrap your app in the `RainbowButtonProvider`. Then drop-in the `RainbowButton` component into your wallet list.

  ```tsx
  import "@rainbow-me/rainbow-button/styles.css";
  import {
    RainbowButtonProvider,
    RainbowConnector,
  } from "@rainbow-me/rainbow-button";

  const config = createConfig({
    connectors: [new RainbowConnector({ chains, projectId })],
    publicClient,
  });

  function MyApp({ Component, pageProps }: AppProps) {
    return (
      <WagmiConfig config={config}>
        <RainbowButtonProvider>{/* Your App */}</RainbowButtonProvider>
      </WagmiConfig>
    );
  }

  export const YourApp = () => {
    return <RainbowButton />;
  };
  ```

  You can also use the `RainbowButton.Custom` component for custom implementations and styling.

  ```tsx
  <RainbowButton.Custom>
    {({ ready, connect }) => {
      return (
        <button type="button" disabled={!ready} onClick={connect}>
          Connect Rainbow
        </button>
      );
    }}
  </RainbowButton.Custom>
  ```

  **3. And that's it!**

  Now your users can enjoy a seamless connection experience for Rainbow — without any maintenance or headaches.

  A [`WalletButton`](https://www.rainbowkit.com/docs/wallet-button) component is also available in [RainbowKit](https://www.rainbowkit.com/docs/installation) if you'd like to adopt support for additional wallets.

### Patch Changes

- Updated dependencies [9ce75a65]
  - @rainbow-me/rainbowkit@1.3.0

## 0.0.1

### Patch Changes

- Initial beta release
