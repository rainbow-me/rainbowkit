---
"@rainbow-me/rainbowkit": patch
---

Updated `getDefaultConfig` to not include `WagmiProviderProps['config']` return type. This helps to prevent indirect type annotation errors and included generic type for parameters to infer the types to wagmi's `createConfig`.
