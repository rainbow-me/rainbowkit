import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en-US', 'zh-CN'],
  defaultLocale: 'en-US'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
