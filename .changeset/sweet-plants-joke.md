---
"@rainbow-me/rainbowkit": patch
"example": patch
---

`<ConnectButton>` now allows you to switch chains without having your wallet connected. 

You also have the option to specify a `ignoreChainModalOnConnect` prop to the `<RainbowKitProvider>` if you want to wait until the user has connected their wallet.

**Example usage**

```ts
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet],
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient} ignoreChainModalOnConnect={true}>
        <RainbowKitProvider>{/* Your App */}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```
