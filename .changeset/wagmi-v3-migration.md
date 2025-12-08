---
"@rainbow-me/rainbowkit": major
---

**Breaking Change: Wagmi v3**

RainbowKit now requires Wagmi v3 as a peer dependency. This release includes breaking changes that align with Wagmi's v3 migration.

**Key Changes:**

1. **Wagmi v3 Peer Dependency**: RainbowKit now requires `wagmi@3` and continues to support `viem@2`.

2. **Connector Dependencies**: Wallet connector dependencies are now bundled with RainbowKit for better tree-shaking support. You no longer need to install these separately.

**Migration Steps:**

1. Upgrade your dependencies:
   ```bash
   npm i @rainbow-me/rainbowkit@latest wagmi@3 viem@2 @tanstack/react-query@latest
   ```

2. Review the [Wagmi v3 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v2-to-v3) for additional breaking changes in Wagmi.

See the full migration guide at https://rainbowkit.com/guides/rainbowkit-wagmi-v3
