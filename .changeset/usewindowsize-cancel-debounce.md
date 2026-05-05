---
"@rainbow-me/rainbowkit": patch
---

Fixed `useWindowSize` triggering a state update after unmount, which could surface as a React warning.
