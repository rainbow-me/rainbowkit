---
"@rainbow-me/rainbowkit": minor
---

The Authentication API now supports ERC-1271 and ERC-6492 for smart contract signature verification to enable Sign-in with Ethereum for Smart Contract Wallets, including Coinbase Smart Wallet and Argent. 

We have also deprecated the `siwe` and `ethers` peer dependencies in favor of `viem/siwe` to make RainbowKit even more seamless.

No changes are necessary for dApps that don't rely on the Authentication API.

Follow the appropriate steps below to migrate.

** NextAuth Authentication **

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

** Custom Authentication **

1. Remove `siwe` and `ethers`

```bash
npm uninstall siwe ethers
```

2. Upgrade RainbowKit and `viem`

```bash
npm i @rainbow-me/rainbowkit@^2.2.0 viem@^2.12.0
```

3. Create a Public Client

This allows `viem` to verify smart contract signatures.

```diff
const config = getDefaultConfig({
  /* your config */
});

+ const publicClient = config.getClient().extend(publicActions);
```

4. Adjust your `createAuthenticationAdapter` implementation

```diff
- import { SiweMessage } from 'siwe';
+ import { createSiweMessage } from 'viem/siwe';

createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch('/api/nonce');
    return await response.text();
  },

  createMessage: ({ nonce, address, chainId }) => {
-   return new SiweMessage({
+   return createSiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    });
  },

- getMessageBody: ({ message }) => {
-   return message.prepareMessage();
- },

  /* ... */
})
```

5. Adopt `generateSiweNonce`

```diff
- import { generateNonce } from 'siwe';
+ import { generateSiweNonce } from 'viem/siwe';

- req.session.nonce = generateNonce();
+ req.session.nonce = generateSiweNonce();
```

6. Adopt `parseSiweMessage` and `verifyMessage` if your Verify handler

```diff
- import { SiweMessage } from 'siwe';
+ import { parseSiweMessage, type SiweMessage } from 'viem/siwe';

const { message, signature } = req.body;
- const siweMessage = new SiweMessage(message);
- const { success, error, data } = await siweMessage.verify({
-  signature,
- });
+ const siweMessage = parseSiweMessage(message) as SiweMessage;
+ const success = await publicClient.verifyMessage({
+   address: siweMessage.address,
+   message,
+   signature,
+ });

- if (!success) throw error;
+ if (!success) throw new Error('Invalid signature.');

- if (data.nonce !== req.session.nonce)
+ if (siweMessage.nonce !== req.session.nonce)
+   return res.status(422).json({ message: 'Invalid nonce.' });
```

Reference the [with-next-siwe-iron-session](https://github.com/rainbow-me/rainbowkit/tree/main/examples/with-next-siwe-iron-session) example for more guidance.