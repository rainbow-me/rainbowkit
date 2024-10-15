---
"@rainbow-me/rainbowkit-siwe-next-auth": minor
---

The Authentication API now supports ERC-1271 and ERC-6492 for smart contract signature verification to enable Sign-in with Ethereum for Smart Contract Wallets.

We have also deprecated the `siwe` and `ethers` peer dependencies in favor of `viem/siwe`.

Follow the appropriate steps below to migrate.

1. Remove `siwe` and `ethers`

```bash
npm uninstall siwe ethers
```

2. Upgrade RainbowKit, `rainbowkit-siwe-next-auth`, and `viem`

```bash
npm i @rainbow-me/rainbowkit@^2.2.0 rainbow-me/rainbowkit-siwe-next-auth@^0.5.0 viem@^2.12.0
```

3. Create a Public Client

This allows `viem` to verify smart contract signatures.

```diff
const config = getDefaultConfig({
  /* your config */
});
+ const publicClient = config.getClient().extend(publicActions);
```

4. Adjust your `authorize` implementation in `/api/auth/[...nextauth].ts`

```diff
- import { SiweMessage } from 'siwe';
+ import {
+   type SiweMessage,
+   parseSiweMessage,
+   validateSiweMessage,
+ } from 'viem/siwe';

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      async authorize(credentials: any) {

-       const siwe = new SiweMessage(
-         JSON.parse(credentials?.message || '{}'),
-       );
+       const siweMessage = parseSiweMessage(
+         credentials?.message,
+       ) as SiweMessage;
        
+       if (!validateSiweMessage({
+         address: siweMessage?.address,
+         message: siweMessage,
+       })) {
+         return null;
+       }

        /* ... */

-       await siwe.verify({ signature: credentials?.signature || '' });
+       const valid = await publicClient.verifyMessage({
+         address: siweMessage?.address,
+         message: credentials?.message,
+         signature: credentials?.signature,
+       });

+       if (!valid) {
+         return null;
+       }
      },
      /* ... */
    })
  ]
}
```

Reference the [with-next-siwe-next-auth](https://github.com/rainbow-me/rainbowkit/tree/main/examples/with-next-siwe-next-auth) example for more guidance.