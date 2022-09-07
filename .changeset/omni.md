---
'@rainbow-me/rainbowkit': patch
---

Rename Steakwallet to Omni and leave `steak` as a deprecated wallet.

```
import { wallet } from '@rainbow-me/rainbowkit';

const omni = wallet.omni({ chains });
```
