import createMiddleware from "next-intl/middleware";
import {locales} from "@/lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always" // 🔥 forces /ar/... /he/... etc
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
