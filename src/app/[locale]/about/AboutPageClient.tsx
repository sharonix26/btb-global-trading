"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  GlobeHemisphereWest, ShieldCheck, Handshake, MapPin,
  Users, Eye, Compass, Layout, ArrowRight,
} from "@phosphor-icons/react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutPageClient() {
  const t = useTranslations("about");
  const locale = useLocale();

  const OVERVIEW_ITEMS = [
    { key: "euBased",         icon: <GlobeHemisphereWest size={20} weight="thin" style={{ color: "#C8A96A" }} /> },
    { key: "warsawHQ",        icon: <MapPin size={20} weight="thin" style={{ color: "#C8A96A" }} /> },
    { key: "partnerLed",      icon: <Handshake size={20} weight="thin" style={{ color: "#C8A96A" }} /> },
    { key: "complianceFirst", icon: <ShieldCheck size={20} weight="thin" style={{ color: "#C8A96A" }} /> },
  ] as const;

  const HOW_OPERATES_ITEMS = [
    { key: "operationalClarity",    icon: <Eye size={20} weight="thin" style={{ color: "#6eaadc" }} /> },
    { key: "directSupport",         icon: <Users size={20} weight="thin" style={{ color: "#6eaadc" }} /> },
    { key: "crossBorderPrecision",  icon: <Compass size={20} weight="thin" style={{ color: "#6eaadc" }} /> },
    { key: "structuredCoordination",icon: <Layout size={20} weight="thin" style={{ color: "#6eaadc" }} /> },
  ] as const;

  const WORK_WITH_KEYS = [
    "importersExporters",
    "treasuryTeams",
    "internationalOperators",
    "privateInternational",
  ] as const;

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] md:min-h-[88vh] overflow-hidden">
        <Image
          src="/images/about-hero.png"
          alt={t("hero.imageAlt")}
          fill priority sizes="100vw"
          className="object-cover object-center scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-[#0B1F3A]/58" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 20% 35%, rgba(200,169,106,0.10), transparent 60%)," +
              "linear-gradient(to bottom, rgba(7,22,41,0.08), rgba(7,22,41,0.90))",
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,169,106,1) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(200,169,106,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative z-10 px-6 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-3xl"
            >
              <motion.div variants={reveal} className="flex flex-wrap gap-2 mb-6">
                {["EU-based", "Licensed partner network", "Warsaw, Poland"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3.5 py-1 text-[11px] font-body font-medium tracking-wide"
                    style={{
                      background: "rgba(200,169,106,0.07)",
                      border: "1px solid rgba(200,169,106,0.18)",
                      color: "rgba(200,169,106,0.85)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                variants={reveal}
                className="font-display text-6xl md:text-7xl font-light tracking-tight leading-[1.05]"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.div variants={reveal} className="gold-line mt-6" />

              <motion.p
                variants={reveal}
                className="text-base md:text-lg text-white/60 leading-relaxed font-body font-light max-w-xl"
              >
                {t("hero.description")}
              </motion.p>

              <motion.div variants={reveal} className="mt-10 flex flex-wrap gap-3">
                <Link href={`/${locale}/contact-us`} className="btn-gold">
                  <span className="flex items-center gap-2">
                    {t("hero.ctaPrimary")}
                    <ArrowRight size={14} weight="bold" />
                  </span>
                </Link>
                <a href="#who-we-work-with" className="btn-ghost">
                  {t("hero.ctaSecondary")}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#0B1F3A]" />
      </section>

      {/* ── COMPANY OVERVIEW ─────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={reveal} className="mb-14">
              <span className="section-label">Company</span>
              <div className="gold-line" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-white">
                {t("companyOverview.title")}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {OVERVIEW_ITEMS.map(({ key, icon }) => (
                <motion.div
                  key={key}
                  variants={cardReveal}
                  className="card-luxury group p-7"
                >
                  <div
                    className="mb-5 inline-flex items-center justify-center rounded-xl p-3 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(200,169,106,0.08)",
                      border: "1px solid rgba(200,169,106,0.18)",
                    }}
                  >
                    {icon}
                  </div>
                  <h3 className="font-display text-xl font-medium text-white mb-2">
                    {t(`companyOverview.${key}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed font-body">
                    {t(`companyOverview.${key}.body` as Parameters<typeof t>[0])}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW BTB OPERATES ─────────────────────────────────── */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={reveal} className="mb-14">
              <span className="section-label">Operations</span>
              <div className="gold-line" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-white">
                {t("howOperates.title")}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {HOW_OPERATES_ITEMS.map(({ key, icon }, idx) => (
                <motion.div
                  key={key}
                  variants={cardReveal}
                  className="card-luxury group p-7"
                  style={{ borderColor: "rgba(78,127,181,0.12)" }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[1.5px]"
                    style={{
                      background: "linear-gradient(90deg, rgba(78,127,181,0.5), transparent)",
                      opacity: 0.6,
                    }}
                  />
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="inline-flex items-center justify-center rounded-xl p-3 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: "rgba(78,127,181,0.08)",
                        border: "1px solid rgba(78,127,181,0.20)",
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      className="font-display text-2xl font-light"
                      style={{ color: "rgba(78,127,181,0.3)" }}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-white mb-2">
                    {t(`howOperates.${key}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed font-body">
                    {t(`howOperates.${key}.body` as Parameters<typeof t>[0])}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHERE WE OPERATE ─────────────────────────────────── */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(13,37,69,0.8), rgba(7,22,41,0.6))",
              border: "1px solid rgba(200,169,106,0.12)",
            }}
          >
            {/* Decorative corner lines */}
            <div
              className="absolute top-0 left-0 w-16 h-16"
              style={{
                borderTop: "1px solid rgba(200,169,106,0.3)",
                borderLeft: "1px solid rgba(200,169,106,0.3)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16"
              style={{
                borderBottom: "1px solid rgba(200,169,106,0.3)",
                borderRight: "1px solid rgba(200,169,106,0.3)",
              }}
            />

            <motion.div variants={reveal} className="mb-8">
              <span className="section-label">Reach</span>
              <div className="gold-line" />
              <h2 className="font-display text-4xl font-light text-white">
                {t("operate.title")}
              </h2>
            </motion.div>

            <motion.div variants={reveal} className="flex flex-wrap gap-3">
              {String(t("operate.regions"))
                .split(" — ")
                .map((r) => r.trim())
                .filter(Boolean)
                .map((r) => (
                  <span
                    key={r}
                    className="rounded-full px-5 py-2 text-sm font-body font-medium"
                    style={{
                      background: "rgba(200,169,106,0.07)",
                      border: "1px solid rgba(200,169,106,0.18)",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {r}
                  </span>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ─────────────────────────────────── */}
      <section id="who-we-work-with" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={reveal} className="mb-12">
              <span className="section-label">Clients</span>
              <div className="gold-line" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-white">
                {t("workWith.title")}
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="flex flex-wrap gap-3">
              {WORK_WITH_KEYS.map((key) => (
                <motion.span
                  key={key}
                  variants={cardReveal}
                  className="rounded-full px-6 py-3 font-display text-lg font-medium"
                  style={{
                    background: "rgba(13,37,69,0.8)",
                    border: "1px solid rgba(200,169,106,0.15)",
                    color: "rgba(255,255,255,0.80)",
                  }}
                >
                  {t(`workWith.${key}` as Parameters<typeof t>[0])}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
