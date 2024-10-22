# @rainbow-me/rainbowkit

## 2.2.1

### Patch Changes

- 3469982: Added Wigwam support with `wigwamWallet` wallet connector
- 5b8e146: Added `de-DE` and `de` locale support for the German language.

## 2.2.0

### Minor Changes

- f02bced: The Authentication API now supports ERC-1271 and ERC-6492 for smart contract signature verification to enable Sign-in with Ethereum for Smart Contract Wallets, including Coinbase Smart Wallet and Argent.

  We have also deprecated the `siwe` and `ethers` peer dependencies in favor of `viem/siwe` to make RainbowKit even more seamless.

  No changes are necessary for dApps that don't rely on the Authentication API.

  Follow the appropriate steps below to migrate.

  **NextAuth Authentication**

  1. Remove `siwe` and `ethers`

  ```bash
  npm uninstall siwe ethers
  ```

  2. Upgrade RainbowKit, `rainbowkit-siwe-next-auth`, and `viem`

  ```bash
  npm i @rainbow-me/rainbowkit@^2.2.0 rainbow-me/rainbowkit-siwe-next-auth@^0.5.0 viem@^2.12.0
  ```

  3. Create a Public Client

  This allows `viem` to verify smart contract signatures.

  ```diff
  const config = getDefaultConfig({
    /* your config */
  });
  + const publicClient = config.getClient().extend(publicActions);
  ```

  4. Adjust your `authorize` implementation in `/api/auth/[...nextauth].ts`

  ```diff
  - import { SiweMessage } from 'siwe';
  + import {
  +   type SiweMessage,
  +   parseSiweMessage,
  +   validateSiweMessage,
  + } from 'viem/siwe';

  export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
    const providers = [
      CredentialsProvider({
        async authorize(credentials: any) {

  -       const siwe = new SiweMessage(
  -         JSON.parse(credentials?.message || '{}'),
  -       );
  +       const siweMessage = parseSiweMessage(
  +         credentials?.message,
  +       ) as SiweMessage;

  +       if (!validateSiweMessage({
  +         address: siweMessage?.address,
  +         message: siweMessage,
  +       })) {
  +         return null;
  +       }

          /* ... */

  -       await siwe.verify({ signature: credentials?.signature || '' });
  +       const valid = await publicClient.verifyMessage({
  +         address: siweMessage?.address,
  +         message: credentials?.message,
  +         signature: credentials?.signature,
  +       });

  +       if (!valid) {
  +         return null;
  +       }
        },
        /* ... */
      })
    ]
  }
  ```

  Reference the [with-next-siwe-next-auth](https://github.com/rainbow-me/rainbowkit/tree/main/examples/with-next-siwe-next-auth) example for more guidance.

  **Custom Authentication**

  1. Remove `siwe` and `ethers`

  ```bash
  npm uninstall siwe ethers
  ```

  2. Upgrade RainbowKit and `viem`

  ```bash
  npm i @rainbow-me/rainbowkit@^2.2.0 viem@^2.12.0
  ```

  3. Create a Public Client

  This allows `viem` to verify smart contract signatures.

  ```diff
  const config = getDefaultConfig({
    /* your config */
  });

  + const publicClient = config.getClient().extend(publicActions);
  ```

  4. Adjust your `createAuthenticationAdapter` implementation

  ```diff
  - import { SiweMessage } from 'siwe';
  + import { createSiweMessage } from 'viem/siwe';

  createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch('/api/nonce');
      return await response.text();
    },

    createMessage: ({ nonce, address, chainId }) => {
  -   return new SiweMessage({
  +   return createSiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },

  - getMessageBody: ({ message }) => {
  -   return message.prepareMessage();
  - },

    /* ... */
  })
  ```

  5. Adopt `generateSiweNonce`

  ```diff
  - import { generateNonce } from 'siwe';
  + import { generateSiweNonce } from 'viem/siwe';

  - req.session.nonce = generateNonce();
  + req.session.nonce = generateSiweNonce();
  ```

  6. Adopt `parseSiweMessage` and `verifyMessage` if your Verify handler

  ```diff
  - import { SiweMessage } from 'siwe';
  + import { parseSiweMessage, type SiweMessage } from 'viem/siwe';

  const { message, signature } = req.body;
  - const siweMessage = new SiweMessage(message);
  - const { success, error, data } = await siweMessage.verify({
  -  signature,
  - });
  + const siweMessage = parseSiweMessage(message) as SiweMessage;
  + const success = await publicClient.verifyMessage({
  +   address: siweMessage.address,
  +   message,
  +   signature,
  + });

  - if (!success) throw error;
  + if (!success) throw new Error('Invalid signature.');

  - if (data.nonce !== req.session.nonce)
  + if (siweMessage.nonce !== req.session.nonce)
  +   return res.status(422).json({ message: 'Invalid nonce.' });
  ```

  Reference the [with-next-siwe-iron-session](https://github.com/rainbow-me/rainbowkit/tree/main/examples/with-next-siwe-iron-session) example for more guidance.

## 2.1.7

### Patch Changes

- 4014d80: Added `vi-VN` and `vi` locale support for the Vietnamese language.
- f93cd0e: Added ParaSwap Wallet support with `paraSwapWallet` wallet connector
- 6393498: Added Best Wallet support with `bestWallet` wallet connector

## 2.1.6

### Patch Changes

- 63d8386: Added Valora support with `valoraWallet` wallet connector
- 8d9a4e6: Fixed an issue where some options in the "Get Wallet" flow would appear as a blank page, or lack a back button to return to the Connect flow.
- d46637a: Added `safeWallet` wallet connector to `getDefaultConfig` by default to improve the Safe Wallet app browser connection flow with a Safe button included by default in the wallet list

## 2.1.5

### Patch Changes

- c08f620: Added `zh-HK` and `zh-TW` locales for Traditional Chinese language support. You can also specify `zh-Hans` and `zh-Hant` locales to refer to the writing systems directly.

  Reference [our guide](https://www.rainbowkit.com/docs/localization) to learn more about Localization.

- 675f9dd: Add icon for Gnosis Chain
- f65b5c4: Add icon for Celo chain
- 9c36bfd: Added Kaia Wallet support with `kaiaWallet` wallet connector

## 2.1.4

### Patch Changes

- b530c80: Added mobile support for `zealWallet` wallet connector
- 7f6e36e: Added missing `rdns` property to some wallets. This helps them work with EIP-6963 connectors.
- 2eeb7b9: Improved the Safe Wallet app browser connection flow with a Safe button included by default in the wallet list
- 72fe07d: Added Binance Web3 Wallet support with `binanceWallet` wallet connector
- d02d73f: Resolved an issue where the Phantom wallet did not appear as an EIP-6963 connector.

## 2.1.3

### Patch Changes

- 23e33b9: Added `mantle` and `mantleTestnet` network support
- 7b00be5: Added Seif Wallet support with `seifWallet` wallet connector
- 001a0a9: Resolved an issue in development where browser detection would throw an error if `navigator.userAgent` was unavailable in the browser.

## 2.1.2

### Patch Changes

- 2180ddd: Added Nest Wallet support with `nestWallet` wallet connector
- fea278a: The `coinbaseWallet` wallet connector now has a `preference` argument to control whether Smart Wallet is enabled and available for users. Preference based behavior is documented [here](https://www.smartwallet.dev/sdk/makeWeb3Provider#parameters).

  Smart Wallet will be enabled by default with `all` in early June, without a further upgrade.

  Developers can test Smart Wallet with `sepolia` and `baseSepolia` chains today by setting `smartWalletOnly` like so:

  ```tsx
  import { coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";

  // Enable Coinbase Smart Wallet for testing
  coinbaseWallet.preference = "smartWalletOnly";

  // You must manually specify your wallet list with `wallets` in
  // `getDefaultConfig` or `connectorsForWallets` to assign the preference
  const config = getDefaultConfig({
    /* ... */
    wallets: [
      {
        groupName: "Popular",
        wallets: [coinbaseWallet],
      },
    ],
    /* ... */
  });
  ```

## 2.1.1

### Patch Changes

- 725a376: Added Magic Eden Wallet support with `magicEdenWallet` wallet connector
- 9be5452: Resolved an issue with the Enhanced Provider when using RainbowKit in Vite without a `process.env` polyfill

## 2.1.0

### Minor Changes

- 82153ed: Upgraded compatible `wagmi` and `@coinbase/wallet-sdk` versions to support [Coinbase Smart Wallet](https://www.smartwallet.dev/why).

  Smart Wallet enables users to create a new wallet in seconds with Passkeys, without installing an app or extension. Smart Wallet users can use the same account and address across all onchain apps with RainbowKit.

  Smart Wallet and the underlying smart contract is fully compatible with Wagmi, but dApps need to ensure that their offchain signature validation is [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492) compliant to support smart contract wallets. Follow [this guide](https://www.smartwallet.dev/guides/signature-verification) for more information.

  Coinbase Wallet users on desktop and mobile will now interact with a new connection flow in RainbowKit alongside Smart Wallet.

- 90d6931: Introduced the Enhanced Provider to handle fallback resolutions when a Mainnet provider transport is unavailable.

  ENS names for dApps without a Mainnet provider will now properly resolve. Additional conveniences will be soon be rolling out in RainbowKit.

## 2.0.8

### Patch Changes

- 8841891: Added real-time balance fetching based on the [Recent Transaction](https://www.rainbowkit.com/docs/recent-transactions) API. As a transaction is confirmed on-chain, the user's gas balance will be updated to reflect the transaction.

  ```tsx
  import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

  export default () => {
    const addRecentTransaction = useAddRecentTransaction();

    return (
      <button
        onClick={() => {
          addRecentTransaction({
            hash: "0x...",
            description: "...",
          });
        }}
      >
        Add recent transaction
      </button>
    );
  };
  ```

## 2.0.7

### Patch Changes

- af4ea4e: Added Kraken Wallet support with `krakenWallet` wallet connector
- f0b3b25: Mitigated behavior in Coinbase Wallet where the user would be captured in the in-app browser upon redirect.

## 2.0.6

### Patch Changes

- 7ab6e50: Added Compass Wallet support with `compassWallet` wallet connector
- 515498f: Locked the dependencies for the `coinbaseWallet` wallet connector to Coinbase Wallet SDK v3 to temporarily mitigate breaking changes included an upcoming version of Wagmi.

## 2.0.5

### Patch Changes

- 4dd1e45: Fixed an issue that allowed duplicate wallets to be added to the Connect Modal when using `connectorsForWallets`
- 1a0f209: Added a small check to throw an error if the wallet list is empty overall or empty within any category.
- ec41346: Amended the `getDefaultConfig` return type to prevent indirect type annotation errors and better infer type for parameters from Wagmi's `createConfig`.
- fc4d7e1: Resolved a bug where if `multiInjectedProviderDiscovery` was set to `false` the `roninWallet` would prevent showing `Opening Ronin Wallet...` UI in the connect modal.
- 81ba812: Added support for `zetachain` and `zetachainAthensTestnet` testnet chain
- b11118f: Added Kaikas Wallet support with `kaikasWallet` wallet connector and added `klaytn` chain with `klaytnBaobab` testnet support.

## 2.0.4

### Patch Changes

- 77dcec3: Added Bybit Wallet support with `bybitWallet` wallet connector
- 6c240ba: Added Gate Wallet support with `gateWallet` wallet connector
- 34419b5: Added Bitverse Wallet support with `bitverseWallet` wallet connector
- 5c60239: Added 1inch Wallet support with `oneInchWallet` wallet connector

## 2.0.3

### Patch Changes

- b80e8fa: Improved the synchronous connection flow for the `WalletButton` and `WalletButton.Custom` components
- 985b80b: Resolved an issue where ENS resolution would fail and throw an error for ENS names with disallowed characters.
- b25db9a: Added `blast` and `blastSepolia` network support

## 2.0.2

### Patch Changes

- 524d7a0: `connectModalOpen` state for the `useConnectModal` hook will now also encompass the Web3Modal modal presentation status for users that interact with `walletConnectWallet`
- 2f637e4: Fixed a bug where wagmi would throw `ChainNotConfiguredError` if `mainnet` is not configured as a chain. This is happening when fetching ens name and ens avatar.
- c021746: Resolved an issue where the Connect Modal wallet list would appear empty for EIP-6963 connectors when using the `WalletButton` component
- df572f1: Resolved an issue for Custom Wallets that displayed a "missing translation" error for instructions during connect and installation flows. Now Custom Wallets will display their original strings without attempted translation.

## 2.0.1

### Patch Changes

- 5149dbd: Added Ramper Wallet support with `ramperWallet` wallet connector
- 1e7d3f4: Added Ronin Wallet support with `roninWallet` wallet connector
- c16541a: Added Kresus support with `kresusWallet` wallet connector
- dbca966: Added Bloom Wallet support with `bloomWallet` wallet connector
- f69c0e1: Added support for `ronin` chain
- bb56562: Fixed a bug where the `showBalance` prop on `<ConnectButton />` didn't accept a boolean, and had only accepted responsive modal values.
- 1a08977: Added EIP-6963 support for `coin98Wallet` wallet connector

## 2.0.0

### Major Changes

- aa0269e: **Breaking:**

  The [wagmi](https://wagmi.sh) and [viem](https://viem.sh) peer dependencies have reached `2.x.x` with breaking changes.

  Follow the steps below to migrate.

  **1. Upgrade RainbowKit, `wagmi`, and `viem` to their latest versions**

  ```bash
  npm i @rainbow-me/rainbowkit@2 wagmi@2 viem@2.x
  ```

  **2. Install `@tanstack/react-query` peer dependency**

  With Wagmi v2, [TanStack Query](https://tanstack.com/query/v5/docs/react/overview) is now a required peer dependency.

  Install it with the following command:

  ```bash
  npm i @tanstack/react-query
  ```

  **3. Upgrade your RainbowKit and Wagmi configurations**

  ```diff
    import '@rainbow-me/rainbowkit/styles.css'

  + import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
  - import { createPublicClient, http } from 'viem'
  - import { WagmiConfig } from 'wagmi'
  + import { WagmiProvider, http } from 'wagmi'
  - import { configureChains, createConfig } from 'wagmi'
    import { mainnet } from 'wagmi/chains'
    import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
  - import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
  + import { getDefaultConfig } from '@rainbow-me/rainbowkit'

    /* getDefaultWallets is now optional */
  - const { wallets } = getDefaultWallets({
  -   appName: 'RainbowKit demo',
  -   projectId: 'YOUR_PROJECT_ID',
  -   chains,
  - })

    /* connectorsForWallets is now optional */
  - const connectors = connectorsForWallets([...wallets])

  - const { chains, publicClient } = configureChains(
  -   [mainnet, sepolia],
  -   [publicProvider(), publicProvider()],
  - )

  - const config = createConfig({
  -   autoConnect: true,
  -   publicClient,
  - })

    /* New API that includes Wagmi's createConfig and bundles getDefaultWallets and connectorsForWallets */
  + const config = getDefaultConfig({
  +   appName: 'RainbowKit demo',
  +   projectId: 'YOUR_PROJECT_ID',
  +   chains: [mainnet],
  +   transports: {
  +     [mainnet.id]: http(),
  +   },
  + })

  + const queryClient = new QueryClient()

    const App = () => {
      return (
  -     <WagmiConfig config={config}>
  +     <WagmiProvider config={config}>
  +       <QueryClientProvider client={queryClient}>
  -         <RainbowKitProvider chains={chains}>
  +         <RainbowKitProvider>
              {/* Your App */}
            </RainbowKitProvider>
  +       </QueryClientProvider>
  -     </WagmiConfig>
  +     </WagmiProvider>
      )
    }
  ```

  [You can read an in-depth migration guide here](https://rainbowkit.com/guides/rainbowkit-wagmi-v2).

  **4. Check for breaking changes in `wagmi` and `viem`**

  If you use `wagmi` hooks and `viem` actions in your dApp, you will need to follow the migration guides for v2:

  - [Wagmi v2 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2)
  - [Viem v2 Breaking Changes](https://viem.sh/docs/migration-guide.html#_2-x-x-breaking-changes)

## 1.3.6

### Patch Changes

- 33a8266: Fixed a bug where `account.displayBalance` for the `<ConnectButton.Custom>` component would sometimes be undefined.

## 1.3.5

### Patch Changes

- 2b0c7b3: Added missing i18n translations for `Wrong network` errors

## 1.3.4

### Patch Changes

- c0a644a: Fixed an issue that caused components to re-render on every window resize event. Now components will only re-render once the user has finished resizing their window.
- 41616b9: Fixed a bug where the `connectModalOpen` state incorrectly remained `true` after a successful `siwe` authentication. This fix ensures that `connectModalOpen` shows the correct state.
- cf4955f: Fixed a bug where the back button wasn't showing on compact size modal when selecting `DownloadOptions` wallet step.

  Removed back button for wide size modal entirely when selecting `DownloadOptions` wallet step to prevent incorrect wallet step switching.

- e5f5f03: Removed external `i18n-js` dependency to reduce RainbowKit bundle sizes.
- c0bd68e: Fixed a bug in the account modal transactions section where transactions that were not found or cancelled were incorrectly shown as 'pending' instead of 'failed'.
- a79609b: Fixed a bug that allowed users to hold-press or cursor select wallet icons on iOS, which interrupted the connection experiencce.

## 1.3.3

### Patch Changes

- 7565fb2: Added `uk-UA` and `ua` locale support for the Ukrainian language.

  Reference [our guide](https://www.rainbowkit.com/docs/localization) to learn more about Localization.

- 24b5a88: Improved support for `NodeNext` module resolution to resolve `"@rainbow-me/rainbowkit"' has no exported member 'RainbowKitProvider'` TypeScript warnings

- 5a184e9: Fixed a bug where `eth_getBalance` would be called when `showBalance` was set to `false`. Optimized additional provider calls to fetch wallet balances only when a user interacts with the Account modal.

## 1.3.2

### Patch Changes

- 7ba94f48: Optimized bundle size for localization feature

## 1.3.1

### Patch Changes

- 3feab0e6: Support for Wagmi `1.4.12` to mitigate a supply-chain attack on the `@ledgerhq/connect-kit` package. RainbowKit dApp's were not directly impacted, but dApps that used the `LedgerConnector` connector in earlier versions of Wagmi could have been. This issue has since been resolved [by Ledger](https://x.com/Ledger/status/1735326240658100414?s=20) but the [wagmi team](https://x.com/wevm_dev/status/1735300109879963685?s=20) is encouraging developers to upgrade Wagmi and RainbowKit out of an abundance of caution.
- c9a8e469: Improved Korean localization. Thanks @Hyun2!
- dba51779: Added support for `arbitrumSepolia`, `baseSepolia`, `optimismSepolia`, `zoraSepolia` testnet chains

## 1.3.0

### Minor Changes

- 9ce75a65: The new `WalletButton` component helps dApps with custom wallet list implementations adopt RainbowKit and all of it's maintenance-free benefits.

  ```tsx
  import { WalletButton } from '@rainbow-me/rainbowkit';

  <WalletButton wallet="rainbow" />
  <WalletButton wallet="metamask" />
  <WalletButton wallet="coinbase" />
  ```

  Like the `ConnectButton`, the `WalletButton.Custom` component is available for custom implementations and styling.

  ```tsx
  <WalletButton.Custom wallet="rainbow">
    {({ ready, connect }) => {
      return (
        <button type="button" disabled={!ready} onClick={connect}>
          Connect Rainbow
        </button>
      );
    }}
  </WalletButton.Custom>
  ```

  Most dApps are best served by the [ConnectButton](https://www.rainbowkit.com/docs/connect-button). Reference the docs [here](https://www.rainbowkit.com/docs/wallet-button) for more information about `WalletButton` adoption and usecases.

## 1.2.1

### Patch Changes

- 74ead9df: Tokenary Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { tokenaryWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [tokenaryWallet({ chains })],
    },
  ]);
  ```

- 94dce820: Fixed scroll bar inconsistencies in the Chain selector for large chain lists or when animating upon user interaction
- 39d81e93: Fixed a bug where the avatar loading indicator had used excessive CPU cycles

## 1.2.0

### Minor Changes

- ef64a229: **Improved desktop wallet download support**

  RainbowKit wallet connectors now support desktop download links and desktop
  wallet instructions.

  Dapps that utilize the Custom Wallets API can reference the updated docs [here](https://www.rainbowkit.com/docs/custom-wallets).

  ```ts
  {
    downloadUrls: {
      windows: 'https://my-wallet/windows-app',
      macos: 'https://my-wallet/macos-app',
      linux: 'https://my-wallet/linux-app',
      desktop: 'https://my-wallet/desktop-app',
    }
  }
  ```

  We've also introduced a new 'connect' `InstructionStepName` type in the `instructions` API to provide wallet connection instructions.

  ```ts
  return {
    connector,
    desktop: {
      getUri,
      instructions: {
        learnMoreUrl: 'https://my-wallet/learn-more',
        steps: [
          // ...
          {
            description: 'A prompt will appear for you to approve the connection to My Wallet.'
            step: 'connect',
            title: 'Connect',
          }
        ]
      },
    },
  }
  ```

## 1.1.4

### Patch Changes

- 9f68c300: Fixed an issue with Trust Wallet detection in Trust's in-app mobile browser
- 3f595c12: Added localization support in the `Authentication` flow for SIWE
- e2075b31: Improved Coinbase Wallet detection when multiple wallets are active

## 1.1.3

### Patch Changes

- 02e796c0: SafePal Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { safepalWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [safepalWallet({ projectId, chains })],
    },
  ]);
  ```

- efb8566e: SubWallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { subWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains, projectId });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [subWallet({ chains, projectId })],
    },
  ]);
  ```

- 4b7a44c8: Okto Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { oktoWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [oktoWallet({ projectId, chains })],
    },
  ]);
  ```

- 2c8abbb2: Zeal Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { zealWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [zealWallet({ chains })],
    },
  ]);
  ```

- e41103fb: CLV Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { clvWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [clvWallet({ chains, projectId })],
    },
  ]);
  ```

- b0022aea: Desig Wallet support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { desigWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains, projectId });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [desigWallet({ chains })],
    },
  ]);
  ```

## 1.1.2

### Patch Changes

- 6cbd9a57: Added `zkSync` and `zkSyncTestnet` network support
- 7d978605: Fixed an issue where a user would not get automatically logged out from the Authentication API after switching their wallet in MetaMask or other browser wallets. Users must now sign a new SIWE message after switching wallets.
- b2b69dcd: Added `holesky` testnet support

## 1.1.1

### Patch Changes

- b60e335c: Fixed a dependency resolution issue for `ESModule` projects related to `i18n-js`

## 1.1.0

### Minor Changes

- b37f5d68: RainbowKit is now localized in 13 languages and counting 🌎

  A user's preferred language is automatically detected and the wallet linking experience will be fully localized out of the box, including the `ConnectButton`. Developers can always customize the language selection or allow their users to choose a different language by passing a `locale` prop to `RainbowKitProvider` like so:

  ```tsx
  <RainbowKitProvider locale="zh-CN">
  ```

  RainbowKit's localization support works even better alongside i18n support in Next.js, so that locale selection can be specified with custom domains or a subpath like `/zh-CN/`. Reference [our guide](https://rainbowkit.com/docs/localization#using-with-nextjs) to learn more.

  If you would like to see support for an additional language, please open a [GitHub Discussion](https://github.com/rainbow-me/rainbowkit/discussions/new?category=ideas) and we'll work to support it as soon as possible.

## 1.0.12

### Patch Changes

- 5b8d8219: Resolved an issue where dApps that supported many chains would cause an interface overflow on mobile. The Chains Modal is now scrollable.
- fb9405a4: Resolved an issue that prevented overriding `iconUrl` and `iconBackground` during Chain customization
- 7643e706: Deprecated `bitKeepWallet` connector in favor of `bitgetWallet`. The BitKeep Wallet connector will continue to be available without breaking changes.
- 252f02e8: Resolved an issue with the Authentication modal where a user's wallet would remain connected if the modal was dismissed with the Close button rather than explicitly using the Cancel button. This fix ensures that dApps can reliably require a user to complete Authentication before RainbowKit enters a connected state.

## 1.0.11

### Patch Changes

- 118dfe11: Support for wagmi `1.4.x` and viem `1.10.x` peer dependencies.

## 1.0.10

### Patch Changes

- a129cb04: Resolved an issue that prevented some PNG icons within RainbowKit from rendering.

## 1.0.9

### Patch Changes

- 42a0c3e5: Bifrost Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { bifrostWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [bifrostWallet({ chains })],
    },
  ]);
  ```

- 67933ed5: Uniswap Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { uniswapWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [uniswapWallet({ chains })],
    },
  ]);
  ```

- e7ae2571: Coin98 Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { coin98Wallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [coin98Wallet({ projectId, chains })],
    },
  ]);
  ```

