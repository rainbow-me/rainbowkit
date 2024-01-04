import createMiddleware from 'next-intl/middleware';
import { locales } from './config';

export default createMiddleware({
  defaultLocale: 'en-US',
  locales
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
