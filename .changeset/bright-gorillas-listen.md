---
"with-next-app-i18n": minor
---

Upgraded `next-intl` to `3.26.3` and resolved [breaking changes](https://next-intl.dev/blog/next-intl-3-22) introduced in `3.22` in anticipation of v4 and Next 15. 

Migrated to `/i18n/request.ts` and `/i18n/routing.ts` architecture. Refactored middleware. Adopted async `params` prop in `generateMetadata` and `getRequestConfig` to support Next v15. Adopted `setRequestLocale` over `unstable_setRequestLocale`.
