---
"@rainbow-me/create-rainbowkit": patch
---

Updated wagmi to `~1.4.12` and viem to `~1.19.15`.

Wagmi `1.4.12` mitigates a supply-chain attack on the @ledgerhq/connect-kit package. RainbowKit dApp's were not directly impacted, but dApps that used the LedgerConnector connector in earlier versions of Wagmi could have been. This issue has since been resolved by Ledger but the wagmi team is encouraging developers to upgrade Wagmi and RainbowKit out of an abundance of caution.
