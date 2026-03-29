"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Globe, DollarSign, Ship, CheckCircle2 } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const li: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const NUMS = ["01", "02", "03"];

function ServiceBlock({
  num,
  icon,
  title,
  body,
  bullets,
  ctaLabel,
  ctaHref,
  accentColor,
}: {
  num: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#0b0e14] overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        }}
      />

      <div className="p-8 md:p-10 lg:p-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          {/* Left: number + icon + title + body + CTA */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="text-[11px] font-mono tracking-[0.18em] text-white/30 mb-5">
              {num}
            </div>

            <div className="mb-5 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
              {icon}
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
              {title}
            </h2>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-white/60">
              {body}
            </p>

            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(197,146,42,1), rgba(21,45,86,1))",
                }}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Right: bullets */}
          <motion.ul
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-7 space-y-3"
          >
            {bullets.map((b, idx) => (
              <motion.li
                key={idx}
                variants={li}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" />
                <span className="text-sm md:text-[15px] leading-relaxed text-white/75">
                  {b}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPageClient() {
  const t = useTranslations("services");
  const locale = useLocale();

  const contactHref = `/${locale}/contact-us`;

  const SERVICES = [
    {
      icon: <Globe className="h-5 w-5 text-white/80" />,
      titleKey: "globalPayments" as const,
      accent: "rgba(197,146,42,0.7)",
    },
    {
      icon: <DollarSign className="h-5 w-5 text-white/80" />,
      titleKey: "fxTreasury" as const,
      accent: "rgba(21,45,86,0.7)",
    },
    {
      icon: <Ship className="h-5 w-5 text-white/80" />,
      titleKey: "tradeSupport" as const,
      accent: "rgba(12,31,63,0.7)",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[55vh] md:min-h-[62vh] flex items-center overflow-hidden">
        <Image
          src="/images/services-hero.png"
          alt="BTB Global Trading services"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Brand glow */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(197,146,42,0.18), transparent 55%)," +
              "radial-gradient(circle at 70% 35%, rgba(21,45,86,0.14), transparent 55%)," +
              "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.90))",
          }}
        />

        {/* Centered hero text */}
        <div className="relative z-10 w-full px-6 py-20 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <div className="text-[11px] tracking-[0.22em] text-white/50 uppercase mb-5">
              What We Offer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/65 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* SERVICE BLOCKS */}
      <section className="space-y-6 px-6 py-16 md:space-y-8 md:py-20">
        {SERVICES.map(({ icon, titleKey, accent }, idx) => (
          <ServiceBlock
            key={titleKey}
            num={NUMS[idx]}
            icon={icon}
            title={t(`${titleKey}.title`)}
            body={t(`${titleKey}.body`)}
            bullets={[
              t(`${titleKey}.bullets.0`),
              t(`${titleKey}.bullets.1`),
              t(`${titleKey}.bullets.2`),
              t(`${titleKey}.bullets.3`),
            ]}
            ctaLabel={t("cta")}
            ctaHref={contactHref}
            accentColor={accent}
          />
        ))}
      </section>
    </main>
  );
}
