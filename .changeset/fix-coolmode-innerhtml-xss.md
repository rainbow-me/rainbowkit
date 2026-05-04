---
"@rainbow-me/rainbowkit": patch
---

fix: harden useCoolMode against malicious wallet icon URLs

The cool mode particle animation built image elements via `innerHTML`, which
parses its input as HTML. A malicious EIP-6963 wallet could supply a crafted
icon URL containing injected attributes (e.g. `onerror`) that would execute
in the dApp's origin when a user interacts with the wallet button.

Switched to `document.createElement('img')` with property assignment so the
icon value is always treated as a plain URL rather than markup.
