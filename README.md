# RainbowKit

**The best way to connect a wallet 🌈**

- 🔥 Out-of-the-box wallet management
- ✅ Easily customizable
- 🦄 Built on top of [wagmi](https://github.com/tmm/wagmi) and [ethers](https://docs.ethers.io)

## Installation

Install RainbowKit along with [wagmi](https://wagmi.sh) and its [ethers](https://docs.ethers.io) peer dependency.

`npm install @rainbow-me/rainbowkit wagmi ethers`

## Getting started

To start, import RainbowKit’s base styles, configure your wallets and desired chains, generate the required connectors, then wrap your application with `RainbowKitProvider` and [`WagmiProvider`](https://wagmi.sh/docs/provider).

```tsx
import '@rainbow-me/rainbowkit/styles.css';

import {
  apiProvider,
  configureChains,
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { createClient, chain, WagmiProvider } from 'wagmi';
import { providers } from 'ethers';

const { provider, chains } = configureChains(
  [chain.mainnet],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
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

### Configuring chains

RainbowKit has built-in Ethereum API provider support so you don't have to worry about defining RPC URLs & a provider instance to pass to `wagmi`.

#### Alchemy

To configure the chains with Alchemy configuration, provide `apiProvider.alchemy` to `configureChains`.

```tsx
import { apiProvider, configureChains } from '@rainbow-me/rainbowkit';

...

const { provider, chains } = configureChains(
  [chain.mainnet, chain.polygon],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback()
  ]
);
```

#### Infura

To configure the chains with Infura configuration, provide `apiProvider.infura` to `configureChains`.

```tsx
import { apiProvider, configureChains } from '@rainbow-me/rainbowkit';

...

const { provider, chains } = configureChains(
  [chain.mainnet, chain.polygon],
  [
    apiProvider.infura(process.env.INFURA_ID),
    apiProvider.fallback()
  ]
);
```

#### JSON RPC

To configure the chains with your own RPC URLs, provide `apiProvider.jsonRpc` to `configureChains` with the chain's RPC URLs.

```tsx
import { apiProvider } from '@rainbow-me/rainbowkit';

...

const { provider, chains } = configureChains(
  [chain.mainnet, chain.polygon],
  [apiProvider.jsonRpc(chain => ({
    rpcUrl: `https://${chain.id}.example.com`
  }))]
);
```

#### Fallback RPC

To configure the chains with their respective [**fallback (public) RPC URLs**](https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts#L44), provide `apiProvider.fallback` to `configureChains`.

```tsx
import { apiProvider, configureChains } from '@rainbow-me/rainbowkit';

...

const { provider, chains } = configureChains(
  [chain.mainnet, chain.polygon],
  [apiProvider.fallback()]
);
```

> Note: Only having `apiProvider.fallback` in your API providers could lead to rate-limiting. It is recommended to also include `apiProvider.alchemy`, `apiProvider.infura` or `apiProvider.jsonRpc`.

#### Multiple API providers

You can also pass through more than one API provider to `configureChains`. This is useful if not all your chains support a single API provider. For instance, you may want to use Alchemy for Ethereum, and `avax.network` for Avalanche.

```tsx
import { apiProvider, configureChains } from '@rainbow-me/rainbowkit';
import { Chain } from 'wagmi';

...

const avalancheChain: Chain = {
  id: 43_114,
  name: 'Avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    snowtrace: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};

const { provider, chains } = configureChains(
  [chain.mainnet, avalancheChain],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.jsonRpc(chain => ({ rpcUrl: chain.rpcUrls.default }))
  ]
);
```

### Customizing chains

The `chains` prop on `RainbowKitProvider` defines which chains are available for the user to select.

RainbowKit is designed to integrate with [wagmi’s `chain` object](https://wagmi.sh/docs/constants/chains#chain) which currently provides the following chains:

- `chain.mainnet`
- `chain.ropsten`
- `chain.rinkeby`
- `chain.goerli`
- `chain.kovan`
- `chain.optimism`
- `chain.optimismKovan`
- `chain.polygon`
- `chain.polygonMumbai`
- `chain.arbitrum`
- `chain.arbitrumRinkeby`
- `chain.localhost`
- `chain.hardhat`

> For more detail about the `chain` object, or to see examples when creating a custom chain definition, see the [source code for wagmi’s `chain` object](https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts).

Your chain config can be defined in a single array provided to [`configureChains`](/docs/configure-chains).

```tsx
import {
  apiProvider,
  configureChains,
  RainbowKitProvider,
  Chain,
} from '@rainbow-me/rainbowkit';
import { chain } from 'wagmi';

const { chains } = configureChains(
  [chain.mainnet, chain.polygon],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);

const App = () => {
  return (
    <RainbowKitProvider chains={chains} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

Several chain icons are provided by default, but you can customize the icon for each chain using the iconUrl property.

```tsx
const { chains } = configureChains(
  [
    {
      ...chain.mainnet,
      iconUrl: 'https://example.com/icons/ethereum.png',
      iconBackground: 'grey',
    },
    {
      ...chain.polygon,
      iconUrl: 'https://example.com/icons/polygon.png',
      iconBackground: '#7b3fe4',
    },
  ],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);
```

### Customizing the built-in themes

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
      <td><code>string</code></td>
      <td><code>"#0E76FD"</code></td>
      <td>The background/text color of various interactive elements.</td>
    </tr>
    <tr>
      <td><code>accentColorForeground</code></td>
      <td><code>string</code></td>
      <td><code>"white"</code></td>
      <td>The color used for foreground elements rendered on top of the accent color.</td>
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

For example, to customize the dark theme with a purple accent color and a `medium` border radius scale:

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: '#7b3fe4',
        accentColorForeground: 'white',
        borderRadius: 'medium',
      })}
      {...etc}
    >
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

Each theme also provides several accent color presets (`blue`, `green`, `orange`, `pink`, `purple`, `red`) that can be spread into the options object. For example, to use the `pink` accent color preset:

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        ...darkTheme.accentColors.pink,
      })}
    >
      {/* Your App */}
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

