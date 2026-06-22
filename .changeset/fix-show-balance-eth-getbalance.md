---
'@rainbow-me/rainbowkit': patch
---

**Fix:** `useProfile` now sets an explicit `query.enabled` on the underlying `useBalance` call so that `eth_getBalance` is never requested when `showBalance` is disabled (or the account modal is closed). Previously the hook relied on passing `address: undefined` to disable the query implicitly, which could still result in a fetch in some scenarios.
