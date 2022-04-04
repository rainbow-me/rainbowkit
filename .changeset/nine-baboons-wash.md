---
'@rainbow-me/rainbowkit': patch
---

`ConnectButton.Custom` no longer renders `null` when unmounted.

In order to support custom loading indicators and/or hooks in your render function, `ConnectButton.Custom` no longer renders `null` internally before mount. If you wish to maintain the existing behavior, a new `mounted` boolean is passed to your render function which allows you to render `null` manually when `mounted` is `false`.
