<a href="https://rainbowkit.com">
  <img alt="rainbowkit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# Rainbow Button

The simplest way to add support for Rainbow Wallet to dApps built on [wagmi](https://wagmi.sh/).

This package is designed to be installed independent of [RainbowKit](https://www.rainbowkit.com).

## Usage

### Install

Install the `@rainbow-me/rainbow-button` package and its peer dependencies, [wagmi](https://wagmi.sh/), [viem](https://viem.sh/), and [@tanstack/react-query](https://tanstack.com/query/v5).

```bash
npm install @rainbow-me/rainbow-button wagmi viem@2.x @tanstack/react-query
```

### Import

Import Rainbow Button and wagmi.

```tsx
import '@rainbow-me/rainbow-button/styles.css';
import {
  rainbowConnector,
  RainbowButtonProvider,
} from '@rainbow-me/rainbow-button';
...
import { createConfig, WagmiConfig } from 'wagmi';
```

### Adopt the connector

The `rainbowConnector` supports connecting with Rainbow just like Wagmi's native `MetaMaskConnector` from `wagmi/connectors/metaMask`.

Create an instance of the `rainbowConnector` and provide it in your wagmi config `connectors` list. Supply your WalletConnect v2 `projectId` and your application name. You can obtain a `projectId` from [WalletConnect Cloud](https://cloud.reown.com/sign-in). This is absolutely free and only takes a few minutes.

```tsx
const config = createConfig({
  connectors: [rainbowConnector({ projectId, appName: 'Your App' })],
  publicClient
});
```

### Wrap providers

Wrap your application with `RainbowButtonProvider`, [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider#wagmiprovider), and [`QueryClientProvider`](https://tanstack.com/query/v4/docs/framework/react/reference/QueryClientProvider).

```tsx
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowButtonProvider>
          {/* Your App */}
        </RainbowButtonProvider>
      </QueryClientProvider>
    </WagmiProvider>
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

### Use the connect modal hook

If you'd like to trigger the Rainbow connect modal from anywhere in your app, the `useRainbowConnectModal` hook provides a `connect` function that launches the same compact modal flow used by the `RainbowButton`.

```tsx
import { useRainbowConnectModal } from '@rainbow-me/rainbow-button';

export const CustomConnect = () => {
  const { connect } = useRainbowConnectModal();
  return <button onClick={connect}>Connect Rainbow</button>;
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

Please follow our [contributing guidelines](/.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [Rainbow](https://rainbow.me).

See [LICENSE](/LICENSE) for more information.
