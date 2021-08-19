# rainbowkit

## Setup

1. Install [pnpm](https://pnpm.io/installation/)
2. Run `pnpm i`
3. Go to any pkg and run `pnpm build` to build invidual packages

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
