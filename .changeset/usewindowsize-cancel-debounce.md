---
"@rainbow-me/rainbowkit": patch
---

Fixed `useWindowSize` leaking a pending `setTimeout` after unmount, which could fire `setState` on an unmounted component (or throw `window is not defined` if the realm was already torn down).
