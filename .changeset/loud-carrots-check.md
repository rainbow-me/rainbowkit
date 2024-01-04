---
"@rainbow-me/rainbowkit": minor
---

**Breaking:**

The [wagmi](https://wagmi.sh) peer dependency is migrated over to [wagmi v2](https://rc.wagmi.sh/) which has been updated to `2.0.0-rc.3`.

Follow the steps below to migrate.

**1. Upgrade RainbowKit to beta version and `wagmi` to v2 version**

```bash
npm i @rainbow-me/rainbowkit@beta wagmi@rc
```

**2. Install `viem` peer dependency**

wagmi v2 requires the `viem` peer dependency. Install it with the following command:

```bash
npm i viem@2.x
```

**3. Check for breaking changes in `wagmi`**

If you use `wagmi` hooks in your application, you will need to follow `wagmi`'s migration guide to v2.


[You can see their migration guide from v1 to v2 here](https://rc.wagmi.sh/react/guides/migrate-from-v1-to-v2).


**4. Check for breaking changes in `@rainbow-me/rainbowkit`**

If you use `@rainbow-me/rainbowkit` wallets in your application, you will need to follow `@rainbow-me/rainbowkit`'s migration guide to beta.


[You can see the migration guide to beta here](https://rc.wagmi.sh/react/guides/migrate-from-v1-to-v2).