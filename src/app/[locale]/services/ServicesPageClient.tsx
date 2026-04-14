"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import {
  GlobeHemisphereWest, CurrencyDollar, Anchor,
  CheckCircle, ArrowRight,
} from "@phosphor-icons/react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const capReveal: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

type ServiceKey = "globalSettlements" | "fxTreasury" | "tradeSupport";

function ServiceBlock({
  num,
  icon,
  serviceKey,
  ctaLabel,
  ctaHref,
  accentColor,
  hasTypicalExample,
}: {
  num: string;
  icon: React.ReactNode;
  serviceKey: ServiceKey;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
  hasTypicalExample?: boolean;
}) {
  const t = useTranslations("services");

  const caps: string[] = [];
  for (let i = 0; i < 5; i++) {
    try {
      const cap = t(`${serviceKey}.keyCapabilities.${i}` as Parameters<typeof t>[0]);
      if (cap && cap !== `${serviceKey}.keyCapabilities.${i}`) caps.push(cap);
    } catch { break; }
  }

  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden group"
      style={{
        background: "#0d2545",
        border: "1px solid rgba(200,169,106,0.10)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[1.5px] transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44, transparent)`,
          opacity: 0.65,
        }}
      />

      {/* Ghost service number — large backdrop */}
      <div
        className="absolute -right-4 -bottom-6 font-display text-[120px] font-light select-none pointer-events-none leading-none"
        style={{ color: `${accentColor}07` }}
      >
        {num}
      </div>

      <div className="relative p-8 md:p-10 lg:p-12">

        {/* ── Header: number + icon aligned with title ── */}
        <div className="flex items-start justify-between mb-7">
          <div className="flex items-center gap-4">
            {/* Icon box */}
            <div
              className="shrink-0 flex items-center justify-center rounded-xl p-3.5 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}28`,
              }}
            >
              {icon}
            </div>
            {/* Title — same vertical axis as icon */}
            <div>
              <div
                className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase mb-1"
                style={{ color: `${accentColor}80` }}
              >
                {num}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-white leading-tight">
                {t(`${serviceKey}.title` as Parameters<typeof t>[0])}
              </h2>
            </div>
          </div>
        </div>

        {/* Overview */}
        <p className="text-sm md:text-base leading-relaxed text-white/60 font-body mb-8 max-w-2xl">
          {t(`${serviceKey}.overview` as Parameters<typeof t>[0])}
        </p>

        {/* Best For + Key Capabilities grid */}
        <div className="grid gap-5 md:grid-cols-2 mb-6">
          {/* Best For */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: "#C8A96A" }}
            >
              {t("bestForLabel")}
            </div>
            <p className="text-sm text-white/65 leading-relaxed font-body">
              {t(`${serviceKey}.bestFor` as Parameters<typeof t>[0])}
            </p>
          </div>

          {/* Key Capabilities */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: "#C8A96A" }}
            >
              {t("keyCapabilitiesLabel")}
            </div>
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2"
            >
              {caps.map((cap, idx) => (
                <motion.li key={idx} variants={capReveal} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={14}
                    weight="fill"
                    className="mt-0.5 shrink-0"
                    style={{ color: "#C8A96A" }}
                  />
                  <span className="text-sm text-white/65 leading-relaxed font-body">{cap}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Typical Example */}
        {hasTypicalExample && (
          <div
            className="rounded-xl px-5 py-4 mb-7"
            style={{
              background: "rgba(200,169,106,0.04)",
              border: "1px solid rgba(200,169,106,0.12)",
            }}
          >
            <div
              className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase mb-2"
              style={{ color: "#C8A96A" }}
            >
              {t("typicalExampleLabel")}
            </div>
            <p className="text-sm text-white/60 italic leading-relaxed font-body">
              {t(`${serviceKey}.typicalExample` as Parameters<typeof t>[0])}
            </p>
          </div>
        )}

        {/* CTA */}
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 btn-gold text-[12px] px-6 py-2.5"
        >
          {ctaLabel}
          <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesPageClient() {
  const t = useTranslations("services");
  const locale = useLocale();

  const contactHref = `/${locale}/contact-us`;

  const SERVICES: {
    icon: React.ReactNode;
    serviceKey: ServiceKey;
    accent: string;
    hasTypicalExample?: boolean;
  }[] = [
    {
      icon: <GlobeHemisphereWest size={22} weight="thin" style={{ color: "#C8A96A" }} />,
      serviceKey: "globalSettlements",
      accent: "#C8A96A",
      hasTypicalExample: true,
    },
    {
      icon: <CurrencyDollar size={22} weight="thin" style={{ color: "#6eaadc" }} />,
      serviceKey: "fxTreasury",
      accent: "#4a7fb5",
    },
    {
      icon: <Anchor size={22} weight="thin" style={{ color: "#7eadd4" }} />,
      serviceKey: "tradeSupport",
      accent: "#2d5a8a",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[68vh] flex items-center overflow-hidden">
        <Image
          src="/images/services-hero.png"
          alt="BTB Global Trading services"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        <div className="absolute inset-0 bg-[#0B1F3A]/65" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(200,169,106,0.10), transparent 60%)," +
              "linear-gradient(to bottom, rgba(7,22,41,0.05), rgba(7,22,41,0.88))",
          }}
        />

        <div className="relative z-10 w-full px-6 py-20 md:py-28">
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={reveal}>
              <span className="section-label">What We Offer</span>
            </motion.div>
            <motion.div
              variants={reveal}
              className="mx-auto my-4 h-px w-10"
              style={{ background: "linear-gradient(90deg, transparent, #C8A96A, transparent)" }}
            />
            <motion.h1
              variants={reveal}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={reveal}
              className="mt-6 text-base md:text-lg leading-relaxed text-white/55 max-w-2xl mx-auto font-body font-light"
            >
              {t("hero.subtitle")}
            </motion.p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0B1F3A]" />
      </section>

      {/* ── SERVICE BLOCKS ───────────────────────────────────── */}
      <section className="space-y-6 px-6 py-16 md:space-y-8 md:py-20">
        {SERVICES.map(({ icon, serviceKey, accent, hasTypicalExample }, idx) => (
          <ServiceBlock
            key={serviceKey}
            num={`0${idx + 1}`}
            icon={icon}
            serviceKey={serviceKey}
            ctaLabel={t("cta")}
            ctaHref={contactHref}
            accentColor={accent}
            hasTypicalExample={hasTypicalExample}
          />
        ))}
      </section>
    </main>
  );
}
