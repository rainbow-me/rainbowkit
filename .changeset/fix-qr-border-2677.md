---
"@rainbow-me/rainbowkit": patch
---

Pin transitive `qr` to `0.5.5` to avoid the `border=0` crash introduced in [qr@0.6.0](https://github.com/paulmillr/qr/releases/tag/0.6.0). Temporary workaround until [cuer#11](https://github.com/wevm/cuer/pull/11) is merged and released. Fixes #2677.
