import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicesPageClient from "./ServicesPageClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://btbpayments.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const title = "Services | BTB Global Trading — Global Payments, FX & Trade Support";
  const description = t("hero.subtitle");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "BTB Global Trading",
      url: `${BASE_URL}/${locale}/services`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        en: `${BASE_URL}/en/services`,
        ar: `${BASE_URL}/ar/services`,
        he: `${BASE_URL}/he/services`,
        tr: `${BASE_URL}/tr/services`,
        zh: `${BASE_URL}/zh/services`,
      },
    },
  };
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}
