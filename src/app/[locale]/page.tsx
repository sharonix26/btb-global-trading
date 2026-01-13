"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import FeatureCards from "@/components/FeatureCards";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO with Image (same architecture as Contact page) */}
      <section className="relative min-h-[70vh] md:min-h-[78vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/home-hero.png"
          alt="BTB Global Trading hero banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Brand glow overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 18% 35%, rgba(34,211,238,0.22), transparent 55%)," +
              "radial-gradient(circle at 78% 30%, rgba(168,85,247,0.18), transparent 55%)," +
              "radial-gradient(circle at 65% 80%, rgba(99,102,241,0.14), transparent 60%)," +
              "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.92))",
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 py-24 mx-auto max-w-6xl w-full">
          <div className="max-w-4xl md:ml-16">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block">{t("hero.titleLine2")}</span>
            </h1>

            <h2 className="mt-6 text-lg md:text-xl text-neutral-200 max-w-3xl font-normal">
              {t("hero.subtitle")}
            </h2>

            <div className="mt-10">
              <Link
                href={`/${locale}/contact-us`}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 relative overflow-hidden"
              >
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1))",
                    backgroundSize: "200% 200%",
                    animation: "btb-gradient-move 7s ease infinite",
                  }}
                />
                <span className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-white/10" />
                <span className="relative z-10">{t("hero.cta")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-black" />
      </section>

      <SectionDivider />

      <FeatureCards />
      <AboutSection />
      <WhyChooseUs />

      <SectionDivider />
    </main>
  );
}
