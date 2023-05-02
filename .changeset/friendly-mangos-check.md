---
'@rainbow-me/rainbowkit': major
---

**Breaking:**

The [wagmi](https://wagmi.sh) peer dependency has been updated to `1.x.x`.

Follow the steps below to migrate.

**1. Upgrade RainbowKit and `wagmi` to their latest version**

```bash
npm i @rainbow-me/rainbowkit@^1 wagmi@^1
```

**2. Install `viem` peer dependency**

wagmi v1 requires the `viem` peer dependency. Install it with the following command:

```bash
npm i viem
```

Note: wagmi no longer uses the `ethers` package internally. 

**3. Check for breaking changes in `wagmi`**

If you use `wagmi` hooks in your application, you will need to follow `wagmi`'s migration guide to v1.

[You can see their migration guide here](https://wagmi.sh/react/migration-guide).
