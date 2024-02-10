---
"@rainbow-me/rainbow-button": minor
---

**Breaking:**

The [wagmi](https://wagmi.sh) and [viem](https://viem.sh) peer dependencies have reached `2.x.x` with breaking changes.

Follow the steps below to migrate.

**1. Upgrade Rainbow Button, `wagmi`, and `viem` to their latest versions****

```bash
npm i @rainbow-me/rainbow-button@2 wagmi@2 viem@2.x
```

**2. Install `@tanstack/react-query` peer dependency**

With Wagmi v2, [TanStack Query](https://tanstack.com/query/v5/docs/react/overview) is now a required peer dependency.

Install it with the following command:

```bash
npm i @tanstack/react-query
```

**3. Upgrade your Rainbow Button and Wagmi configurations**

`RainbowConnector` is now `rainbowConnector`, and requires `appName` and no longer accepts the `chains` parameter.

```diff
- import { RainbowConnector } from '@rainbow-me/rainbow-button'
+ import { rainbowConnector } from '@rainbow-me/rainbow-button'
  import { createConfig } from 'wagmi'

  const config = createConfig({
-   connectors: [new RainbowConnector({ chains, projectId })],
+   connectors: [
+     rainbowConnector({
+       appName: "RainbowKit demo",
+       projectId: "YOUR_PROJECT_ID",
+     }),
+   ],
  })
```

Follow the [Wagmi v2 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2) for additional configuration changes.

**4. Check for breaking changes in `wagmi` and `viem`**

If you use `wagmi` hooks and `viem` actions in your dApp, you will need to follow the full migration guides for v2:

- [Wagmi v2 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2)
- [Viem v2 Breaking Changes](https://viem.sh/docs/migration-guide.html#_2-x-x-breaking-changes)