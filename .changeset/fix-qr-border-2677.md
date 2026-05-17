---
"@rainbow-me/rainbowkit": patch
---

Pin transitive `qr` to `0.4.2` to avoid the `border=0` crash introduced in [qr@0.6.0](https://github.com/paulmillr/qr/releases/tag/0.6.0). `0.4.2` is the version cuer was originally tested against and declares no `engines.node` constraint, preserving RainbowKit's existing Node support. Temporary workaround until [cuer#11](https://github.com/wevm/cuer/pull/11) is merged and released. Fixes #2677.