- c434ca7a: Enkrypt Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { enkryptWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [enkryptWallet({ chains })],
    },
  ]);
  ```

- ad1f860e: Frame Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { frameWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [frameWallet({ chains })],
    },
  ]);
  ```

- 60968a5f: OneKey Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { oneKeyWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [oneKeyWallet({ chains })],
    },
  ]);
  ```

- 7b31af24: FoxWallet Support

  **Example Usage**

  ```tsx
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { foxWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [foxWallet({ projectId, chains })],
    },
  ]);
  ```

## 1.0.8

### Patch Changes

- eb319f3: Improved warnings and error handling for dApps with an invalid or missing `projectId`.

  Improved the developer experience for RainbowKit examples and templates with a bundled development `projectId`. It is required that every dApp obtains a unique `projectId` before entering production to avoid throttling and issues for end users.

  Read our WalletConnect v2 [Migration Guide](https://www.rainbowkit.com/guides/walletconnect-v2#:~:text=2.%20Supplying%20a%20projectId) for more information.

## 1.0.7

### Patch Changes

- d303a3b9: Added `base` chain support
- f1e98e84: RainbowKit now adopts standardized colloquial chain names like `Arbitrum` and `Optimism` for mainnet chains to simplify the chain switching experience

## 1.0.6

### Patch Changes

- dc3cd10b: Core Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { coreWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [coreWallet({ projectId, chains })],
    },
  ]);
  ```

