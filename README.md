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

To start, import RainbowKit’s base styles, configure your wagmi connectors and desired chains, then wrap your application with `RainbowKitProvider` and [`WagmiProvider`](https://wagmi-xyz.vercel.app/docs/provider).

Note that the default list of wallets in RainbowKit requires instances of wagmi’s [`InjectedConnector`](https://wagmi-xyz.vercel.app/docs/connectors/injected), [`WalletConnectConnector`](https://wagmi-xyz.vercel.app/docs/connectors/walletConnect) and [`WalletLinkConnector`](https://wagmi-xyz.vercel.app/docs/connectors/walletLink).

```tsx
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, Chain } from '@rainbow-me/rainbowkit';
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

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];

  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'My RainbowKit app',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

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
- Coinbase
- MetaMask

### Customizing the wallet list

The list of wallets can be customized via the `wallets` prop on `RainbowKitProvider`.

All built-in wallets are available via the `wallet` object which allows you to rearrange/omit wallets as needed.

```tsx
import { RainbowKitProvider, wallet, Wallet } from '@rainbow-me/rainbowkit';

const wallets: Wallet[] = [wallet.rainbow, wallet.metamask, wallet.coinbase];

const App = () => {
  return (
    <RainbowKitProvider wallets={wallets} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

### Creating a custom wallet

The `Wallet` type is provided to help you define your own custom wallets. The `defaultWallets` array is available if you want to insert your custom wallet into the list.

```tsx
import {
  RainbowKitProvider,
  defaultWallets,
  Wallet,
} from '@rainbow-me/rainbowkit';

const myCustomWallet: Wallet = {
  id: 'myCustomWallet',
  name: 'My Custom Wallet',
  iconUrl: 'https://example.com/icon.png',
  connectorId: 'walletConnect',
};

const wallets: Wallet[] = [...defaultWallets, myCustomWallet];

const App = () => {
  return (
    <RainbowKitProvider wallets={wallets} {...etc}>
      {/* ... */}
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

- `lightTheme`
- `darkTheme`
- `dimTheme`

By default, depending on the user’s color mode, either the `lightTheme` or `darkTheme` will be provided automatically. You can override this by importing the desired theme from RainbowKit and providing it to the `theme` prop on `RainbowKitProvider`.

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

### Customizing built-in themes

The built-in themes also accept overrides if you want to make any adjustments.

```tsx
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';

const customLightTheme = lightTheme({
  overrides: {
    colors: {
      connectButtonBackground: 'blue',
      connectButtonText: 'white',
    },
  },
});

const App = () => {
  return (
    <RainbowKitProvider theme={customLightTheme} {...etc}>
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
    connectButtonInnerBackground: '...',
    connectButtonText: '...',
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

## License

[MIT.](./LICENSE.md)
