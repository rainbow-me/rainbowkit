---
"@rainbow-me/rainbowkit": minor
"example": patch
"site": patch
---

`<ConnectButton>` now allows you to switch chains without having your wallet connected. 

You just need to set `chainModalOnConnect` prop to `true` in `<RainbowKitProvider>` if you'd like to use the chain modal without having your wallet connected.

With this update, the `<ConnectButton />` will display the chains even when only one chain is configured. You can disable this behaviour by setting `chainStatus` to `none`.

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
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chainModalOnConnect>{/* Your App */}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```
