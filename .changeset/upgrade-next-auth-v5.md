---
"@rainbow-me/rainbowkit-siwe-next-auth": minor
---

Upgraded to NextAuth (Auth.js) v5. This is a breaking change.

Key changes:
- Updated peer dependency from `>=4.21.0 <5` to `>=5.0.0-0 <6`
- Updated imports to use new NextAuth (Auth.js) patterns (`NextAuthConfig` instead of `NextAuthOptions`)
- Updated credentials provider to use `Credentials` from `next-auth/providers/credentials`
- Cookie prefix changed from `next-auth` to `authjs`
- Environment variables support both `NEXTAUTH_*` and `AUTH_*` prefixes
