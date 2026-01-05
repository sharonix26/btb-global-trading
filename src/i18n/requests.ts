import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '../lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.includes(locale as string) ? (locale as string) : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default
  };
});
