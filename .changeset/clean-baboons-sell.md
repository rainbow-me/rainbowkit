---
"@rainbow-me/rainbowkit": patch
---

Support for Wagmi `1.4.12` to mitigate a supply-chain attack on the `@ledgerhq/connect-kit` package. RainbowKit dApp's were not directly impacted, but dApps that used the `LedgerConnector` connector in earlier versions of Wagmi could have been. This issue has since been resolved [by Ledger](https://x.com/Ledger/status/1735326240658100414?s=20) but the [wagmi team](https://x.com/wevm_dev/status/1735300109879963685?s=20) is encouraging developers to upgrade Wagmi and RainbowKit out of an abundance of caution.
