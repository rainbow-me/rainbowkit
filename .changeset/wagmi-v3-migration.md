---
"@rainbow-me/rainbowkit": major
"@rainbow-me/rainbow-button": minor
"@rainbow-me/rainbowkit-siwe-next-auth": minor
"@rainbow-me/create-rainbowkit": patch
"site": patch
---

**Breaking:**

The [wagmi](https://wagmi.sh) peer dependency has reached `3.x.x` with breaking changes.

Follow the steps below to migrate.

**1. Upgrade RainbowKit, `wagmi`, `viem`, and `@tanstack/react-query` to their latest versions**

```bash
npm i @rainbow-me/rainbowkit@3 wagmi@3 viem@2 @tanstack/react-query@latest
```

`@tanstack/react-query` must be `5.59.0` or newer.

**2. Check for breaking changes in `wagmi`**

If you use `wagmi` hooks, actions, or connectors directly in your dApp, you will need to follow the migration guide for v3:

- [Wagmi v3 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v2-to-v3)

[You can read an in-depth RainbowKit migration guide here](https://rainbowkit.com/guides/rainbowkit-wagmi-v3).

**3. Connector dependencies**

Wagmi v3 makes connector dependencies optional peer dependencies. RainbowKit declares the connector packages used by supported wallet connectors as optional peer dependencies and keeps them as development dependencies for its own build and test coverage.

RainbowKit does not bundle these connector packages. If your package manager requires optional peers to be installed explicitly, install the package for each connector your app uses.

Supported connector packages include `@base-org/account`, `@coinbase/wallet-sdk`, `@gemini-wallet/core`, `@metamask/connect-evm`, `@safe-global/safe-apps-provider`, `@safe-global/safe-apps-sdk`, `@walletconnect/ethereum-provider`, `accounts`, and `porto`.

**4. Wagmi hook changes**

Wagmi v3 renames account hooks to connection hooks, exposes mutation functions as `mutate` and `mutateAsync`, and moves connector lists to dedicated hooks like `useConnectors` and `useConnections`.

**5. Rainbow Button and SIWE NextAuth**

Rainbow Button now requires Wagmi v3 and Viem `2.48.8` or newer.

`@rainbow-me/rainbowkit-siwe-next-auth` now requires RainbowKit v3.
