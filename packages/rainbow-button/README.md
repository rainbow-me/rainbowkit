<a href="https://rainbowkit.com">
  <img alt="rainbowkit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# Rainbow Button

The simplest way to add support for Rainbow Wallet to dApps built on [wagmi](https://wagmi.sh/).

This package is designed to be installed independent of [RainbowKit](https://www.rainbowkit.com).

## Usage

### Install

Install the `@rainbow-me/rainbow-button` package and its peer dependencies, [wagmi](https://wagmi.sh/) and [viem](https://viem.sh/).

```bash
npm install @rainbow-me/rainbow-button wagmi viem
```

### Import

Import Rainbow Button and wagmi.

```tsx
import '@rainbow-me/rainbow-button/styles.css';
import {
  RainbowConnector,
  RainbowButtonProvider,
} from '@rainbow-me/rainbow-button';
...
import { createConfig, WagmiConfig } from 'wagmi';
```

### Adopt the connector

The `RainbowConnector` supports connecting with Rainbow just like wagmi's native `MetaMaskConnector` from `wagmi/connectors/metaMask`.

Create an instance of the `RainbowConnector` and provide it in your wagmi config `connectors` list. Supply your `chains` list and your WalletConnect v2 `projectId`. You can obtain a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in). This is absolutely free and only takes a few minutes.

```tsx
const config = createConfig({
  connectors: [new RainbowConnector({ chains, projectId })],
  publicClient
});
```

### Wrap providers

Wrap your application with `RainbowButtonProvider` and `WagmiConfig`.

```tsx
const App = () => {
  return (
    <WagmiConfig config={config}>
      <RainbowButtonProvider>
        {/* Your App */}
      </RainbowButtonProvider>
    </WagmiConfig>
  );
};
```

### Add the Rainbow button

Then, in your app, import and render the `RainbowButton` component.

```tsx
import { RainbowButton } from '@rainbow-me/rainbow-button';

export const YourApp = () => {
  return <RainbowButton/>;
};
```

## Documentation

You can reference the [Adoption Guide](https://www.rainbowkit.com/guides/rainbow-button) for more information.

### Custom Rainbow button

The `RainbowButton.Custom` component is available for custom button implementations and styling.

```tsx
<RainbowButton.Custom>
  {({ ready, connect }) => {
    return (
      <button
        type="button"
        disabled={!ready}
        onClick={connect}
      >
        Connect Rainbow
      </button>
    );
  }}
</RainbowButton.Custom>
```

## Try it out

You can use the CodeSandbox links below try out the Rainbow Button:
- [with Next.js](https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-next-rainbow-button)

## Contributing

Please follow our [contributing guidelines](../../.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](../../LICENSE) for more information.
