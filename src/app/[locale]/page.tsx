import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import HomePageClient from "./HomePageClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://btbpayments.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const title = "BTB Global Trading | Cross-Border Financial Infrastructure";
  const description = t("hero.subtitle");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "BTB Global Trading",
      url: `${BASE_URL}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        ar: `${BASE_URL}/ar`,
        he: `${BASE_URL}/he`,
        tr: `${BASE_URL}/tr`,
        zh: `${BASE_URL}/zh`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePageClient />;
}
