---
'@rainbow-me/rainbowkit-siwe-next-auth': minor
---

Support for `next-auth` versions `4.21.0` and above.

**Migration guide**

1. Upgrade `next-auth` to `~4.22.0`

2. In your `next-auth` providers `async authorize(credentials)` implementation, alter the parameters passed to `getCsrfToken` like so. Reference our example implementation [here](https://github.com/rainbow-me/rainbowkit/tree/main/examples/with-next-siwe-next-auth).

```ts
- const nonce = await getCsrfToken({ req });
+ const nonce = await getCsrfToken({ req: { headers: req.headers } });
```
