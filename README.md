# RainbowKit

**The best way to connect a wallet 🌈**

## Features

- 🔥 Out-of-the-box wallet management
- 👟 Easily customizable
- 🕊 Lightweight
- ✅ Accessible
- 🦄 Built on top of [wagmi](https://wagmi-xyz.vercel.app/) and [ethers](https://docs.ethers.io)

## Installation

Install RainbowKit along with [wagmi](https://wagmi-xyz.vercel.app/) and its [ethers](https://docs.ethers.io) peer dependency.

`npm install @rainbow-me/rainbowkit wagmi ethers`

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

const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimisticEthereum, name: 'Optimism' },
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

## Wallets

The following wallet options are presented by default:

- Rainbow
- WalletConnect
- Coinbase
- MetaMask

### Customizing the wallet list

All built-in wallets are available via the `wallet` object which allows you to rearrange/omit wallets as needed.

```tsx
import {
  RainbowKitProvider,
  Chain,
  wallet,
  Wallet,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';

const infuraId = process.env.INFURA_ID;

const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimisticEthereum, name: 'Optimism' },
  { ...chain.arbitrumOne, name: 'Arbitrum' },
];

const wallets: Wallet[] = [
    wallet.rainbow({ chains, infuraId }),
    wallet.walletConnect({ chains, infuraId }),
    wallet.coinbase({
      appName: 'My RainbowKit App',
      jsonRpcUrl: ({ chainId }) =>
        chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
        chain.mainnet.rpcUrls[0],
    }),
    wallet.metamask(),
  ]
);

const connectors = connectorsForWallets(wallets);

const App = () => {
  return (
    <RainbowKitProvider chains={chains}>
      <WagmiProvider
        autoConnect
        connectors={connectors}
        provider={provider}
      >
        <YourApp />
      </WagmiProvider>
    </RainbowKitProvider>
  );
};
```

### Creating a custom wallet

The `Wallet` type is provided to help you define your own custom wallets.

```tsx
import {
  RainbowKitProvider,
  Chain,
  Wallet,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimisticEthereum, name: 'Optimism' },
  { ...chain.arbitrumOne, name: 'Arbitrum' },
];

const myCustomWallet: Wallet = () => ({
  id: 'myCustomWallet',
  name: 'My Custom Wallet',
  iconUrl: 'https://example.com/icon.png',
  connector: new WalletConnectConnector({
    chains,
    options: {
      infuraId,
      qrcode: true,
    },
  }),
});

const defaultWallets = getDefaultWallets({
  chains,
  infuraId,
  appName: 'My RainbowKit App',
  jsonRpcUrl: ({ chainId }) =>
    chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0],
});

const wallets: Wallet[] = [...defaultWallets, myCustomWallet];

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

## Chains

The `chains` prop on `RainbowKitProvider` defines which chains are available for the user to select.

Your chain config can be defined in a single array using RainbowKit's `Chain` type, which is a combination of wagmi’s `Chain` type and the chain metadata used by RainbowKit.

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
  },
  {
    ...chain.polygonMainnet,
    name: 'Polygon',
    iconUrl: 'https://example.com/icons/polygon.png',
  },
];
```

## Themes

RainbowKit ships with a static CSS file that can be themed via CSS variables, which `RainbowKitProvider` provides as inline styles by default.

There are 3 built-in themes:

- `lightTheme` (default)
- `darkTheme`
- `dimTheme`

These themes can be imported from RainbowKit and provided to the `theme` prop on `RainbowKitProvider`.

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider theme={darkTheme} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

### Dark mode support

If your app uses the standard `prefers-color-mode: dark` media query to swap between light and dark modes, you can optionally provide a dynamic theme object containing `lightMode` and `darkMode` values.

```tsx
import {
  RainbowKitProvider,
  lightTheme,
  dimTheme,
} from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={{ lightMode: lightTheme, darkMode: dimTheme }}
      {...etc}
    >
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

### Custom theme selectors

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
            ${cssStringFromTheme(darkTheme, { extends: lightTheme })}
          }
        `}
      </style>

      {/* ... */}
    </RainbowKitProvider>
  );
};
```

### Custom themes

The `Theme` type is provided to help you define your own custom themes from scratch.

```tsx
import { RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';

const myCustomTheme: Theme = {
  colors: {
    connectButtonBackground: '...',
    connectButtonBackgroundError: '...',
    connectButtonInnerBackground: '...',
    connectButtonText: '...',
    connectButtonTextError: '...',
    connectedProfileBorder: '...',
    connectionIndicator: '...',
    error: '...',
    menuBackground: '...',
    menuDivider: '...',
    menuItemActiveBackground: '...',
    menuItemBackground: '...',
    menuText: '...',
    menuTextAction: '...',
    menuTextDisconnect: '...',
    menuTextSecondary: '...',
    modalBackdrop: '...',
    modalBackground: '...',
    modalClose: '...',
    modalText: '...',
    modalTextSecondary: '...',
  },
  fonts: {
    body: '...',
  },
  radii: {
    connectButton: '...',
    menuButton: '...',
    modal: '...',
  },
  shadows: {
    connectButton: '...',
    menu: '...',
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

## `ConnectButton`

The `ConnectButton` component exposes the following props to customize its appearance.

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
      <td><code>showAvatar</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
      <td>Whether the avatar is visible next to the account name</td>
    </tr>
    <tr>
      <td><code>showBalance</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
      <td>Whether the balance is visible next to the account name</td>
    </tr>
    <tr>
      <td><code>showChains</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
      <td>Whether the chain button is visible next to the account button</td>
    </tr>
  </tbody>
</table>

### Creating custom buttons

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
        }) =>
          !account ? (
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
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      style={{ width: 12, height: 12, marginRight: 4 }}
                    />
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
          )
        }
      </ConnectButton.Custom>
    </>
  );
};
```

The following props are passed to your render function.

### Account properties

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

### Chain properties

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
      <td><code>chain.iconUrl</code></td>
      <td><code>string | undefined</code></td>
      <td>The chain icon URL</td>
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

### Modal state properties

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

## License

[MIT.](./LICENSE.md)
