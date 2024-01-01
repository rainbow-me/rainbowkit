---
"generated-test-app": patch
"rainbowkit-next-app": patch
"with-next-siwe-iron-session": patch
"with-next-rainbow-button": patch
"with-next-siwe-next-auth": patch
"with-next-custom-button": patch
"with-next-wallet-button": patch
"with-create-react-app": patch
"with-next-app-i18n": patch
"with-next-mint-nft": patch
"@rainbow-me/create-rainbowkit": patch
"@rainbow-me/rainbow-button": patch
"with-next-app": patch
"with-remix": patch
"@rainbow-me/rainbowkit": patch
"with-next": patch
"with-vite": patch
"example": patch
"site": patch
---

**Wagmi V2 Integration and EIP6963 Support**

Upgraded to wagmi v2 and introduced support for EIP6963. 

EIP6963 wallets are now automatically placed in the `Installed` section of the RainbowKit connect modal. All projects within the RainbowKit repository examples folder have been updated to work with wagmi v2.

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

**Prevent wallet Duplication with EIP6963 in RainbowKit**

If your wallet supports EIP6963 with `rdns` and RainbowKit has not yet included the `rdns` for your wallet, please submit a PR with the `rdns` for your wallet.

```tsx
import { Wallet } from "../../Wallet";

export const wallet = (): Wallet => ({
  id: "wallet",
  name: "Wallet",
  rdns: "...", // <- add your rdns here
  iconUrl: async () => await import("./wallet.svg"),
  ...etc,
});
```

This step is necessary because if a user manually adds a wallet through the `connectorsForWallets` function, and your wallet is also detected via EIP6963, it will result in duplication.

In such scenarios, we are unable to display the EIP6963 wallet in the `Installed` section ONLY. As a result, the wallet will be displayed in both the group name list where you defined it and the `Installed` section.

The following wallets currently support `rdns` configuration with RainbowKit:

- Rainbow
- MetaMask
- Trust Wallet
- Coinbase Wallet
- Brave Wallet
- Enkrypt Wallet
- Frontier Wallet
- OKX Wallet
- Phantom
- Rabby Wallet
- Talisman
- TokenPocket
- XDEFI Wallet
- Zerion

**Disabling EIP6963 Support in Your dApp**

If you don't want to support EIP6963 in your dApp, simply set `multiInjectedProviderDiscovery: false` in the `createConfig` function from wagmi.

```tsx
const wagmiConfig = createConfig({
  chains,
  connectors,
  multiInjectedProviderDiscovery: false, // <- disable it here
  transports: {
    [mainnet.id]: http(),
  },
});
```

**EIP6963 Not Supported on Mobile**

Please note that EIP6963 is not supported on mobile devices. Instead, we use the wallets provided to `connectorsForWallets` and/or `getDefaultWallets` and generate a WalletConnect URI to redirect you to the wallet app.
