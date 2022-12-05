---
'@rainbow-me/rainbowkit': patch
---

The wagmi peer dependency has been updated to `0.9.x`.

Follow the steps below to migrate.

#### 1. Upgrade RainbowKit and `wagmi` to their latest version:

```bash
npm i @rainbow-me/rainbowkit@^0.9.0 wagmi@^0.9.0
```

#### 2. Check for breaking changes in `wagmi`

If you use `wagmi` hooks in your application, you will need to check if your application has been affected by the breaking changes in `wagmi`.

[You can see their migration guide here](https://wagmi.sh/react/migration-guide#09x-breaking-changes).