### Showing recent transactions

You can opt in to displaying recent transactions within RainbowKit’s account modal. Note that all transactions are kept in local storage and must be manually registered with RainbowKit in order to be displayed.

The default `ConnectButton` implementation will also display a loading indicator around the user’s avatar if there are any pending transactions. Custom `ConnectButton` implementations can recreate this behavior via the `account.hasPendingTransactions` property that is passed to your render function.

To use this feature, first enable the `showRecentTransactions` option on `RainbowKitProvider`.

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

## Advanced usage

### Creating a custom `ConnectButton`

If you want to create your own custom connection buttons, the low-level `ConnectButton.Custom` component is also provided which accepts a render prop, i.e. a function as a child. This function is passed everything needed to re-implement the built-in buttons.

A minimal re-implementation of the built-in buttons would look something like this:

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const YourApp = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
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
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
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
      <code>"rainbowwallet.eth"</code> or <code>"0x7a…384f"</code></td>
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
    <tr>
      <td><code>account.hasPendingTransactions</code></td>
      <td><code>boolean</code></td>
      <td>Boolean indicating whether the account has pending transactions for the current chain</td>
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
  colors: {
    accentColor: '...',
    accentColorForeground: '...',
    actionButtonBorder: '...',
    actionButtonBorderMobile: '...',
    actionButtonSecondaryBackground: '...',
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
    generalBorderDim: '...',
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
    standby: '...',
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
    walletLogo: '...',
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
import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';

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
      wallet.walletConnect({ chains }),
      wallet.coinbase({ appName: 'My RainbowKit App', chains }),
      wallet.metaMask({ chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
    ],
  },
]);
```

### Built-in wallets

The following wallets are provided via the `wallet` object (in alphabetical order).

- [Argent](#argent)
- [Coinbase Wallet](#coinbase-wallet)
- [Injected Wallet](#injected-wallet)
- [Ledger Live](#ledger)
- [MetaMask](#metamask)
- [Rainbow](#rainbow)
- [Trust Wallet](#trust-wallet)
- [WalletConnect](#walletconnect)

#### Argent

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.argent(options: {
  chains: Chain[];
});
```

