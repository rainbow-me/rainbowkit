---
"@rainbow-me/rainbowkit-siwe-next-auth": minor
---

Upgraded to NextAuth v5. This is a breaking change.

Key changes:
- Updated peer dependency from `>=4.21.0 <5` to `>=5.0.0-0 <6`
- Updated imports to use new NextAuth patterns (`NextAuthConfig` instead of `NextAuthOptions`)
- Updated credentials provider to use `Credentials` from `next-auth/providers/credentials`
- Cookie prefix changed from `next-auth` to `authjs`
- Environment variables continue to use the `NEXTAUTH_*` names
