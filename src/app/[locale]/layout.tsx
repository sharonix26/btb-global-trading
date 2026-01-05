import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, rtlLocales } from "@/lib/i18n";
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

  if (!locales.includes(locale as any)) notFound();

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={rtlLocales.has(locale) ? "rtl" : "ltr"}>
      <body className="min-h-dvh bg-black text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* App shell: makes footer stick to bottom on short pages */}
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
