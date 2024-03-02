---
"@rainbow-me/rainbowkit": patch

"site": patch
---

Added `@rainbow-me/rainbowkit/chains` to avoid unecessary warnings and errors from wallets when adding a new chain from wagmi / viem.

Example with `getDefaultConfig`

```tsx
import { bsc, polygon } from '@rainbow-me/rainbowkit/chains';

const config = getDefaultConfig({
  chains: [bsc, polygon],
});
```

Example with `createConfig`

```tsx
import { bsc, polygon } from '@rainbow-me/rainbowkit/chains';

const config = createConfig({
  chains: [bsc, polygon],
});
```
