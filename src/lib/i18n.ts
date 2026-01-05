export const locales = ['en', 'ar', 'tr', 'he', 'zh'] as const;
export const defaultLocale = 'en';

export const rtlLocales = new Set(['ar', 'he']);
export type Locale = (typeof locales)[number];
