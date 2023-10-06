---
"@rainbow-me/rainbowkit": minor
---

RainbowKit is now localized in 13 languages and counting 🌎

A user's preferred language is automatically detected and the wallet linking experience will be fully localized out of the box, including the `ConnectButton`. Developers can always customize the language selection or allow their users to choose a different language by passing a `locale` prop to `RainbowKitProvider` like so:

```tsx
<RainbowKitProvider locale="zh-CN">
```

RainbowKit's localization support works even better alongside i18n support in Next.js, so that locale selection can be specifed with custom domains or a subpath like `/zh-CN/`. Reference [our guide](https://rainbowkit.com/docs/localization#using-with-nextjs) to learn more.

If you would like to see support for an additional language, please open a [GitHub Discussion](https://github.com/rainbow-me/rainbowkit/discussions/new?category=ideas) and we'll work to support it as soon as possible.
