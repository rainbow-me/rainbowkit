---
'@rainbow-me/rainbowkit': patch
---

Reserve height of `ConnectButton` during server/static render

In order to reduce layout shift during page load, the `ConnectButton` component now renders its content in an invisible and inert state before mount.
