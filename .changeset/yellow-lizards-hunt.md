---
'@rainbow-me/rainbowkit': patch
---

Modal Hooks including `useConnectModal`, `useAccountModal`, and `useChainModal` now each return a boolean with the status of the modal.

```tsx
const { connectModalOpen } = useConnectModal();
const { accountModalOpen } = useAccountModal();
const { chainModalOpen } = useChainModal();
```
