---
'@rainbow-me/rainbowkit': patch
---

`ConnectButton.Custom` no longer renders `null` when unmounted.

In order to support custom loading indicators and/or hooks in your render function, `ConnectButton.Custom` no longer renders `null` internally before mount.

**Migration guide**

If you wish to maintain the existing behavior, a new `mounted` boolean is passed to your render function which allows you to render `null` manually when `mounted` is `false`.

```diff
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default () => (
  <ConnectButton.Custom>
    {({
+      mounted,
      ...etc,
      }) => {
+        if (!mounted) {
+          return null;
+        }

        return <button>...</button>;
      }}
  </ConnectButton.Custom>
);
```
