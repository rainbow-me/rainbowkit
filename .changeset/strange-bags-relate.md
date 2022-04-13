---
'@rainbow-me/rainbowkit': patch
---

Add support for pending transaction indicators to `ConnectButton.Custom`

After registering transactions using the new `useAddRecentTransaction` hook, you can now choose to display a pending transaction indicator via the new `account.hasPendingTransactions` property which is passed to your render function.
