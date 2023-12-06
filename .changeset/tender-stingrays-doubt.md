---
"@rainbow-me/rainbowkit": patch
"example": patch
---

**RPC Call Settings for Different Screen Sizes**

These settings allow your app to manage which RPC calls are made depending on whether it's being used on a large screen, like a desktop, or a small screen, like a smartphone.

```tsx
import { RainbowKitProvider, connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig } from 'wagmi';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
  projectId,
});

const connectors = connectorsForWallets([
  ...wallets,
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        responsiveRpcSettings={{
          balance: {
            largeScreen: true,
            smallScreen: false,
          },
          ensName: {
            largeScreen: true,
            smallScreen: false,
          },
          ensAvatar: {
            largeScreen: true,
            smallScreen: false,
          },
          transactions: {
            largeScreen: true,
            smallScreen: false,
          },
        }}
      >
        {/* Your App */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
```