- c251d55d: Talisman Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { talismanWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [talismanWallet({ projectId, chains })],
    },
  ]);
  ```

- d5b3bd19: Safeheron Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { safeheronWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [safeheronWallet({ chains })],
    },
  ]);
  ```

- 66e84239: Frontier Wallet Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { frontierWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [frontierWallet({ projectId, chains })],
    },
  ]);
  ```

- 1b4f142e: BitKeep Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { bitKeepWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [bitKeepWallet({ projectId, chains })],
    },
  ]);
  ```

- e089ab98: TokenPocket Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { tokenPocketWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [tokenPocketWallet({ projectId, chains })],
    },
  ]);
  ```

## 1.0.5

### Patch Changes

- 08e3f4c: Decoupled `chains` between `WagmiConfig` and `RainbowKitProvider` so that dApps can now supply a subset of supported chains to `RainbowKitProvider` to limit the chains a user can switch between, while maintaining a shared `WagmiConfig`.
- cb3614e: Added `cronos` and `cronosTestnet` chain support
- 53d96bc: Fixed an issue with MetaMask Mobile's connector that blocked WalletConnect pairings
- bfab830: Updated BNB Smart Chain icon.

## 1.0.4

### Patch Changes

- 6d361b4: Support for wagmi `1.3.x` and viem `1.1.x` peer dependencies.

## 1.0.3

### Patch Changes

- d00c777: Added `zora` and `zoraTestnet` chain support

## 1.0.2

### Patch Changes

- e2b1072: Support for WalletConnect v2 is now standard in RainbowKit.

  Every dApp that relies on WalletConnect now needs to obtain a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

  This must be completed before WalletConnect v1 bridge servers are shutdown on June 28, 2023.

  Upgrade RainbowKit and provide the `projectId` to `getDefaultWallets` and individual RainbowKit wallet connectors like the following:

  ```ts
  const projectId = "YOUR_PROJECT_ID";

  const { wallets } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId,
    chains,
  });

  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [
        argentWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
      ],
    },
  ]);
  ```

  You can read the full migration guide [here](https://www.rainbowkit.com/guides/walletconnect-v2).

  **Advanced options**

  If a dApp requires supporting a legacy wallet that has not yet migrated to WalletConnect v2, the WalletConnect version can be overridden.

  ```ts
  metaMaskWallet(options: {
    chains: Chain[];
    walletConnectVersion: '1',
  });
  ```

  Once the WalletConnect v1 servers are shutdown, a [custom bridge server](https://docs.walletconnect.com/1.0/bridge-server) is required.

  ```ts
  walletConnectWallet(options: {
    chains: Chain[];
    version: '1',
    options: {
      bridge: 'https://bridge.myhostedserver.com',
    },
  });

  customWallet(options: {
    chains: Chain[];
    walletConnectVersion: '1',
    walletConnectOptions: {
      bridge: 'https://bridge.myhostedserver.com',
    },
  });
  ```

  Reference the [docs](https://www.rainbowkit.com/docs/custom-wallet-list#walletconnect) for additional supported options.

- e2b1072: The [wagmi](https://wagmi.sh) peer dependency has been updated to `~1.2.0`. RainbowKit remains compatible with `~1.1.0` and `~1.0.1`.

  The [viem](https://viem.sh) peer dependency has been updated to `^1.0.0`. RainbowKit remains compatible with `~0.3.19` and beyond.

  It is recommended that you upgrade to recent versions of `wagmi` and `viem` to ensure a smooth transition to WalletConnect v2.

  [Reference the viem migration guide here](https://viem.sh/docs/migration-guide.html#_1-x-x-breaking-changes).

## 1.0.1

### Patch Changes

- 9432a2f: The `ConnectButton` component is now tagged with `use client;` to support the Next 13 App Router and server-side rendered dApps. You can reference a full `app/` directory implementation example [here](/examples/with-next-app).
- b2c66ff: Modified acceptable peer dependency versions to ensure proper peer warnings for future versions of wagmi and viem. `wagmi` now requires `~1.0.1` and `viem` now requires `~0.3.19`.
- bcb3d18: Modal Hooks including `useConnectModal`, `useAccountModal`, and `useChainModal` now each return a boolean with the status of the modal.

  ```tsx
  const { connectModalOpen } = useConnectModal();
  const { accountModalOpen } = useAccountModal();
  const { chainModalOpen } = useChainModal();
  ```

## 1.0.0

### Major Changes

- 93b58d0: **Breaking:**

  The [wagmi](https://wagmi.sh) peer dependency has been updated to `1.x.x`.

  Follow the steps below to migrate.

  **1. Upgrade RainbowKit and `wagmi` to their latest version**

  ```bash
  npm i @rainbow-me/rainbowkit@^1 wagmi@^1
  ```

  **2. Install `viem` peer dependency**

  wagmi v1 requires the `viem` peer dependency. Install it with the following command:

  ```bash
  npm i viem
  ```

  Note: wagmi no longer uses the `ethers` package internally. But if you rely on the [Authentication](https://www.rainbowkit.com/docs/authentication) API, `siwe` will still require `ethers` as a peer dependency.

  **3. Check for breaking changes in `wagmi`**

  If you use `wagmi` hooks in your application, you will need to follow `wagmi`'s migration guide to v1.

  It is recommended that you adopt Typescript `^5.0.4` or above for compatibility with `abitype` and future versions of `wagmi` and `viem`.

  [You can see their migration guide here](https://wagmi.sh/react/migration-guide#1xx-breaking-changes).

## 0.12.14

### Patch Changes

- 865175f: Upgraded minimum `ethers` peer dependency to `^5.6.8`.

## 0.12.13

### Patch Changes

- 0f8e87e: **Improved extension store support**

  RainbowKit wallet connectors now support multiple browser extension download URLs, and RainbowKit will automatically direct users to the appropriate extension store.

  Users will also experience an improved download flow for extensions, including support for Arc, Opera, and Safari browsers.

  dApps that utilize the `Custom Wallets` API can reference the updated docs [here](https://www.rainbowkit.com/docs/custom-wallets).

  ```tsx
  {
    downloadUrls: {
      chrome: 'https://chrome.google.com/webstore/detail/my-wallet',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/my-wallet',
      firefox: 'https://addons.mozilla.org/firefox/addon/my-wallet',
      opera: 'https://addons.opera.com/extensions/details/my-wallet',
      browserExtension: 'https://my-wallet/', */ fallback download page */
    }
  }
  ```

- 6eab54d: Detecting MetaMask in `window.ethereum.providers` for wallets that support the `ethereum.providers` standard.

  Overriding Wagmi's `getProvider` logic for MetaMask to ensure that MetaMask is preferred when available, and RainbowKit's MetaMask button continues to act as a fallback for users that rely on wallets that override `window.ethereum`.

## 0.12.12

### Patch Changes

- ab051b9: Support for `options` customization for `walletConnectWallet`

  **Example usage**

  ```tsx
  walletConnectWallet(options: {
    projectId: string;
    chains: Chain[];
    options?: {
      qrcodeModalOptions?: {
        desktopLinks?: string[];
        mobileLinks?: string[];
      };
    }
  });
  ```

  Reference the [docs](https://www.rainbowkit.com/docs/custom-wallet-list#walletconnect) for additional supported options.

## 0.12.11

## 0.12.10

## 0.12.9

### Patch Changes

- 361bb39: Phantom Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { phantomWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [phantomWallet({ chains })],
    },
  ]);
  ```