#### Coinbase Wallet

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.coinbase(options: {
  appName: string;
  chains: Chain[];
});
```

#### Injected Wallet

This is a fallback wallet option designed for scenarios where `window.ethereum` exists but hasn’t been provided by another wallet in the list.

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.injected(options: {
  chains: Chain[];
  shimDisconnect?: boolean;
});
```

This shouldn’t be used if another injected wallet is available. For example, when combined with MetaMask and Coinbase Wallet:

```tsx
import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';

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
      wallet.walletConnect({ chains }),
      wallet.coinbase({
        chains,
        appName: 'My RainbowKit App',
      }),
      wallet.metaMask({ chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
    ],
  },
]);
```

#### Ledger Live

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.ledger(options: {
  chains: Chain[];
  infuraId?: string;
});
```

#### MetaMask

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.metaMask(options: {
  chains: Chain[];
  shimDisconnect?: boolean;
});
```

#### Rainbow

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.rainbow(options: {
  chains: Chain[];
});
```

#### Trust Wallet

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.trust(options: {
  chains: Chain[];
});
```

#### WalletConnect

This is a fallback wallet option designed for other WalletConnect-based wallets that haven’t been provided by another wallet in the list.

```tsx
import { wallet } from '@rainbow-me/rainbowkit';

wallet.walletConnect(options: {
  chains: Chain[];
});
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
      <td><code>iconBackground</code></td>
      <td><code>string</code></td>
      <td>Background color while the wallet icon loads</td>
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
      <td><code>desktop</code></td>
      <td><code>{ getUri?: () => Promise&lt;string> } | undefined</code></td>
      <td>Function for resolving a desktop wallet connection URI</td>
    </tr>
    <tr>
      <td><code>mobile</code></td>
      <td><code>{ getUri?: () => Promise&lt;string> } | undefined</code></td>
      <td>Function for resolving a mobile wallet connection URI</td>
    </tr>
    <tr>
      <td><code>qrCode</code></td>
      <td><code>{ getUri: () => Promise&lt;string>, instructions?: { learnMoreUrl: string, steps: Array&lt;{ step: 'install' | 'create' | 'scan', title: string, description: string }&gt; }}} | undefined</code></td>
      <td>Object containing a function for resolving the QR code URI, plus optional setup instructions an an icon URL if different from the wallet icon</td>
    </tr>
  </tbody>
</table>

### Customizing your app’s info

You can pass your app’s info in the `appInfo` prop for `RainbowKitProvider`. Properties you can modify are your app's name (`appName`) and the link where the “Learn More” button in the connection modal redirects to (`learnMoreUrl`):

```tsx
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      appInfo={{
        appName: 'Rainbowkit Demo',
        learnMoreUrl: 'https://learnaboutcryptowallets.example',
      }}
      {...etc}
    >
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

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
      <td><code>learnMoreUrl?</code></td>
      <td><code>string | undefined</code></td>
      <td>Introductory “Learn more” link within the “What is a wallet?” button on the connection modal. Defaults to `https://learn.rainbow.me/what-is-a-cryptoweb3-wallet-actually`.</td>
    </tr>
    <tr>
      <td><code>appName?</code></td>
      <td><code>string | undefined</code></td>
      <td>Name of your app. Will be displayed in certain places in the RainbowKit UI to refer to your site. Defaults to `undefined`, if left this way we will refer to your site as `"Your App"`.</td>
    </tr>
  </tbody>
</table>

### Enable cool mode

```tsx
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider coolMode={true} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

## License

[MIT.](./LICENSE.md)
