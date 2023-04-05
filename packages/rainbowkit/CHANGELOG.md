# @rainbow-me/rainbowkit

## 0.12.7

### Patch Changes

- 4ef5c51: Fixed an issue that caused mobile WalletConnect redirects for signing request hooks to fail in Wagmi 0.12.x

## 0.12.6

### Patch Changes

- d35809e: Amended `rainbowWallet` connector extension support and URLs

  Improved UI flow for wallet connectors that don't specify `extension.instructions`

## 0.12.5

### Patch Changes

- 2b4ede4: Zerion Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from '@rainbow-me/rainbowkit';
  import { zerionWallet } from '@rainbow-me/rainbowkit/wallets';
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'Other',
      wallets: [zerionWallet({ chains })],
    },
  ]);
  ```

- 6a01368: Taho Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from '@rainbow-me/rainbowkit';
  import { tahoWallet } from '@rainbow-me/rainbowkit/wallets';
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'Other',
      wallets: [tahoWallet({ chains })],
    },
  ]);
  ```

- 936b523: OKX Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from '@rainbow-me/rainbowkit';
  import { okxWallet } from '@rainbow-me/rainbowkit/wallets';
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'Other',
      wallets: [okxWallet({ chains })],
    },
  ]);
  ```

- 7f669bd: Dawn Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from '@rainbow-me/rainbowkit';
  import { dawnWallet } from '@rainbow-me/rainbowkit/wallets';
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'Other',
      wallets: [dawnWallet({ chains })],
    },
  ]);
  ```

## 0.12.4

### Patch Changes

- 9b93f56: Added `safeWallet` connector to support Safe Apps. dApps that rely on `getDefaultWallets` will adopt this behavior automatically. dApps that rely on the Custom Wallet List should add `safeWallet` alongside `injectedWallet`.

## 0.12.3

### Patch Changes

- e7f1bec: `injectedWallet` now has a friendlier name and icon
- fe4f356: RainbowKit dApps that use `getDefaultWallets` or `injectedWallet` will now more eagerly display the fallback `injectedWallet` connector to better support dApp Browsers when a branded connector is unavailable.

## 0.12.2

### Patch Changes

- 2a1d230: Fixed `shimDisconnect` wallet connector option to maintain default Wagmi disconnect behavior when `shimDisconnect` is unspecified. RainbowKit wallet connectors now also accept all `InjectedConnectorOptions` options.
- 429a3c7: Improvements to RainbowKit UX on iPad

## 0.12.1

### Patch Changes

- 8f01a12: Bitski Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from '@rainbow-me/rainbowkit';
  import { bitskiWallet } from '@rainbow-me/rainbowkit/wallets';
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'Other',
      wallets: [
        argentWallet({ chains }),
        trustWallet({ chains }),
        bitskiWallet({ chains }),
        ledgerWallet({ chains }),
      ],
    },
  ]);
  ```

- 3399df5: MEW Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from '@rainbow-me/rainbowkit';
  import { mewWallet } from '@rainbow-me/rainbowkit/wallets';
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'Other',
      wallets: [
        argentWallet({ chains }),
        trustWallet({ chains }),
        mewWallet({ chains }),
        ledgerWallet({ chains }),
      ],
    },
  ]);
  ```

## 0.12.0

### Minor Changes

- 9838acf: The wagmi peer dependency has been updated to `0.12.x`.

  RainbowKit has adopted the `WalletConnectLegacyConnector` connector in `wagmi` for continued WalletConnect v1 support. Support for WalletConnect v2 and `WalletConnectConnector` will soon be available as a patch release, without breaking changes.

  Wallets will be transitioned automatically in future releases.

  Follow the steps below to migrate.

  #### 1. Upgrade RainbowKit and `wagmi` to their latest version

  ```bash
  npm i @rainbow-me/rainbowkit@^0.12.0 wagmi@^0.12.0
  ```

## 0.11.1

### Patch Changes

- 924ae82: Bumped minimum `wagmi` version to `0.11.7`

  Added `baseGoerli` chain support

- 5e233ea: Added `bsc` and `bscTestnet` chain support

## 0.11.0

### Minor Changes

