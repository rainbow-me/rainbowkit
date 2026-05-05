---
"@rainbow-me/rainbowkit": patch
---

Fix a page freeze that could happen when multiple browser wallet extensions were installed and a configured injected wallet was missing.

Wallet-specific injected connectors now only bind to their matching provider instead of falling back to another extension's provider and reacting to its account events.
