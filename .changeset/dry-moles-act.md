---
'@rainbow-me/rainbowkit': minor
---

The wagmi peer dependency has been updated to `0.11.x`.

The minimum TypeScript version is now `4.9.4`

Follow the steps below to migrate.

```bash
npm i @rainbow-me/rainbowkit@^0.11.0 wagmi@^0.11.0
```

If you use `wagmi` hooks in your application, you will need to check if your application has been affected by the breaking changes in `wagmi`.

[You can see their migration guide here](https://wagmi.sh/react/migration-guide#011x-breaking-changes).