- 1876ba0: The wagmi peer dependency has been updated to `0.11.x`.

  The minimum TypeScript version is now `4.9.4`

  Follow the steps below to migrate.

  ```bash
  npm i @rainbow-me/rainbowkit@^0.11.0 wagmi@^0.11.0
  ```

  If you use `wagmi` hooks in your application, you will need to check if your application has been affected by the breaking changes in `wagmi`.

  [You can see their migration guide here](https://wagmi.sh/react/migration-guide#011x-breaking-changes).

## 0.10.0

### Minor Changes

- 355402b: The wagmi peer dependency has been updated to `0.10.x`.

  Follow the steps below to migrate.

  ```bash
  npm i @rainbow-me/rainbowkit@^0.10.0 wagmi@^0.10.0
  ```

  If you use `wagmi` hooks in your application, you will need to check if your application has been affected by the breaking changes in `wagmi`.

  [You can see their migration guide here](https://wagmi.sh/react/migration-guide#010x-breaking-changes).

## 0.9.0

### Minor Changes

- 49f0ec9: The wagmi peer dependency has been updated to `0.9.x`.

  Follow the steps below to migrate.

  ```bash
  npm i @rainbow-me/rainbowkit@^0.9.0 wagmi@^0.9.0
  ```

  If you use `wagmi` hooks in your application, you will need to check if your application has been affected by the breaking changes in `wagmi`.

  [You can see their migration guide here](https://wagmi.sh/react/migration-guide#09x-breaking-changes).

## 0.8.1

### Patch Changes

- a1d6776: The wagmi peer dependency has been updated to `0.9.x`.

  Follow the steps below to migrate.

  #### 1. Upgrade RainbowKit and `wagmi` to their latest version:

  ```bash
  npm i @rainbow-me/rainbowkit@^0.9.0 wagmi@^0.9.0
  ```

  #### 2. Check for breaking changes in `wagmi`

  If you use `wagmi` hooks in your application, you will need to check if your application has been affected by the breaking changes in `wagmi`.

  [You can see their migration guide here](https://wagmi.sh/react/migration-guide#09x-breaking-changes).

## 0.8.0

### Minor Changes

- 6b37050: **Breaking**: Updated the `wagmi` peer dependency to `0.8.x`.

  ## Migration guide

  ### 1. Upgrade `wagmi` to `^0.8.0`

  ```bash
  npm i wagmi@^0.8.0
  ```

  ### 2. Follow `wagmi`'s migration guide

  You may need to follow [`wagmi`'s migration guide](https://wagmi.sh/docs/migration-guide) to migrate any breaking changes.

## 0.7.4

### Patch Changes

- e36da59: Add support for injected connector to Rainbow wallet
- 0ff4210: Add `wagmi@0.7.x` to peer dependencies

## 0.7.3

### Patch Changes

- 5a65178: Fix Coinbase Wallet mobile deep link

## 0.7.2

### Patch Changes

- 1de8203: Add `data-testid` attributes to support end-to-end testing.

  The following set of `data-testid` attribute values are now provided.

  - `rk-connect-button`
  - `rk-disconnect-button`
  - `rk-account-button`
  - `rk-chain-button`
  - `rk-wrong-network-button`
  - `rk-wallet-option-${wallet.id}`
  - `rk-chain-option-${chain.id}`
  - `rk-chain-option-disconnect`
  - `rk-auth-message-button`

  These attributes can be targeted with a selector like this:

  ```css
  [data-testid="rk-connect-button"]
  ```

## 0.7.1

### Patch Changes

- 6b6a73b: Ensure loading spinner is not visible on install prompt
- 5ddc813: Fix package.json exports field backwards compatibility for `@rainbow-me/rainbowkit/wallets`

## 0.7.0

### Minor Changes

- 2e6bb8f: Support tree shaking of individual wallets by exposing them as separate imports via the new `@rainbow-me/rainbowkit/wallets` entry point.

  In order to reduce bundle size, you can now select the individual wallets you want to import into your application.

  Note that since wallets are no longer namespaced via the `wallet` object, all wallets now have a `Wallet` suffix.

  ```diff
  -import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
  +import { connectorsForWallets } from '@rainbow-me/rainbowkit';
  +import {
  +  injectedWallet,
  +  rainbowWallet,
  +  metaMaskWallet,
  +  coinbaseWallet,
  +  walletConnectWallet,
  +} from '@rainbow-me/rainbowkit/wallets';

  const wallets = [
  -  wallet.injected({ chains }),
  -  wallet.rainbow({ chains }),
  -  wallet.metaMask({ chains }),
  -  wallet.coinbase({ chains, appName: 'My App' }),
  -  wallet.walletConnect({ chains }),
  +  injectedWallet({ chains }),
  +  rainbowWallet({ chains }),
  +  metaMaskWallet({ chains }),
  +  coinbaseWallet({ chains, appName: 'My App' }),
  +  walletConnectWallet({ chains }),
  ];
  ```

- 2e6bb8f: The Steakwallet backwards compatibility layer has been removed. Omni should be used instead, available via the new `@rainbow-me/rainbowkit/wallets` entry point.

  ```diff
  -import { wallet } from '@rainbow-me/rainbowkit';
  +import { omniWallet } from '@rainbow-me/rainbowkit/wallets';

  const wallets = [
  -  wallet.steak({ chains }),
  +  omniWallet({ chains }),
  ];
  ```

## 0.6.2

### Patch Changes

- ecd7209: The new Wallet installation flows add two new colors to RainbowKit's `colors` property in the custom `theme` object: `downloadBottomCardBackground` and `downloadTopCardBackground`. Additionally, we now include the optional `iconAccent` prop in the `Wallet` object, specifically for wallets with both a browser extension and an app, to use as the accent color for the new download installation flows.
- 248a1cb: Generate a new QR code when WalletConnect request is rejected

## 0.6.1

### Patch Changes

- 85eb3bd: Update the desktop Connect Modal to show "Recently Connected Wallets" within their respective group. Previously, they were being plucked into their own "Recent" group.
- fbf9d82: Ensure `styles.css` directory is included in npm bundle

  This is a follow-up to a fix released in v0.5.2 which added a compatibility layer for Jest's module resolver.

## 0.6.0

### Minor Changes

- c944ddc: Allow custom wallets to automatically hide themselves based on the availability of other wallets in the list. This can be achieved via the new optional `hidden` function on the `Wallet` type.

  **Example usage**

  This is an example of a custom wallet that hides itself if another injected connector is available.

  ```ts
  import type Wallet from '@rainbow-me/rainbowkit';
  import { InjectedConnector } from 'wagmi/connectors/injected';

  const myCustomWallet: Wallet = {
    hidden: ({ wallets }) => {
      return wallets.some(
        wallet =>
          wallet.installed &&
          (wallet.connector instanceof InjectedConnector ||
            wallet.id === 'coinbase')
      );
    },
    ...etc,
  };
  ```

- c944ddc: Add `installed` property to `wallet.coinbase` to support detecting whether Coinbase Wallet SDK's injected connector is available

### Patch Changes

- c944ddc: Automatically hide "Injected Wallet" option if another injected wallet in the list is available

  **Migration guide**

  Previously we provided instructions for manually calculating whether the "Injected Wallet" option should be visible.

  ```ts
  const needsInjectedWalletFallback =
    typeof window !== 'undefined' &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

  const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        wallet.rainbow({ chains }),
        wallet.metaMask({ chains }),
        wallet.coinbase({ appName: 'My RainbowKit App', chains }),
        wallet.metaMask({ chains }),
        ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
      ],
    },
  ]);
  ```

  This manual logic should no longer be needed since it's now handled automatically, meaning that the previous example could be simplified in the following way.

  ```ts
  const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        wallet.rainbow({ chains }),
        wallet.metaMask({ chains }),
        wallet.coinbase({ appName: 'My RainbowKit App', chains }),
        wallet.metaMask({ chains }),
        wallet.injected({ chains }),
      ],
    },
  ]);
  ```

  In addition, since the "Injected Wallet" option is only rendered when necessary based on the end user's browser environment, it's recommended that you place it at the start of the list to ensure it's visible.

  ```ts
  const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        wallet.injected({ chains }),
        wallet.rainbow({ chains }),
        wallet.metaMask({ chains }),
        wallet.coinbase({ appName: 'My RainbowKit App', chains }),
        wallet.metaMask({ chains }),
      ],
    },
  ]);
  ```

- c944ddc: Move the "Injected Wallet" fallback option to the start of the default wallet list when present

  This option is only presented when an injected wallet is available that isn't handled by another wallet in the list, which means that it's the option most likely to be selected by the end user. As a result, we now give it the highest priority in the list returned from `getDefaultWallets`.

- c944ddc: Ensure TokenPocket is not detected as MetaMask

## 0.5.3

### Patch Changes

- 52e2ad6: Fix MetaMask mobile browser detection and app installation instructions

## 0.5.2

### Patch Changes

- 12912b3: Fix the `@rainbow-me/rainbowkit/styles.css` import for Jest, and other tooling that doesn't support the `exports` field in `package.json`.

  Jest currently has issues when importing RainbowKit styles due to lack of support for the `exports` field, which we use to publicly alias `@rainbow-me/rainbowkit/dist/index.css` as `@rainbow-me/rainbowkit/styles.css`. To fix this, we now include a `styles.css` _directory_ in the RainbowKit package containing a `package.json` file whose `main` field points to `"../dist/index.css"`.

- fcfc13d: Improve accessibility in Chain switcher button
- 3f9013f: Rename Steakwallet to Omni and leave `steak` as a deprecated wallet.

  ```
  import { wallet } from '@rainbow-me/rainbowkit';

  const omni = wallet.omni({ chains });
  ```

## 0.5.1

### Patch Changes

- 8060ccd: Add Optimism Goerli and Sepolia chain information now that they are first-class chains in Wagmi.
- 4dfe834: Provide download options for wallets with both browser extensions and mobile apps.
- 8060ccd: Fix small spelling mistake in the WalletConnect modal flow.

## 0.5.0

### Minor Changes

- 737a1d6: Added support for authentication.

  RainbowKit now provides first-class support for [Sign-In with Ethereum](https://login.xyz) and [NextAuth.js](https://next-auth.js.org) via the `@rainbow-me/rainbowkit-siwe-next-auth` package, as well as lower-level APIs for integrating with custom back-ends and message formats.

  For more information on how to integrate this feature into your application, check out the full [RainbowKit authentication guide.](https://www.rainbowkit.com/docs/authentication)

  **Migration guide for custom ConnectButton implementations**

  If you're using `ConnectButton.Custom` and want to make use of authentication, you'll want to update the logic in your render prop to use the new `authenticationStatus` property, which is either `"loading"` (during initial page load), `"unauthenticated"` or `"authenticated"`.

  For example, if you wanted to display the "Connect Wallet" state when the user has connected their wallet but haven't authenticated, you can calculate the state in the following way:

  ```tsx
  <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      const ready = mounted && authenticationStatus !== 'loading';
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus || authenticationStatus === 'authenticated');

      return (
        <div
          {...(!ready && {
            'aria-hidden': true,
            'style': {
              opacity: 0,
            },
          })}
        >
          {/* etc... */}
        </div>
      );
    }}
  </ConnectButton.Custom>
  ```

  For a more complete example and API documentation, check out the [custom ConnectButton documentation.](https://www.rainbowkit.com/docs/custom-connect-button)

### Patch Changes

- 488c5a1: Fix error on desktop where selecting Coinbase Wallet while extension was installed would show you the wrong copy.

## 0.4.8

### Patch Changes

- 4333995: Support filtering chains before passing them to `RainbowKitProvider`.

  This is particularly useful if you're building an L2-only project and you want mainnet to be available for resolving ENS details but you don't want it to be listed in the chain selector.

  **Example usage**

  This example uses Polygon while supporting ENS from mainnet.

  ```tsx
  const {
    chains: [, ...chains], // Omit first chain (mainnet), get the rest
    provider,
    webSocketProvider,
  } = configureChains(
    [chain.mainnet, chain.polygon],
    [
      alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
      publicProvider(),
    ]
  );
  ```

## 0.4.7

### Patch Changes

- 1a4f2f7: Add a 'compact' modal size option for developers looking to use a simpler version of RainbowKit, available by setting the `modalSize` prop to `"compact"` on `RainbowKitProvider`.

## 0.4.6

### Patch Changes

- aae3163: Fix error caused by attempting to prevent page scrolling when the body element's overflow is set to hidden.
- 948c036: Avoid switching chains after connecting if the user's wallet is already on a supported chain

## 0.4.5

### Patch Changes

- 8dd5a74: Update wagmi peer dependency to include v0.6

## 0.4.4

### Patch Changes

- fd08aa1: Avoid ENS requests when mainnet isn't in list of configured chains

## 0.4.3

### Patch Changes

- 4857e75: Fix duplicate wallets in connect modal after hot module reloading
- c6a1033: Added `initialChain` prop to `RainbowKitProvider`

  RainbowKit (as of v0.3.2) automatically connects to the first chain in the `chains` array passed to `RainbowKitProvider`. This behavior can now be customized via the `initialChain` prop.

  The initial chain can be configured using a chain ID.

  ```tsx
  <RainbowKitProvider chains={chains} initialChain={1}>
  ```

  As a convenience, you can also pass a chain object.

  ```tsx
  <RainbowKitProvider chains={chains} initialChain={chain.mainnet}>
  ```

- 396308f: Added Hooks for programmatically opening modals

  The following Hooks are now provided to allow the programmatic opening of modals anywhere in your application.

  - `useConnectModal`
  - `useAccountModal`
  - `useChainModal`

  Each of these Hooks returns an object with a function for opening its respective modal. Note that the returned functions will be undefined if your application is not in the required state for the modal to be open.

  **Example usage**

  ```tsx
  import {
    useConnectModal,
    useAccountModal,
    useChainModal,
  } from '@rainbow-me/rainbowkit';

  export const YourApp = () => {
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();

    return (
      <>
        {openConnectModal && (
          <button onClick={openConnectModal} type="button">
            Open Connect Modal
          </button>
        )}

        {openAccountModal && (
          <button onClick={openAccountModal} type="button">
            Open Account Modal
          </button>
        )}

        {openChainModal && (
          <button onClick={openChainModal} type="button">
            Open Chain Modal
          </button>
        )}
      </>
    );
  };
  ```

## 0.4.2

### Patch Changes

- 0213b52: Use consistent balance rounding logic between account button and modal

## 0.4.1

### Patch Changes

- 3637bbb: Use Mainnet ENS name / avatar on other networks if available
- 3637bbb: Add a disconnect option to the switch network modal when connected to unsupported network

## 0.4.0

### Minor Changes

- 08d189b: Updated `wagmi` peer dependency to `0.5.x`

## 0.3.7

### Patch Changes

- b2b46ef: Fix WalletConnect deep linking for wallets with custom URL schemes

## 0.3.6

### Patch Changes

- d905271: Fix issue on iOS in non-Safari browsers and WebViews where a blank tab is left behind after connecting via WalletConnect

## 0.3.5

### Patch Changes

- 40d838e: Pinned the `wagmi` peer dependency to `0.4.x`
- 1ab9c07: Fix bug where "onConnecting" callbacks were fired multiple times when toggling between WalletConnect-based wallets
- 1a7d50c: Update connect button height to be consistent between states.

## 0.3.4

### Patch Changes

- ac63f9a: Detect Trust Wallet in-app browser

## 0.3.3

### Patch Changes

- ee81177: Support deep linking of wallet interactions for WalletConnect on Android

## 0.3.2

### Patch Changes

- 33a2dd7: Automatically connect to the first chain in the `chains` array to avoid presenting the "Wrong network" state immediately after connecting

## 0.3.1

### Patch Changes

- 9d431fb: Update [react-remove-scroll](https://github.com/theKashey/react-remove-scroll) to v2.5.4 to fix an issue with scrollbar space preservation when the modal is opened.

  More detail: https://github.com/theKashey/react-remove-scroll/issues/71.

- 11ed088: Abbreviate large account balances using standard k/m/b units, fixes cases where balances appeared in exponential notation.

## 0.3.0

### Minor Changes

- 233a6d7: **Breaking:** Removed the `chainId` parameter from `createConnector` on the `Wallet` type (Custom Wallets).

  **Note that all built-in wallets are using the new API. Most consumers will be unaffected. This change only affects consumers that have created/consumed [custom wallets](rainbowkit.com/docs/custom-wallets).**

  If you previously derived RPC URLs from the `chainId` on `createConnector`, you can now remove that logic as `wagmi` now handles RPC URLs internally when used with `configureChains`.

  ```diff
  import { connectorsForWallets, wallet, Chain, Wallet } from '@rainbow-me/rainbowkit';
  import { chain, configureChains } from 'wagmi';
  import { alchemyProvider } from 'wagmi/providers/alchemy';
  import { publicProvider } from 'wagmi/providers/public';
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

  export interface MyWalletOptions {
    chains: Chain[];
  }

  -const chains = [chain.mainnet]
  +const { chains } = configureChains(
  +  [chain.mainnet],
  +  [
  +    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
  +    publicProvider(),
  +  ]
  +);

  export const rainbow = ({ chains }: MyWalletOptions): Wallet => ({
    ...
  - createConnector: ({ chainId }) => {
  + createConnector: () => {
  -   const rpc = chains.reduce(
  -     (rpcUrlMap, chain) => ({
  -       ...rpcUrlMap,
  -       [chainId]: chain.rpcUrls.default,
  -     }),
  -     {}
  -   );
      const connector = new WalletConnectConnector({
        chains,
        options: {
          qrcode: false,
  -       rpc,
        },
      });
    }
    ...
  }

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        rainbow({ chains }),
      ],
    },
  ]);
  ```

## 0.2.5

### Patch Changes

- ce473cd: Fix WalletConnect in Brave when a large number of WalletConnect-based wallets have been configured

  Brave’s fingerprint prevention logic silently blocks WebSocket connections if too many are opened in the same session. Since we create a fresh WalletConnect connector instance for each wallet, consumers that have configured a large number of wallets can inadvertently break the connection flow in Brave.

  To fix this, we now share WalletConnect connector instances between wallets when the connectors are being provided with the same options.

## 0.2.4

### Patch Changes

- 867067c: Improve deep linking support for WalletConnect-based wallets on iOS

  We now store the wallet’s universal link URL in local storage so that WalletConnect can use it for deep linking. This is typically handled by the official WalletConnect modal, but we need to handle it ourselves when rendering custom QR codes within RainbowKit.

## 0.2.3

### Patch Changes

- 0686c2f: Fix visual bug where focus outlines were out of sync with buttons/links on click when toggling between keyboard and mouse usage
- dfc7d13: Add the `avatar` prop to `RainbowKitProvider` to allow developers to provide their own custom avatar component.

## 0.2.2

### Patch Changes

- 4be196e: Ensure Brave Wallet and Tokenary aren’t detected as MetaMask

  Both Brave Wallet and Tokenary set `window.ethereum.isMetaMask` to `true` which causes issues with the logic for providing the fallback "Injected Wallet" option. Similar to wagmi, we now detect when MetaMask is being impersonated by these wallets.

- 7403fab: Add dialog overlay blurs to the theme
- 4be196e: Add Brave Wallet support

  Brave Wallet is now included as part of the default set of wallets returned from `getDefaultWallets`, but note that is only visible within the Brave browser to avoid prompting users to download an entirely different web browser.

  Brave Wallet is also included as part of the `wallet` object to support its usage in [custom wallet lists,](https://www.rainbowkit.com/docs/custom-wallet-list) e.g. `wallet.brave({ chains, shimDisconnect: true })`.

## 0.2.1

### Patch Changes

- a921853: Add `disclaimer` to the `appInfo` property in `RainbowKitProvider`, which displays a custom disclaimer at the bottom of the connection modal's welcome screen

## 0.2.0

### Minor Changes

- c0c494a: **Breaking:** Updated the `wagmi` peer dependency to `^0.4` & removed the `configureChains` & `apiProvider` exports.

  You now need to use [wagmi's configureChains](https://wagmi.sh/docs/providers/configuring-chains) function and providers.

  ## Migration guide

  ### 1. Upgrade `wagmi` to `^0.4.2`

  ```
  npm i wagmi@^0.4.2
  ```

  ### 2. Migrate `configureChains`

  ```diff
  import {
    apiProvider,
  -  configureChains
  } from '@rainbow-me/rainbowkit';
  +import { configureChains } from 'wagmi';
  ```

  ### 3. Migrate providers

  #### `apiProvider.alchemy` to `alchemyProvider`

  ```diff
  -import {
  -  apiProvider,
  -} from '@rainbow-me/rainbowkit';
  import { configureChains } from 'wagmi';
  +import { alchemyProvider } from 'wagmi/providers/alchemy';

  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  - [apiProvider.alchemy(process.env.ALCHEMY_ID)]
  + [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID })]
  );
  ```

  #### `apiProvider.infura` to `infuraProvider`

  ```diff
  -import {
  -  apiProvider,
  -} from '@rainbow-me/rainbowkit';
  import { configureChains } from 'wagmi';
  +import { infuraProvider } from 'wagmi/providers/infura';

  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  - [apiProvider.infura(process.env.INFURA_ID)]
  + [infuraProvider({ infuraId: process.env.INFURA_ID })]
  );
  ```

  #### `apiProvider.jsonRpc` to `jsonRpcProvider`

  ```diff
  -import {
  -  apiProvider,
  -} from '@rainbow-me/rainbowkit';
  import { configureChains } from 'wagmi';
  +import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon],
    [
  -   apiProvider.jsonRpc(chain => ({
  -     rpcUrl: `https://${chain.id}.example.com`,
  -   })),
  +   jsonRpcProvider({
  +     rpc: chain => ({
  +       http: `https://${chain.id}.example.com`,
  +     }),
  +   }),
    ]
  );
  ```

  #### `apiProvider.fallback` to `publicProvider`

  ```diff
  -import {
  -  apiProvider,
  -} from '@rainbow-me/rainbowkit';
  import { configureChains } from 'wagmi';
  +import { publicProvider } from 'wagmi/providers/public';

  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon],
  - [apiProvider.fallback()]
  + [publicProvider()]
  );
  ```

## 0.1.2

### Patch Changes

- 0b98497: Add Steakwallet to list of available wallets

  Example usage:

  ```tsx
  import { wallet } from '@rainbow-me/rainbowkit';

  const steakwallet = wallet.steak({ chains });
  ```

## 0.1.1

### Patch Changes

- 85be3f8: Avatar image is now correctly centered, and background + emoji are hidden if image is present.
- 4062169: Add `ethers` to peer dependencies to ensure consistent versioning with wagmi

  We previously had a direct dependency on `@ethersproject/providers`, but this meant that provider instances generated by RainbowKit could potentially clash with the version of Ethers.js installed alongside wagmi. To avoid this, we’re now relying on the `ethers` peer dependency that wagmi already requires, ensuring that there's only ever a single copy of `ethers` between them.

- 5224d54: Adds imToken to available wallets
- b1b09c5: Add the `label` prop to the `ConnectButton` component to easily display a custom label on the button.
- 39fa4cb: Fix bug where click events were ignored on the edges of links/buttons due to scale transforms during hover/active states
- 127690a: Added an aria label to the `x` button inside the dialog
- 5213855: Fix usage of quotes in custom theme font values
- 209aa43: Add line-height values to all text styles
- be6ee16: Pin to exact versions of dependencies and reduce bundle size by inlining platform/browser checks from `detect-browser`
- c4e7f67: Increase specificity of RainbowKit styles to avoid app styles overriding them

  In order to avoid issues with CSS ordering and specificity, we've prepended a data attribute selector to all styles in RainbowKit. This ensures that low-specificity styles like CSS resets won't override RainbowKit styles if they're applied later in the document.

## 0.1.0

### Minor Changes

- 5f20dc0: Initial beta release

### Patch Changes

- b785e31: Make `getDefaultWallets` return an object containing `connectors` and `wallets`

  In order to streamline the setup process, the `getDefaultWallets` function now returns an object containing both `connectors` and `wallets` properties. This means that most consumers will no longer need to use the `connectorsForWallets` function, accessing the generated `connectors` value instead.

  **Migration guide**

  ```diff
  -import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
  +import { getDefaultWallets } from '@rainbow-me/rainbowkit';

  -const wallets = getDefaultWallets({
  +const { connectors } = getDefaultWallets({
    /* ... */
  });

  -const connectors = connectorsForWallets(wallets);
  ```

  If you were modifying the wallet list returned from `getDefaultWallets`, you’ll need to destructure the `wallets` property from the returned object.

  ```diff
  import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';

  -const wallets = getDefaultWallets({
  +const { wallets } = getDefaultWallets({
    /* ... */
  });

  const connectors = connectorsForWallets(wallets);
  ```

- 0cad1ad: Uses wagmi's Metamask Connector instead of Injected Connector for RainbowKit's metmask wallet
- 353d2ef: Add support for custom `accentColor` values to built-in themes and add an `accentColorForeground` option to support custom text colors when rendered on top of the accent color

  To enable this change, the built in `blue`, `green`, `orange`, `pink`, `purple` and `red` accent color presets are now provided by an `accentColors` property on each theme function. If you were using the `accentColor` option previously and want to maintain the existing behavior, you’ll need to make the following change:

  ```diff
  darkTheme({
  -  accentColor: 'purple',
  +  ...darkTheme.accentColors.purple,
  });
  ```

  **Example usage**

  When using a custom accent color:

  ```tsx
  import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

  const App = () => {
    return (
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
        })}
      >
        {/* Your App */}
      </RainbowKitProvider>
    );
  };
  ```

  When using a built-in accent color preset:

  ```tsx
  import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

  const App = () => {
    return (
      <RainbowKitProvider
        theme={darkTheme({
          ...darkTheme.accentColors.purple,
        })}
      >
        {/* Your App */}
      </RainbowKitProvider>
    );
  };
  ```

- e9a374e: You now pass the `learnMoreUrl` as a property to the new `appInfo` property instead of directly to `RainbowkitProvider`. This `appInfo` also exposes `appName` to display your app's name in Rainbowkit.
- 2c79870: Reserve height of `ConnectButton` during server/static render

  In order to reduce layout shift during page load, the `ConnectButton` component now renders its content in an invisible and inert state before mount.

- e570773: Shrink bundled CSS size by using minified identifiers

  We were previously publishing CSS with human-readable debug identifiers (class names, keyframes etc.), but these have now been replaced with their smaller hash-only versions, e.g. the `.reset__iekbcc0` class is now `.iekbcc0`.

  While these identifiers have never been guaranteed to be stable between versions, it’s possible that some consumers may have been given a false sense of API stability due to these debug names. If you have any custom CSS overrides that break due to these changes, it’s recommended that you avoid referencing them entirely rather than updating them since they’re likely to change again without notice in future releases.

- 7ac6f61: Add icons to testnets
- 353d2ef: Fix accent color contrast issues with `dark`/`midnight` themes

  When using the `green`, `orange` or `pink` accent color presets, the foreground text color is now black rather than white to improve contrast.

- 353d2ef: Remove the `yellow` accent color preset from built-in themes

  Since the color value used for the yellow preset is unable to be made accessible consistently across all themes, it is now removed from the built-in theme APIs.

- 5444298: The `mobile.getUri` & `desktop.getUri` attributes are now async on the wallet connector API.

  Before:

  ```tsx
  {
    mobile: {
      getUri: () => connector.getProvider().connector.uri
    },
  }
  ```

  After

  ```tsx
  {
    mobile: {
      getUri: async () => (await connector.getProvider()).connector.uri;
    }
  }
  ```

- 77e74be: `ConnectButton.Custom` no longer renders `null` when unmounted.

  In order to support custom loading indicators and/or hooks in your render function, `ConnectButton.Custom` no longer renders `null` internally before mount.

  **Migration guide**

  If you wish to maintain the existing behavior, a new `mounted` boolean is passed to your render function which allows you to render `null` manually when `mounted` is `false`.

  ```diff
  import { ConnectButton } from '@rainbow-me/rainbowkit';

  export default () => (
    <ConnectButton.Custom>
      {({
  +      mounted,
        ...etc,
        }) => {
  +        if (!mounted) {
  +          return null;
  +        }

          return <button>...</button>;
        }}
    </ConnectButton.Custom>
  );
  ```

- 9e17b07: Hide the network switcher when only a single chain has been configured.
- 8a4b3fe: wagmi's CoinbaseWalletConnector handles injected and mobile/non-injected use cases now.
- c927bd7: Adds Ledger Live to available wallets (using WC)
- 5444298: Updated the `wagmi` peer dependency to `^0.3.0`.

  `wagmi@0.3.x` has introduced breaking changes from `0.2.x` that you will need to be aware of when upgrading. [See the migration guide to `wagmi@0.3.x` here](https://wagmi.sh/docs/migrating-to-03).

  In order to use `wagmi` with RainbowKit, you will now need to create a wagmi client that you will pass to `WagmiProvider` (instead of passing configuration directly).

  Before:

  ```tsx
  import { WagmiProvider } from 'wagmi';

  const App = () => {
    return (
      <WagmiProvider autoConnect connectors={connectors} provider={provider}>
        <RainbowKitProvider chains={chains}>
          <YourApp />
        </RainbowKitProvider>
      </WagmiProvider>
    );
  };
  ```

  After:

  ```tsx
  import { createClient, WagmiProvider } from 'wagmi';

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const App = () => {
    return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <YourApp />
        </RainbowKitProvider>
      </WagmiProvider>
    );
  };
  ```

  Note: if you are using `chains` from wagmi, the default network names are now designed to suitable for usage within the UI.

  Before:

  ```tsx
  const chains = [
    { ...chain.mainnet, name: 'Ethereum' },
    { ...chain.polygonMainnet, name: 'Polygon' },
  ];
  ```

  After:

  ```tsx
  const chains = [chain.mainnet, chain.polygon];
  ```

- 9d351d0: All wallet and chain icons are now included within the RainbowKit package.

  In order to improve image loading performance and eliminate the dependency on remote URLs, all built-in wallet and chain icons are now included within the RainbowKit package itself as Base64 data URLs. Since this would typically have a negative impact on bundle size, all image loading is done via dynamic imports and deferred until after app hydration.

- df6c310: Truncates long ENS names
- 792fd03: Add cool mode
- 13fa857: Add recent transaction support

  You can now opt in to displaying recent transactions within RainbowKit’s account modal. Note that all transactions must be manually registered with RainbowKit in order to be displayed.

  First enable the `showRecentTransactions` option on `RainbowKitProvider`.

  ```tsx
  import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

  const App = () => {
    return (
      <RainbowKitProvider showRecentTransactions={true} {...etc}>
        {/* ... */}
      </RainbowKitProvider>
    );
  };
  ```

  Transactions can then be registered with RainbowKit using the `useAddRecentTransaction` hook.

  ```tsx
  import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

  export default () => {
    const addRecentTransaction = useAddRecentTransaction();

    return (
      <button
        onClick={() => {
          addRecentTransaction({
            hash: '0x...',
            description: '...',
          });
        }}
      >
        Add recent transaction
      </button>
    );
  };
  ```

  Once a transaction has been registered with RainbowKit, its status will be updated upon completion.

  By default the transaction will be considered completed once a single block has been mined on top of the block in which the transaction was mined, but this can be configured by specifying a custom `confirmations` value.

  ```tsx
  import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

  export default () => {
    const addRecentTransaction = useAddRecentTransaction();

    return (
      <button
        onClick={() => {
          addRecentTransaction({
            hash: '0x...',
            description: '...',
            confirmations: 100,
          });
        }}
      >
        Add recent transaction
      </button>
    );
  };
  ```

- a1633cf: Load all illustrations asynchronously to keep them out of the main bundle
- 13fa857: Add support for pending transaction indicators to `ConnectButton.Custom`

  After registering transactions using the new `useAddRecentTransaction` hook, you can now choose to display a pending transaction indicator via the new `account.hasPendingTransactions` property which is passed to your render function.

- 9d351d0: Update `Wallet` API.

  Note that this only affects consumers that have created custom wallets. All built-in wallets have been updated to use the new API.

  - The `iconUrl` property now optionally accepts an async function that returns a string (`() => Promise<string>`). This is to support bundling lazy-loadable Base64 images in JavaScript when publishing to npm. All built-in wallets are now using this feature to delay loading of images until after app hydration.
  - The `iconBackground` property has been added to improve the visual appearance of wallet icons while loading.
  - The `createConnector().qrCode.iconUrl` property has been removed in order to simplify the API and the QR code UI logic since none of the built-in wallets made use of it, but it may be reintroduced in the future if deemed necessary.
  - Added `createConnector().desktop` to indicate the wallet has a desktop deeplink, which will then use `createConnector().desktop.getUri()` for the URI.

- fb7c8ae: Add `configureChains` API.

  The `configureChains` function allows you to configure your chains with a selected API provider (Alchemy, Infura, JSON RPC). This means you don't have to worry about deriving your own RPC URLs for each chain, and instantiating a Ethereum Provider.

  `configureChains` accepts 2 parameters: an array of `chains`, and an [array of API providers](https://rainbowkit.com/docs/api-providers).

  [Learn more about configuring chains & API providers.](https://rainbowkit.com/docs/api-providers)

  Before:

  ```tsx
  import {
    RainbowKitProvider,
    Chain,
    getDefaultWallets,
  } from '@rainbow-me/rainbowkit';
  import { createClient, WagmiProvider, chain } from 'wagmi';
  import { providers } from 'ethers';

  const infuraId = process.env.INFURA_ID;

  const provider = ({ chainId }: { chainId?: number }) =>
    new providers.InfuraProvider(chainId, infuraId);

  const chains: Chain[] = [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
  ];

  const { connectors } = getDefaultWallets({
    chains,
    infuraId,
    appName: 'My RainbowKit App',
    jsonRpcUrl: ({ chainId }) => {
      const rpcUrls = (chains.find(x => x.id === chainId) || chain.mainnet)
        .rpcUrls;
      return typeof rpcUrls.default === 'string'
        ? rpcUrls.default
        : rpcUrls.default[0];
    },
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const App = () => {
    return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <YourApp />
        </RainbowKitProvider>
      </WagmiProvider>
    );
  };
  ```

  After:

  ```tsx
  import {
    apiProvider,
    Chain,
    configureChains,
    getDefaultWallets,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';
  import { createClient, WagmiProvider, chain } from 'wagmi';
  import { providers } from 'ethers';

  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [apiProvider.infura(process.env.INFURA_ID)]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const App = () => {
    return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <YourApp />
        </RainbowKitProvider>
      </WagmiProvider>
    );
  };
  ```

  > Note: If you prefer to use Alchemy, you can replace `apiProvider.infura` with `apiProvider.alchemy` and a valid Alchemy ID.

- 26247ea: Update `wagmi` peer dependency to `^0.2.0`
- 3295746: Update Rainbowkit `Theme` object.

  Added:

  - `shadows.walletLogo`

  Renamed:

  - `colors.actionButtonText` is now `colors.accentColorForeground`

  Removed:

  - `borders.modalBorderWidth`

- 9d351d0: Update `RainbowKitChain` API.

  Note that this only affects consumers that have customized chain metadata. All built-in chains have been updated to use the new API.

  - The `iconUrl` property now optionally accepts an async function that returns a string (`() => Promise<string>`). This is to support bundling lazy-loadable Base64 images in JavaScript when publishing to npm. All built-in chains are now using this feature to delay loading of images until after app hydration.
  - The `iconBackground` property has been added to improve the visual appearance of chain icons while loading.

- 13fa857: `RainbowKitProvider` must now be nested inside `WagmiProvider` since it now makes use of wagmi hooks internally.

## 0.0.2

### Patch Changes

- 670cbfc: **Theme API changes**

  Theme object has been updated in the following way:

  **Renamed**

  `colors.buttonBorder` -> `colors.actionButtonBorder`
  `colors.buttonSecondaryBackground` -> `colors.actionButtonSecondaryBackground`
  `colors.buttonText` -> `colors.actionButtonText`
  `colors.modalClose` -> `colors.closeButton`
  `colors.modalCloseBackground` -> `colors.closeButtonBackground`

  **Added**

  `borders.modalBorderWidth`
  `colors.actionButtonBorderMobile`
  `colors.generalBorderDim`
  `colors.modalTextDim`
  `radii.actionButton`
  `radii.modalMobile`
  `shadows.profileDetailsAction`

  **Removed**

  `colors.menuBackground`
  `colors.menuText`
  `colors.menuTextAction`
  `colors.menuTextDisconnect`
  `colors.menuTextSecondary`
  `shadows.menu`

  New theme type can be found in the Readme.

  **New Accent Colors**

  Developers can now choose between 7 accent colors (`"blue" | "green" | "orange" | "pink" | "purple" | "red" | "yellow"`).

- 06fb716: Inline built-in wallet icons as data URLs
- d553141: Fix `chainId` type error in strict mode
- a696f2c: Add Hardhat chain (chainId: 31337) icon
- e33d34b: Add support for custom “Learn more” URLs

  - To customize the URL for the “Learn more” link within the “What is a wallet?” section, you can provide the optional `learnMoreUrl` prop to `RainbowKitProvider`.
  - If you‘ve created a custom wallet with QR code instructions, you must now provide the `qrCode.instructions.learnMoreUrl` property.

- 96e78b3: Add `fontStack` option to built-in themes, supporting `"rounded"` and `"system"` variants.

  You can now opt out of using [SF Pro Rounded,](https://developer.apple.com/fonts) using default system fonts instead.

  **Example usage**

  ```tsx
  const theme = lightTheme({
    fontStack: 'system',
  });
  ```

- 5aef783: Prevent body from scrolling while modal is open.
- 8d0025a: Increase z-index of modal to `2147483646` (Coinbase modal z-index minus 1) to ensure RainbowKit renders on top of other elements.
- 136c6ea: Adds Argent & Trust to available wallets
- 6df9c50: Fix error when using a chain that doesn’t have an explorer URL defined
- 9f05ad7: Fix tablet styles

  The sizing and positioning of modals have been fixed on tablet devices.

- fe2066f: Highlight the most recently used wallets at the start of the wallet list.
- c174e12: Render WalletConnect QR code within RainbowKit modal

  The official WalletConnect modal is still available if needed, but the QR code is now rendered in the standard RainbowKit style when selecting WalletConnect from the wallet list.

- baf998c: Update `Wallet` API

  Note that this only affects consumers that have created custom wallets. All built-in wallets have been updated to use the new API.

  - The `Wallet` type is now an object rather than a function. Static properties (`id`, `name`, etc.) have been left at the top level, while the `connector` and connection method configuration has been moved to the `wallet.getConnector()` function. This allows consumers to tell wallet instances apart without having to instantiate their connectors.
    - `connector` has been moved to `createConnector().connector`
    - `qrCode` has been moved to `createConnector().qrCode`
    - `qrCode.logoUri` has been renamed to `qrCode.iconUrl` for consistency.
    - `instructions` has been moved to `createConnector().qrCode.instructions` and is now an object with a `steps` array where each item has a `step` property that is either `"install"`, `"create"`, or `"scan"`.
    - `getMobileConnectionUri` has been moved to `createConnector().mobile.getUri`
  - `ready` has been renamed to `installed` to differentiate it from wagmi’s `ready` concept.
  - `downloadUrls` has been restructured into an object with optional values `android`, `ios`, `browserExtension`, `qrCode` (link from scanning QR code on desktop).
  - You can now provide an optional `shortName` property which will be used on mobile.

- eaa5bf6: Support custom wallet groups

  Custom wallets must now be defined using the `WalletList` type to support grouping.

  **Example usage**

  ```tsx
  import { wallet, WalletList } from '@rainbow-me/rainbowkit';

  const wallets: WalletList = [
    {
      groupName: 'Suggested',
      wallets: [wallet.rainbow({ chains })],
    },
  ];
  ```

## 0.0.1

### Patch Changes

- ce3f499: Initial beta release