- 82376f0: Rabby Support

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { rabbyWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [rabbyWallet({ chains })],
    },
  ]);
  ```

- 7c9e580: Trust Wallet Support

  The `trustWallet` wallet connector now includes support for the Trust Wallet browser extension.

  **Example usage**

  ```ts
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [trustWallet({ projectId, chains })],
    },
  ]);
  ```

- 0127559: XDEFI Wallet Support

  **Example usage**

  ```tsx
  import {
    getDefaultWallets,
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import { xdefiWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, projectId, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [xdefiWallet({ chains })],
    },
  ]);
  ```

## 0.12.8

### Patch Changes

- aef9643: **Support for WalletConnect Cloud `projectId`**

  Every dApp that relies on WalletConnect now needs to obtain a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

  RainbowKit will enable WalletConnect v2 for supported wallets when `projectId` is specified. If `projectId` is unspecified, RainbowKit will quietly prefer WalletConnect v1.

  This must be completed before WalletConnect v1 bridge servers are shutdown on June 28, 2023.

  Provide the `projectId` to `getDefaultWallets` and individual RainbowKit wallet connectors like the following:

  ```ts
  const projectId = "YOUR_PROJECT_ID";

  const { wallets } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId,
    chains,
  });

  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
      wallets: [
        argentWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
      ],
    },
  ]);
  ```

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
  } from "@rainbow-me/rainbowkit";
  import { zerionWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
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
  } from "@rainbow-me/rainbowkit";
  import { tahoWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
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
  } from "@rainbow-me/rainbowkit";
  import { okxWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
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
  } from "@rainbow-me/rainbowkit";
  import { dawnWallet } from "@rainbow-me/rainbowkit/wallets";
  const { wallets } = getDefaultWallets({ appName, chains });
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
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
  } from "@rainbow-me/rainbowkit";
  import { bitskiWallet } from "@rainbow-me/rainbowkit/wallets";
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
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
  } from "@rainbow-me/rainbowkit";
  import { mewWallet } from "@rainbow-me/rainbowkit/wallets";
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: "Other",
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
  - `rk-connect-header-label`

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
  import type Wallet from "@rainbow-me/rainbowkit";
  import { InjectedConnector } from "wagmi/connectors/injected";

  const myCustomWallet: Wallet = {
    hidden: ({ wallets }) => {
      return wallets.some(
        (wallet) =>
          wallet.installed &&
          (wallet.connector instanceof InjectedConnector ||
            wallet.id === "coinbase")
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
    typeof window !== "undefined" &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

  const connectors = connectorsForWallets([
    {
      groupName: "Suggested",
      wallets: [
        wallet.rainbow({ chains }),
        wallet.metaMask({ chains }),
        wallet.coinbase({ appName: "My RainbowKit App", chains }),
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
      groupName: "Suggested",
      wallets: [
        wallet.rainbow({ chains }),
        wallet.metaMask({ chains }),
        wallet.coinbase({ appName: "My RainbowKit App", chains }),
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
      groupName: "Suggested",
      wallets: [
        wallet.injected({ chains }),
        wallet.rainbow({ chains }),
        wallet.metaMask({ chains }),
        wallet.coinbase({ appName: "My RainbowKit App", chains }),
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
      const ready = mounted && authenticationStatus !== "loading";
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus || authenticationStatus === "authenticated");

      return (
        <div
          {...(!ready && {
            "aria-hidden": true,
            style: {
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
      alchemyProvider({ apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC" }),
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
  } from "@rainbow-me/rainbowkit";

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
  import { wallet } from "@rainbow-me/rainbowkit";

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
  import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

  const App = () => {
    return (
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
        })}
      >
        {/* Your App */}
      </RainbowKitProvider>
    );
  };
  ```

  When using a built-in accent color preset:

  ```tsx
  import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

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
  import { WagmiProvider } from "wagmi";

  const App = () => {
    return (
      <WagmiProvider autoConnect connectors={connectors} provider={provider}>
        <RainbowKitProvider chains={chains}>
          {/* Your App */}
        </RainbowKitProvider>
      </WagmiProvider>
    );
  };
  ```

  After:

  ```tsx
  import { createClient, WagmiProvider } from "wagmi";

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const App = () => {
    return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {/* Your App */}
        </RainbowKitProvider>
      </WagmiProvider>
    );
  };
  ```

  Note: if you are using `chains` from wagmi, the default network names are now designed to suitable for usage within the UI.

  Before:

  ```tsx
  const chains = [
    { ...chain.mainnet, name: "Ethereum" },
    { ...chain.polygonMainnet, name: "Polygon" },
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
  import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

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
  import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

  export default () => {
    const addRecentTransaction = useAddRecentTransaction();

    return (
      <button
        onClick={() => {
          addRecentTransaction({
            hash: "0x...",
            description: "...",
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
  import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

  export default () => {
    const addRecentTransaction = useAddRecentTransaction();

    return (
      <button
        onClick={() => {
          addRecentTransaction({
            hash: "0x...",
            description: "...",
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
  } from "@rainbow-me/rainbowkit";
  import { createClient, WagmiProvider, chain } from "wagmi";
  import { providers } from "ethers";

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
    appName: "My RainbowKit App",
    jsonRpcUrl: ({ chainId }) => {
      const rpcUrls = (chains.find((x) => x.id === chainId) || chain.mainnet)
        .rpcUrls;
      return typeof rpcUrls.default === "string"
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
          {/* Your App */}
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
  } from "@rainbow-me/rainbowkit";
  import { createClient, WagmiProvider, chain } from "wagmi";
  import { providers } from "ethers";

  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [apiProvider.infura(process.env.INFURA_ID)]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
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
          {/* Your App */}
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
    fontStack: "system",
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
  import { wallet, WalletList } from "@rainbow-me/rainbowkit";

  const wallets: WalletList = [
    {
      groupName: "Suggested",
      wallets: [wallet.rainbow({ chains })],
    },
  ];
  ```

## 0.0.1

### Patch Changes

- ce3f499: Initial beta release
