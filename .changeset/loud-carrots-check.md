---
"@rainbow-me/rainbowkit": minor
---

**Breaking:**

The [wagmi](https://wagmi.sh) peer dependency is migrated over to [wagmi v2](https://wagmi.sh/) which has been updated to `2.0.0`.

Follow the steps below to migrate.

**1. Upgrade RainbowKit and `wagmi`**

```bash
npm i @rainbow-me/rainbowkit@beta wagmi
```

**2. Install `viem` peer dependency**

wagmi v2 requires the `viem` peer dependency. Install it with the following command:

```bash
npm i viem
```

**3. Check for breaking changes in `wagmi`**

If you use `wagmi` hooks in your application, you will need to follow `wagmi`'s migration guide to v2.


[You can see their migration guide from v1 to v2 here](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).


**4. Check for breaking changes in `@rainbow-me/rainbowkit`**

If you use `@rainbow-me/rainbowkit` wallets in your application, you will need to follow `@rainbow-me/rainbowkit`'s migration guide.


[You can see the migration guide here](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).
