---
"@rainbow-me/rainbowkit": patch
---

Fixed a bug where the `connectModalOpen` state incorrectly remained `true` after a successful `siwe` authentication. This fix ensures that `connectModalOpen` shows the correct state.