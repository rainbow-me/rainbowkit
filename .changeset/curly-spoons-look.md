---
"@rainbow-me/rainbowkit": patch
---

Refactored `useWindowSize` hook, which previously caused components to re-render on every resize event, to now make components re-render only once the user has finished resizing the window.