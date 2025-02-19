import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*'],
};

export default createMiddleware(routing);
