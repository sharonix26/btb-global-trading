import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(ar|en|tr|he|zh)/:path*']
};
