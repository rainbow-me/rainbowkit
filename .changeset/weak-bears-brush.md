---
"@rainbow-me/rainbowkit": patch
"site": patch
---

`injectedWallet` gets added on its own if `window.ethereum` is found on mobile and it's not already on the custom wallet list. This way, you don't have to use WalletConnect if you don't need to and can stick with the built-in provider `window.ethereum` instead.

You can also set `injectedWalletOnMobile` to `false` if you prefer not to use this feature. This can be done in `getDefaultConfig` as the first parameter or in `connectorsForWallets` as the second parameter.

Example with `getDefaultConfig`

```tsx
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { argentWallet } from "@rainbow-me/rainbowkit/wallets";
import { mainnet } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  wallets: [
    {
      groupName: "Other",
      wallets: [argentWallet],
    },
  ],
  chains: [mainnet],
  injectedWalletOnMobile: false, // <- add 'false' here
});
```

Example with `connectorsForWallets`

```tsx
import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { argentWallet } from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Other",
      wallets: [argentWallet],
    },
  ],
  {
    appName: "RainbowKit demo",
    projectId: "YOUR_PROJECT_ID",
    injectedWalletOnMobile: false, // <- add 'false' here
  }
);

const config = createConfig({
  connectors,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});
```
