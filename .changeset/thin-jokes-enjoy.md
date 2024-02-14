---
"@rainbow-me/rainbowkit": patch
---

Fixed a bug where `showBalance` prop on the `<ConnectButton />` didn't work right if you used a boolean instead of responsive object values. `createNormalizeValueFn` from `@vanilla-extract/sprinkles` doesn't return `largeScreen` responsive value if a boolean was specified.
