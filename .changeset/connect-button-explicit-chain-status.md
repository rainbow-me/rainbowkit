---
"@rainbow-me/rainbowkit": patch
---

fix: respect explicit `chainStatus` on `ConnectButton` for single-chain dApps

Previously, the chain selector on `ConnectButton` was hidden whenever exactly
one chain was configured, even when the consumer explicitly set the
`chainStatus` prop. This made it impossible to keep the active network
visible on the default button without dropping down to `ConnectButton.Custom`.

The default behavior is unchanged (the selector is still hidden for
single-chain dApps that do not pass `chainStatus`). Passing any value for
`chainStatus` (`"full"`, `"icon"`, `"name"`, or `"none"`) is now treated as
an explicit opt-in: the selector renders for `full`/`icon`/`name`, and stays
hidden for `none`. This resolves
[#1418](https://github.com/rainbow-me/rainbowkit/issues/1418).
