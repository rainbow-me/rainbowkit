# RainbowKit

**The best way to connect a wallet 🌈**

## ⚠️ Please note

RainbowKit is currently `v0.0.x` and has a peer dependency on [wagmi](https://wagmi-xyz.vercel.app/) which is currently `v0.x`. The APIs are not stable and likely to change in the near future. At this stage we’re looking for early adopters to provide feedback and help us improve the library.

## Features

- 🔥 Out-of-the-box wallet management
- 👟 Easily customizable
- 🕊 Lightweight
- ✅ Accessible
- 🦄 Built on top of [wagmi](https://wagmi-xyz.vercel.app/) and [ethers](https://docs.ethers.io)

## Installation

Install RainbowKit along with [wagmi](https://wagmi-xyz.vercel.app/) and its [ethers](https://docs.ethers.io) peer dependency.

`npm install @rainbow-me/rainbowkit wagmi@0.2 ethers`

## Getting started

To start, import RainbowKit’s base styles, configure your wallets and desired chains, generate the required connectors, then wrap your application with `RainbowKitProvider` and [`WagmiProvider`](https://wagmi-xyz.vercel.app/docs/provider).

```tsx
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  Chain,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, chain } from 'wagmi';
import { providers } from 'ethers';

const infuraId = process.env.INFURA_ID;

const provider = ({ chainId }: { chainId?: number }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimism, name: 'Optimism' },
  { ...chain.arbitrumOne, name: 'Arbitrum' },
];

const wallets = getDefaultWallets({
  chains,
  infuraId,
  appName: 'My RainbowKit App',
  jsonRpcUrl: ({ chainId }) =>
    chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0],
});

const connectors = connectorsForWallets(wallets);

const App = () => {
  return (
    <RainbowKitProvider chains={chains}>
      <WagmiProvider autoConnect connectors={connectors} provider={provider}>
        <YourApp />
      </WagmiProvider>
    </RainbowKitProvider>
  );
};
```

Then, in your app, import RainbowKit’s `ConnectButton` component.

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const YourApp = () => {
  return (
    <>
      <ConnectButton />
    </>
  );
};
```

You’re done! RainbowKit will now handle your user’s wallet selection, display wallet/transaction information and handle network/wallet switching.

### Customizing `ConnectButton`

The `ConnectButton` component exposes several props to customize its appearance by toggling the visibility of different elements.

These props can also be defined in a responsive format, e.g. `showBalance={{ smallScreen: false, largeScreen: true }}`, allowing you to customize its appearance across different screen sizes. Note that the built-in `"largeScreen"` breakpoint is `768px`.

<table>
  <thead>
    <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>accountStatus</code></td>
      <td><code>"avatar" | "address" | "full" | { smallScreen: AccountStatus, largeScreen?: AccountStatus }</code></td>
      <td><code>"full"</code></td>
      <td>Whether the active account’s avatar and/or address is displayed</td>
    </tr>
    <tr>
      <td><code>chainStatus</code></td>
      <td><code>"icon" | "name" | "full" | "none" | { smallScreen: ChainStatus, largeScreen?: ChainStatus }</code></td>
      <td><code>{ smallScreen: "icon", largeScreen: "full" }</code></td>
      <td>Whether the current chain’s icon and/or name is displayed, or hidden entirely</td>
    </tr>
    <tr>
      <td><code>showBalance</code></td>
      <td><code>boolean | { smallScreen: boolean, largeScreen?: boolean }</code></td>
      <td><code>{ smallScreen: false, largeScreen: true }</code></td>
      <td>Whether the balance is visible next to the account name</td>
    </tr>
  </tbody>
</table>

### Choosing a theme

RainbowKit ships with a static CSS file that can be themed via CSS variables, which `RainbowKitProvider` provides as inline styles by default.

#### Built-in themes

There are 3 built-in themes:

- `lightTheme` (default)
- `darkTheme`
- `midnightTheme`

These themes are implemented as functions where the resulting theme object can be passed to the `theme` prop on `RainbowKitProvider`.

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider theme={darkTheme()} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

#### Customizing the built-in themes

The built-in theme functions also accept an options object, allowing you to select from several different visual styles.

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>accentColor</code></td>
      <td><code>"blue" | "green" | "orange" | "pink" | "purple" | "red" | "yellow"</code></td>
      <td><code>"blue"</code></td>
      <td>The background/text color of various interactive elements</td>
    </tr>
    <tr>
      <td><code>borderRadius</code></td>
      <td><code>"none" | "small" | "medium" | "large"</code></td>
      <td><code>"large"</code></td>
      <td>The size of the entire border radius scale</td>
    </tr>
    <tr>
      <td><code>fontStack</code></td>
      <td><code>"rounded" | "system"</code></td>
      <td><code>"rounded"</code></td>
      <td>The font stack used throughout the UI. Note that ‘rounded’ attempts to use <a href="https://developer.apple.com/fonts">SF Pro Rounded,</a> falling back to system fonts when it isn’t available.</td>
    </tr>
  </tbody>
</table>

For example, to customize the dark theme with a `purple` accent color and a `medium` border radius scale:

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: 'purple',
        borderRadius: 'medium',
      })}
      {...etc}
    >
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

#### Dark mode support

If your app uses the standard `prefers-color-mode: dark` media query to swap between light and dark modes, you can optionally provide a dynamic theme object containing `lightMode` and `darkMode` values.

```tsx
import {
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={{
        lightMode: lightTheme(),
        darkMode: darkTheme(),
      }}
      {...etc}
    >
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

### Customizing chains

The `chains` prop on `RainbowKitProvider` defines which chains are available for the user to select.

Your chain config can be defined in a single array using RainbowKit’s `Chain` type, which is a combination of wagmi’s `Chain` type and the chain metadata used by RainbowKit.

```tsx
import { RainbowKitProvider, Chain } from '@rainbow-me/rainbowkit';
import { chain } from 'wagmi';

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
];

const App = () => {
  return (
    <RainbowKitProvider chains={chains} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

Several chain icons are provided by default, but you can customize the icon for each chain using the `iconUrl` property.

```tsx
const chains: Chain[] = [
  {
    ...chain.mainnet,
    name: 'Ethereum',
    iconUrl: 'https://example.com/icons/ethereum.png',
    iconBackground: 'grey',
  },
  {
    ...chain.polygonMainnet,
    name: 'Polygon',
    iconUrl: 'https://example.com/icons/polygon.png',
    iconBackground: '#7b3fe4',
  },
];
```

## Advanced usage

### Creating a custom `ConnectButton`

If you want to create your own custom connection buttons, the low-level `ConnectButton.Custom` component is also provided which accepts a render prop, i.e. a function as a child. This function is passed everything needed to re-implement the built-in buttons.

A minimal re-implementation of the built-in buttons would look something like this:

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const YourApp = () => {
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          if (!mounted) {
            return null;
          }

          return !account ? (
            <button onClick={openConnectModal} type="button">
              Connect Wallet
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 12 }}>
              {chain && (
                <button
                  onClick={openChainModal}
                  style={{ display: 'flex', alignItems: 'center' }}
                  type="button"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        overflow: 'hidden',
                        marginRight: 4,
                      }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          style={{ width: 12, height: 12 }}
                        />
                      )}
                    </div>
                  )}
                  {chain.name ?? chain.id}
                  {chain.unsupported && ' (unsupported)'}
                </button>
              )}
              <button onClick={openAccountModal} type="button">
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ''}
              </button>
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};
```

The following props are passed to your render function.

#### Account properties

<table>
  <thead>
    <tr>
    <th>Property</th>
    <th width="150">Type</th>
    <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account</code></td>
      <td><code>object | undefined</code></td>
      <td>Object containing details about the current account, described below</td>
    </tr>
    <tr>
      <td><code>account.address</code></td>
      <td><code>string</code></td>
      <td>The full account address, e.g. <code>"0x7a3d05c70581bD345fe117c06e45f9669205384f"</code></td>
    </tr>
    <tr>
      <td><code>account.balanceDecimals</code></td>
      <td><code>number | undefined</code></td>
      <td>The account balance in decimals</td>
    </tr>
    <tr>
      <td><code>account.balanceFormatted</code></td>
      <td><code>string | undefined</code></td>
      <td>The account balance formatted as a string, e.g. <code>"1.234567890123456789"</code></td>
    </tr>
    <tr>
      <td><code>account.balanceSymbol</code></td>
      <td><code>string | undefined</code></td>
      <td>The currency symbol for the balance, e.g. <code>"ETH"</code></td>
    </tr>
    <tr>
      <td><code>account.displayBalance</code></td>
      <td><code>string | undefined</code></td>
      <td>The balance formatted to 3 significant digits, plus the symbol, e.g. <code>"1.23 ETH"</code></td>
    </tr>
    <tr>
      <td><code>account.displayName</code></td>
      <td><code>string</code></td>
      <td>The ENS name, or a truncated version of the address, e.g. 
      <code>"rainbowwallet.eth"</code> or <code>"0x7a3d...384f"</code></td>
    </tr>
    <tr>
      <td><code>account.ensAvatar</code></td>
      <td><code>string | undefined</code></td>
      <td>The ENS avatar URI</td>
    </tr>
    <tr>
      <td><code>account.ensName</code></td>
      <td><code>string | undefined</code></td>
      <td>The ENS name, e.g. <code>"rainbowwallet.eth"</code></td>
    </tr>
  </tbody>
</table>

#### Chain properties

<table>
  <thead>
    <tr>
    <th>Property</th>
    <th width="150">Type</th>
    <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>chain</code></td>
      <td><code>object | undefined</code></td>
      <td>Object containing details about the current chain, described below</code></td>
    </tr>
    <tr>
      <td><code>chain.hasIcon</code></td>
      <td><code>boolean</code></td>
      <td>Whether the chain as an icon specified</td>
    </tr>
    <tr>
      <td><code>chain.iconUrl</code></td>
      <td><code>string | undefined</code></td>
      <td>The chain icon URL (which may be also be undefined while downloading Base64 data URLs)</td>
    </tr>
    <tr>
      <td><code>chain.iconBackground</code></td>
      <td><code>string | undefined</code></td>
      <td>The chain icon background which will be visible while images are loading</td>
    </tr>
    <tr>
      <td><code>chain.id</code></td>
      <td><code>number</code></td>
      <td>The chain ID, e.g. <code>1</code></td>
    </tr>
    <tr>
      <td><code>chain.name</code></td>
      <td><code>string | undefined</code></td>
      <td>The chain name, e.g. <code>"Ethereum"</code></td>
    </tr>
    <tr>
      <td><code>chain.unsupported</code></td>
      <td><code>boolean | undefined</code></td>
      <td>Boolean indicating whether the current chain is unsupported</td>
    </tr>
  </tbody>
</table>

#### Modal state properties

<table>
  <thead>
    <tr>
    <th>Property</th>
    <th width="150">Type</th>
    <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>openAccountModal</code></td>
      <td><code>() => void</code></td>
      <td>Function to open the account modal</td>
    </tr>
    <tr>
      <td><code>openChainModal</code></td>
      <td><code>() => void</code></td>
      <td>Function to open the chain modal</td>
    </tr>
    <tr>
      <td><code>openConnectModal</code></td>
      <td><code>() => void</code></td>
      <td>Function to open the connect modal</td>
    </tr>
    <tr>
      <td><code>accountModalOpen</code></td>
      <td><code>boolean</code></td>
      <td>Boolean indicating whether the account modal is open</td>
    </tr>
    <tr>
      <td><code>mounted</code></td>
      <td><code>boolean</code></td>
      <td>Boolean indicating whether the component has mounted</td>
    </tr>
    <tr>
      <td><code>chainModalOpen</code></td>
      <td><code>boolean</code></td>
      <td>Boolean indicating whether the chain modal is open</td>
    </tr>
    <tr>
      <td><code>connectModalOpen</code></td>
      <td><code>boolean</code></td>
      <td>Boolean indicating whether the connect modal is open</td>
    </tr>
  </tbody>
</table>

### Creating custom themes

> ⚠️ Note: This API is unstable and likely to change in the near future. We recommend sticking with the built-in themes for now.

While the built-in themes provide some level of customization, the `Theme` type is provided to help you define your own custom themes with lower-level access to the underlying theme variables.

```tsx
import { RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';

const myCustomTheme: Theme = {
  borders: {
    modalBorderWidth: '...',
  },
  colors: {
    accentColor: '...',
    actionButtonBorder: '...',
    actionButtonBorderMobile: '...',
    actionButtonSecondaryBackground: '...',
    actionButtonText: '...',
    closeButton: '...',
    closeButtonBackground: '...',
    connectButtonBackground: '...',
    connectButtonBackgroundError: '...',
    connectButtonInnerBackground: '...',
    connectButtonText: '...',
    connectButtonTextError: '...',
    connectionIndicator: '...',
    error: '...',
    generalBorder: '...',
    menuItemBackground: '...',
    modalBackdrop: '...',
    modalBackground: '...',
    modalBorder: '...',
    modalText: '...',
    modalTextDim: '...',
    modalTextSecondary: '...',
    profileAction: '...',
    profileActionHover: '...',
    profileForeground: '...',
    selectedOptionBorder: '...',
    standby: '',
  },
  fonts: {
    body: '...',
  },
  radii: {
    actionButton: '...',
    connectButton: '...',
    menuButton: '...',
    modal: '...',
    modalMobile: '...',
  },
  shadows: {
    connectButton: '...',
    dialog: '...',
    profileDetailsAction: '...',
    selectedOption: '...',
    selectedWallet: '...',
  },
};

const App = () => {
  return (
    <RainbowKitProvider theme={myCustomTheme} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

### Creating custom theme selectors

If your app is server/statically rendered and allows users to manually toggle between themes, RainbowKit’s theming system can be hooked up to custom CSS selectors with the following functions that can be used with any CSS-in-JS system:

- `cssStringFromTheme`
- `cssObjectFromTheme`

These functions return CSS that sets all required theme variables. Since both strings and objects are supported, this can be integrated with any CSS-in-JS system.

As a basic example, you can render your own `style` element with custom selectors for each theme. Since we’re taking control of rendering the theme’s CSS, we’re passing `null` to the `theme` prop so that `RainbowKitProvider` doesn’t render any styles for us. Also note the use of the `extends` option on the `cssStringFromTheme` function which omits any theme variables that are the same as the base theme.

```tsx
import {
  RainbowKitProvider,
  cssStringFromTheme,
  lightTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider theme={null} {...etc}>
      <style>
        {`
          :root {
            ${cssStringFromTheme(lightTheme)}
          }

          html[data-dark] {
            ${cssStringFromTheme(darkTheme, {
              extends: lightTheme,
            })}
          }
        `}
      </style>

      {/* ... */}
    </RainbowKitProvider>
  );
};
```

### Customizing the wallet list

> ⚠️ Note: This API is unstable and likely to change in the near future. We recommend avoiding changes to the wallet list for now.

The following wallet options are presented by default via the `getDefaultWallets` function:

- Rainbow
- WalletConnect
- Coinbase Wallet
- MetaMask

An "Injected Wallet" fallback is also provided if `window.ethereum` exists and hasn’t been provided by another wallet.

All built-in wallets are available via the `wallet` object which allows you to rearrange/omit wallets as needed.

```tsx
import { wallet, WalletList } from '@rainbow-me/rainbowkit';

const needsInjectedWalletFallback =
  typeof window !== 'undefined' &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet;

const wallets: WalletList = [
  {
    groupName: 'Suggested',
    wallets: [
      wallet.rainbow({ chains, infuraId }),
      wallet.walletConnect({ chains, infuraId }),
      wallet.coinbase({
        chains,
        appName: 'My RainbowKit App',
        jsonRpcUrl: ({ chainId }) =>
          chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
          chain.mainnet.rpcUrls[0],
      }),
      wallet.metaMask({ chains, infuraId }),
      ...(needsInjectedWalletFallback
        ? [wallet.injected({ chains, infuraId })]
        : []),
    ],
  },
];
```

### Creating custom wallets

> ⚠️ Note: This API is unstable and likely to change in the near future. We will be adding more built-in wallets over time, so let us know if there are any particular wallets you’re interested in.

The `Wallet` type is provided to help you define your own custom wallets. If you’d like to see some working examples, you can [view the source code for the built-in wallets.](/packages/rainbowkit/src/wallets/walletConnectors/)

#### `Wallet` properties

<table>
  <thead>
    <tr>
    <th>Property</th>
    <th width="150">Type</th>
    <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>string</code></td>
      <td>Unique ID per wallet</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td>Human-readable wallet name</td>
    </tr>
    <tr>
      <td><code>shortName</code></td>
      <td><code>string | undefined</code></td>
      <td>Optional short name for mobile use</td>
    </tr>
    <tr>
      <td><code>iconUrl</code></td>
      <td><code>string | (() => Promise&lt;string>)</code></td>
      <td>URL for wallet icon, or a promise that resolves to a Base64 data URL (to support bundling lazy-loadable images in JavaScript when publishing to npm)</td>
    </tr>
    <tr>
      <td><code>installed</code></td>
      <td><code>boolean | undefined</code></td>
      <td>Whether the wallet is known to be installed, or <code>undefined</code> if indeterminate</td>
    </tr>
    <tr>
      <td><code>downloadUrls</code></td>
      <td><code>{ android?: string, ios?: string, browserExtension?: string, qrCode?: string } | undefined</code></td>
      <td>Object containing download URLs</td>
    </tr>
    <tr>
      <td><code>createConnector</code></td>
      <td><code>(connectorArgs: { chainId? number }) => RainbowKitConnector</code></td>
      <td>Function for providing the connector instance and configuration for different connection methods, described below</td>
    </tr>
  </tbody>
</table>

#### `RainbowKitConnector` properties

The following properties are defined on the return value of the `createConnector` function.

<table>
  <thead>
    <tr>
    <th>Property</th>
    <th width="150">Type</th>
    <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>connector</code></td>
      <td><code>Connector</code></td>
      <td>Instance of a <a href="https://wagmi.sh/guides/connectors">wagmi connector</a></td>
    </tr>
    <tr>
      <td><code>mobile</code></td>
      <td><code>{ getUri?: () => string } | undefined</code></td>
      <td>Function for resolving a mobile wallet connection URI</td>
    </tr>
    <tr>
      <td><code>qrCode</code></td>
      <td><code>{ getUri: () => string, instructions?: { learnMoreUrl: string, steps: Array&lt;{ step: 'install' | 'create' | 'scan', title: string, description: string }&gt; }}} | undefined</code></td>
      <td>Object containing a function for resolving the QR code URI, plus optional setup instructions an an icon URL if different from the wallet icon</td>
    </tr>
  </tbody>
</table>

### Customizing the “Learn more” link

By default, the introductory “Learn more” link within the “What is a wallet?” section points to https://learn.rainbow.me/what-is-a-cryptoweb3-wallet-actually, but you can override this via the `learnMoreUrl` prop on `RainbowKitProvider`.

```tsx
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      learnMoreUrl="https://learn.rainbow.me/what-is-a-cryptoweb3-wallet-actually"
      {...etc}
    >
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

## License

[MIT.](./LICENSE.md)
