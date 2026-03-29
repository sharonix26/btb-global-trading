import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, rtlLocales } from "@/lib/i18n";
import { setRequestLocale } from "next-intl/server";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://btbpayments.com"),
  title: {
    default: "BTB Global Trading | Cross-Border Financial Infrastructure",
    template: "%s | BTB Global Trading",
  },
  description:
    "EU-based financial coordination for international settlements, FX, and cross-border trade. Transactions carried out by licensed financial partners.",
  keywords: [
    "cross-border payments",
    "international settlements",
    "FX treasury",
    "B2B payments",
    "trade finance",
    "global payments",
    "BTB Global Trading",
  ],
  authors: [{ name: "BTB Global Trading" }],
  creator: "BTB Global Trading",
  openGraph: {
    type: "website",
    siteName: "BTB Global Trading",
    title: "BTB Global Trading | Cross-Border Financial Infrastructure",
    description:
      "EU-based financial coordination for international settlements, FX, and cross-border trade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BTB Global Trading",
    description:
      "EU-based financial coordination for international settlements, FX, and cross-border trade.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

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
