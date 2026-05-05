---
"@rainbow-me/rainbowkit-siwe-next-auth": minor
---

Upgraded to NextAuth v5. This is a breaking change.

Key changes:
- Requires NextAuth v5 beta (`next-auth >=5.0.0-0 <6`); NextAuth v4 apps must migrate before upgrading.
- NextAuth server configuration now uses v5 APIs like `NextAuthConfig`, `Credentials`, and the exported `auth` helper.
- Pages Router server calls must pass `req` and `res` separately to `auth`; passing the full `GetServerSidePropsContext` is no longer valid.
- CSRF nonce validation now reads the v5 `authjs.csrf-token` cookie, including secure-prefixed variants, instead of the v4 `next-auth.csrf-token` cookie.

Migration guide:

1. Upgrade `next-auth` to the latest v5 beta and upgrade `@rainbow-me/rainbowkit-siwe-next-auth`.

```diff
- npm install next-auth@^4 @rainbow-me/rainbowkit-siwe-next-auth
+ npm install next-auth@beta @rainbow-me/rainbowkit-siwe-next-auth
```

2. Update your NextAuth server configuration to the v5 API.

```diff
- import type { NextAuthOptions } from 'next-auth';
- import CredentialsProvider from 'next-auth/providers/credentials';
+ import NextAuth from 'next-auth';
+ import type { NextAuthConfig } from 'next-auth';
+ import Credentials from 'next-auth/providers/credentials';

- export const authOptions: NextAuthOptions = {
+ export const authOptions: NextAuthConfig = {
    providers: [
-     CredentialsProvider({
+     Credentials({
        async authorize(credentials, request) {
          /* your SIWE validation */
        },
      }),
    ],
  };
+
+ export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
```

3. Update Pages Router server-side session lookups to use the exported `auth` helper. Pass `req` and `res` separately; passing the full `GetServerSidePropsContext` is not supported by the v5 overloads.

```diff
- import { getServerSession } from 'next-auth';
- import { authOptions } from '../auth';
+ import { auth } from '../auth';

  export const getServerSideProps: GetServerSideProps = async (context) => {
-   const session = await getServerSession(
-     context.req,
-     context.res,
-     authOptions,
-   );
+   const session = await auth(context.req, context.res);

    return {
      props: {
        session,
      },
    };
  };
```

4. Update any server-side SIWE nonce checks that read the CSRF cookie directly. NextAuth v5 uses the `authjs.csrf-token` cookie name, including `__Host-` and `__Secure-` prefixed variants.

```diff
  const csrfTokenCookie = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) =>
-     /^(?:__Host-|__Secure-)?next-auth\.csrf-token=/.test(cookie),
+     /^(?:__Host-|__Secure-)?authjs\.csrf-token=/.test(cookie),
    );
```

5. Keep using your existing `NEXTAUTH_URL` and `NEXTAUTH_SECRET` values.

6. If upgrading from before `@rainbow-me/rainbowkit-siwe-next-auth@0.5.0`, also follow the `0.5.0` changelog entry for the `viem/siwe` migration and the `0.3.0` changelog entry for the earlier `getCsrfToken` request-shape change.
