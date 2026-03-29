import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPageClient from "./AboutPageClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://btbpayments.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const title = "About BTB Global Trading | EU-Based Financial Coordination";
  const description = t("hero.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "BTB Global Trading",
      url: `${BASE_URL}/${locale}/about`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        en: `${BASE_URL}/en/about`,
        ar: `${BASE_URL}/ar/about`,
        he: `${BASE_URL}/he/about`,
        tr: `${BASE_URL}/tr/about`,
        zh: `${BASE_URL}/zh/about`,
      },
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
