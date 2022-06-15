# @rainbow-me/rainbowkit

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
