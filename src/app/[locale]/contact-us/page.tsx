import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPageClient from "./ContactPageClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://btbpayments.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const title = "Contact BTB Global Trading | International Trade & Payments";
  const description = t("hero.body1");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "BTB Global Trading",
      url: `${BASE_URL}/${locale}/contact-us`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact-us`,
      languages: {
        en: `${BASE_URL}/en/contact-us`,
        ar: `${BASE_URL}/ar/contact-us`,
        he: `${BASE_URL}/he/contact-us`,
        tr: `${BASE_URL}/tr/contact-us`,
        zh: `${BASE_URL}/zh/contact-us`,
      },
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
