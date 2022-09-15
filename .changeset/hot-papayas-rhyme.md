---
'@rainbow-me/rainbowkit': patch
---

Move the "Injected Wallet" fallback option to the start of the default wallet list when present

This option is only presented when an injected wallet is available that isn't handled by another wallet in the list, which means that it's the option most likely to be selected by the end user. As a result, we now give it the highest priority in the list returned from `getDefaultWallets`.
