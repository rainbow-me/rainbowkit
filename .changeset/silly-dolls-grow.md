---
"@rainbow-me/rainbowkit": patch
"example": patch
"site": patch
---

Bloom Wallet support

**Example usage**

```ts
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bloomWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  wallets: [
    {
      groupName: "Popular",
      wallets: [bloomWallet],
    },
  ],
  chains: [mainnet],
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{/* Your App */}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```