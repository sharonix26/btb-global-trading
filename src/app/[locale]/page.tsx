"use client";

import { useTranslations } from "next-intl";
import {Link} from "@/i18n/navigation";
import VantaGlobeBg from "@/components/VantaGlobeBg";
import SectionDivider from "@/components/SectionDivider";
import FeatureCards from "@/components/FeatureCards";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function HomePage() {
  const t = useTranslations("home");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO with Vanta Globe */}
      <VantaGlobeBg className="min-h-[70vh] flex items-center">
        <section className="px-6 py-24 mx-auto max-w-6xl">
          <div className="max-w-4xl md:ml-16">
            {/* H1 */}
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block">{t("hero.titleLine2")}</span>
            </h1>

            {/* H2 */}
            <h2 className="mt-6 text-lg md:text-xl text-neutral-200 max-w-3xl font-normal">
              {t("hero.subtitle")}
            </h2>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/contact-us"
                className="
                  inline-flex items-center justify-center
                  rounded-full px-6 py-3
                  text-sm font-medium text-black
                  transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                  relative overflow-hidden
                "
              >
                {/* Gradient background */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1))",
                    backgroundSize: "200% 200%",
                    animation: "btb-gradient-move 7s ease infinite",
                  }}
                />
                {/* Hover overlay */}
                <span className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-white/10" />
                <span className="relative z-10">{t("hero.cta")}</span>
              </Link>
            </div>
          </div>
        </section>
      </VantaGlobeBg>

      <SectionDivider />

      {/* FEATURE CARDS */}
      <section>
        <FeatureCards />
      </section>

      <AboutSection />
      <WhyChooseUs />

      <SectionDivider />
    </main>
  );
}
