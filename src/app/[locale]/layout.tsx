import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, rtlLocales } from "@/lib/i18n";
import { setRequestLocale } from "next-intl/server";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) notFound();

  // ✅ bind the request to the route locale
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={rtlLocales.has(locale) ? "rtl" : "ltr"}>
      <body className="min-h-dvh bg-black text-white antialiased">
        {/* ✅ pass locale explicitly */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
