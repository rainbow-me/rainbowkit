---
'@rainbow-me/rainbowkit': patch
---

Resolved an issue with the Authentication modal where a user's wallet would remain connected if the modal was dismissed with the Close button rather than explicitly using the Cancel button. This fix ensures that dApps can reliably require a user to complete Authentication before RainbowKit enters a connected state.
