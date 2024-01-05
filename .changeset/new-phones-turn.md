---
"with-next-siwe-iron-session": minor
"with-next-rainbow-button": minor
"with-next-siwe-next-auth": minor
"with-next-custom-button": minor
"with-next-wallet-button": minor
"with-create-react-app": minor
"with-next-app-i18n": minor
"with-next-mint-nft": minor
"with-next-app": minor
"with-remix": minor
"with-next": minor
"with-vite": minor
"example": minor
---

## Migrated from wagmi v1 to wagmi v2 ###

**1. Wagmi v2 migration**

- `wagmi`: updated from `1.4.x` to `^2.0.0`
- `viem`: updated from `1.21.x` to `^2.0.0`

Alongside with wagmi v2 migration we've added `@tanstack/react-query` dependency with version `^5`.


**2. Example projects updates**

We've now updated all of our example projects to use wagmi v2 alongside with the new rainbowkit updates.

**Before:**

```tsx
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{/* Your App */}</RainbowKitProvider>
    </WagmiConfig>
  );
};
```

**After:**

```tsx
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet, Chain } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const chains: readonly [Chain, ...Chain[]] = [mainnet];

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
});

const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          {/* Your App */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```