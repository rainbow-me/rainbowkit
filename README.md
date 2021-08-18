# rainbowkit

## Library structure

```
core (re-exports with custom tweaks)
  util (hooks, HOCs, re-exports of some packages)
    connectors (connector aliases: useInjectedConnector, useWalletLinkConnector etc)
    use-ens
  ui (re-exports of badge and modal)
    badge (components for a Uniswap-like UI for wallet)
    modal (auth modal)
```
