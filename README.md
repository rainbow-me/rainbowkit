# rainbowkit

## Setup

1. Install [pnpm](https://pnpm.io/installation/)
2. Run `pnpm i`
3. Go to any pkg and run `pnpm build` to build invidual packages

## Library structure

```
core (re-exports with custom tweaks)
  hooks (hooks for web3)
    use-ens
  ui (UI components + modal)
  modal (modal hook + component)
  utils (small utilities used by other packages)
```
