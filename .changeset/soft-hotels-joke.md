---
"@rainbow-me/create-rainbowkit": minor
"generated-test-app": minor
"rainbowkit-next-app": minor
---

**Create rainbowkit updates**

`packages/create-rainbowkit/templates/next-app` and `packages/create-rainbowkit/generated-test-app` have now migrated over to wagmi v2

Updated to following packages:

- `wagmi`: updated from `1.4.x` to `2.0.0-rc.3`
- `viem`: updated from `1.21.x` to `2.x`

Alongside with wagmi v2 migration we've added `@tanstack/react-query` dependency with version `^5`.

Type in these commands to start using wagmi v2 and rainbowkit (beta):

```
npm init @rainbow-me/rainbowkit@beta
# or
pnpm create @rainbow-me/rainbowkit@beta
# or
yarn create @rainbow-me/rainbowkit@beta
```