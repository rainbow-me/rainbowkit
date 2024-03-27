# @rainbow-me/rainbow-button

## 0.2.4

### Patch Changes

- Updated dependencies [77dcec3]
- Updated dependencies [6c240ba]
- Updated dependencies [34419b5]
- Updated dependencies [5c60239]
  - @rainbow-me/rainbowkit@2.0.4

## 0.2.3

### Patch Changes

- Updated dependencies [b80e8fa]
- Updated dependencies [985b80b]
- Updated dependencies [b25db9a]
  - @rainbow-me/rainbowkit@2.0.3

## 0.2.2

### Patch Changes

- Updated dependencies [524d7a0]
- Updated dependencies [2f637e4]
- Updated dependencies [c021746]
- Updated dependencies [df572f1]
  - @rainbow-me/rainbowkit@2.0.2

## 0.2.1

### Patch Changes

- Updated dependencies [5149dbd]
- Updated dependencies [1e7d3f4]
- Updated dependencies [c16541a]
- Updated dependencies [dbca966]
- Updated dependencies [f69c0e1]
- Updated dependencies [bb56562]
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

- Updated dependencies [c0a644a]
- Updated dependencies [41616b9]
- Updated dependencies [cf4955f]
- Updated dependencies [e5f5f03]
- Updated dependencies [c0bd68e]
- Updated dependencies [a79609b]
  - @rainbow-me/rainbowkit@1.3.4

## 0.1.3

### Patch Changes

- Updated dependencies [24b5a88]
- Updated dependencies [7565fb2]
- Updated dependencies [5a184e9]
  - @rainbow-me/rainbowkit@1.3.3

## 0.1.2

### Patch Changes

- Updated dependencies [7ba94f48]
  - @rainbow-me/rainbowkit@1.3.2

## 0.1.1

### Patch Changes

- Updated dependencies [3feab0e6]
- Updated dependencies [c9a8e469]
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
