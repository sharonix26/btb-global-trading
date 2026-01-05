import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from '../lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale && (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default
  };
});
