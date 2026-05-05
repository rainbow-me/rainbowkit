---
"@rainbow-me/rainbow-button": patch
---

Removed deep imports from `@rainbow-me/rainbowkit/dist/...` so the package resolves under TypeScript `moduleResolution: "bundler"` (the Next.js 16.2 default).
