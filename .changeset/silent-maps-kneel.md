---
"@rainbow-me/rainbow-button": minor
---

**Breaking:**

The [wagmi v1](https://wagmi.sh) peer dependency is migrated over to [wagmi v2](https://wagmi.sh/) which has been updated to `2.0.0`.

Follow the steps below to migrate.

**1. Upgrade Rainbow Button and `wagmi`**

```bash
npm i @rainbow-me/rainbow-button@beta wagmi
```

**2. Install `viem` peer dependency**

wagmi v2 requires the `viem` peer dependency. Install it with the following command:

```bash
npm i viem
```

**3. Check for breaking changes in `wagmi`**

If you use `wagmi` hooks in your application, you will need to follow `wagmi`'s migration guide to v2.


[You can see their migration guide from v1 to v2 here](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).


**4. Check for breaking changes in `@rainbow-me/rainbow-button`**

If you use `RainbowConnector` connector you would need to update it to `rainbowConnector` without specifyingg the `chains`.

```diff
-import { RainbowConnector } from "@rainbow-me/rainbow-button";
+import { rainbowConnector } from "@rainbow-me/rainbow-button";

const config = createConfig({
- connectors: [new RainbowConnector({ chains, projectId })],
+ connectors: [rainbowConnector({ projectId })],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});
```

Feel free to follow `@rainbow-me/rainbow-button`'s migration guide [here](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).


 
