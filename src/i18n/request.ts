import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "@/lib/i18n";

type AppLocale = (typeof locales)[number];

function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ locale }) => {
  const safeLocale: AppLocale = isAppLocale(locale) ? locale : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`@/messages/${safeLocale}.json`)).default,
  };
});
