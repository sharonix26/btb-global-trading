"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Globe,
  ShieldCheck,
  Handshake,
  Banknote,
  Building2,
  Users,
  Truck,
  Lock,
  ArrowRight,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }, // ✅ easeOut-ish
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};


export default function AboutPageClient() {
  const t = useTranslations("about");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO — toned down (less “UI heavy”) */}
      <section className="relative min-h-[74vh] md:min-h-[82vh] overflow-hidden">
        <Image
          src="/images/about-hero.png"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Softer brand wash */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            background:
              "radial-gradient(circle at 22% 28%, rgba(34,211,238,0.14), transparent 58%)," +
              "radial-gradient(circle at 78% 26%, rgba(168,85,247,0.10), transparent 60%)," +
              "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.92))",
          }}
        />

        {/* Subtle grid texture (lighter) */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            backgroundPosition: "center",
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 pt-20 pb-14 md:pt-24 md:pb-16">
          <div className="mx-auto max-w-6xl">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-3xl"
            >
              {/* Tag chips (reduced) */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-xs text-white/65">
                  EU-based
                </span>
                <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-xs text-white/65">
                  Licensed partner network
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base md:text-lg text-white/75 leading-relaxed"
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                {/* Primary CTA — calmer (white button) */}
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-black bg-white hover:opacity-90 transition"
                >
                  <span className="flex items-center gap-2">
                    {t("hero.ctaPrimary")}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                {/* Secondary */}
                <a
                  href="#who-we-work-with"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
                >
                  {t("hero.ctaSecondary")}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* WHO WE ARE + FEATURES */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-10 md:grid-cols-12 items-start"
          >
            {/* Left copy */}
            <motion.div variants={fadeUp} className="md:col-span-5 relative">
              <div
                className="pointer-events-none absolute -inset-10 opacity-30 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(34,211,238,0.14), transparent 60%)," +
                    "radial-gradient(circle at 70% 55%, rgba(168,85,247,0.10), transparent 62%)",
                }}
              />

              <div className="relative">
                <div className="text-xs tracking-[0.22em] text-white/45">
                  ABOUT BTB
                </div>

                <h2 className="mt-3 text-3xl md:text-4xl font-semibold">
                  {t("whoWeAre.title")}
                </h2>

                <div className="mt-5 h-px w-20 bg-gradient-to-r from-white/30 to-transparent" />

                <p className="mt-6 text-white/70 leading-relaxed">
                  {t("whoWeAre.description")}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-4 py-2 text-sm text-white/70 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-cyan-300/70" />
                  <span className="font-medium text-white/80">Signal:</span>
                  <span>Operational clarity + regulated execution access.</span>
                </div>
              </div>
            </motion.div>

            {/* Right cluster */}
            <motion.div variants={fadeUp} className="md:col-span-7 relative">
              <div
                className="pointer-events-none absolute -inset-10 opacity-35 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 55% 40%, rgba(34,211,238,0.16), transparent 60%)," +
                    "radial-gradient(circle at 85% 35%, rgba(168,85,247,0.12), transparent 60%)",
                }}
              />

              {/* container: tinted glass (NOT flat grey) */}
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-md p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] shadow-black/40">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Feature
                    icon={<Handshake className="h-5 w-5" />}
                    title={t("whoWeAre.features.coordination.title")}
                    text={t("whoWeAre.features.coordination.text")}
                  />
                  <Feature
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title={t("whoWeAre.features.compliance.title")}
                    text={t("whoWeAre.features.compliance.text")}
                  />
                  <Feature
                    icon={<Globe className="h-5 w-5" />}
                    title={t("whoWeAre.features.crossBorder.title")}
                    text={t("whoWeAre.features.crossBorder.text")}
                  />
                  <Feature
                    icon={<Banknote className="h-5 w-5" />}
                    title={t("whoWeAre.features.visibility.title")}
                    text={t("whoWeAre.features.visibility.text")}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BUILT FOR */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            {/* slightly stronger glow so it doesn't feel grey */}
            <div
              className="pointer-events-none absolute -inset-10 opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 22% 38%, rgba(34,211,238,0.12), transparent 58%)," +
                  "radial-gradient(circle at 78% 40%, rgba(168,85,247,0.10), transparent 58%)",
              }}
            />

            {/* tinted container */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-md p-8 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] shadow-black/40">
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-semibold"
              >
                {t("builtFor.title")}
              </motion.h2>

              <motion.p variants={fadeUp} className="mt-3 text-white/65">
                {t("builtFor.subtitle")}
              </motion.p>

              <motion.div
                variants={stagger}
                className="mt-8 grid gap-4 md:grid-cols-2"
              >
                <Bullet text={t("builtFor.bullets.0")} />
                <Bullet text={t("builtFor.bullets.1")} />
                <Bullet text={t("builtFor.bullets.2")} />
                <Bullet text={t("builtFor.bullets.3")} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHERE WE OPERATE */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-md p-8 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] shadow-black/40"
          >
            {/* section glow */}
            <div
              className="pointer-events-none absolute -inset-10 opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 35%, rgba(99,102,241,0.10), transparent 60%)," +
                  "radial-gradient(circle at 75% 40%, rgba(34,211,238,0.10), transparent 60%)",
              }}
            />

            <motion.h2
              variants={fadeUp}
              className="relative text-3xl font-semibold"
            >
              {t("operate.title")}
            </motion.h2>

            <motion.p variants={fadeUp} className="relative mt-4 text-white/70">
              {t("operate.regions")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="relative mt-6 flex flex-wrap gap-2"
            >
              {String(t("operate.regions"))
                .split("-")
                .map((r) => r.trim())
                .filter(Boolean)
                .map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-white/70 backdrop-blur-md"
                  >
                    {r}
                  </span>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section id="who-we-work-with" className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-semibold"
            >
              {t("workWith.title")}
            </motion.h2>

            <motion.div
              variants={stagger}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <Card
                icon={<Building2 className="h-5 w-5" />}
                title={t("workWith.cards.importers.title")}
                items={[
                  t("workWith.cards.importers.items.0"),
                  t("workWith.cards.importers.items.1"),
                  t("workWith.cards.importers.items.2"),
                ]}
              />

              <Card
                icon={<Users className="h-5 w-5" />}
                title={t("workWith.cards.cfos.title")}
                items={[
                  t("workWith.cards.cfos.items.0"),
                  t("workWith.cards.cfos.items.1"),
                  t("workWith.cards.cfos.items.2"),
                ]}
              />

              <Card
                icon={<Truck className="h-5 w-5" />}
                title={t("workWith.cards.logistics.title")}
                items={[
                  t("workWith.cards.logistics.items.0"),
                  t("workWith.cards.logistics.items.1"),
                  t("workWith.cards.logistics.items.2"),
                ]}
              />

              <Card
                icon={<Handshake className="h-5 w-5" />}
                title={t("workWith.cards.private.title")}
                items={[
                  t("workWith.cards.private.items.0"),
                  t("workWith.cards.private.items.1"),
                  t("workWith.cards.private.items.2"),
                ]}
              />

              <Card
                icon={<Globe className="h-5 w-5" />}
                title={t("workWith.cards.partners.title")}
                items={[
                  t("workWith.cards.partners.items.0"),
                  t("workWith.cards.partners.items.1"),
                  t("workWith.cards.partners.items.2"),
                ]}
              />

              <Card
                icon={<Lock className="h-5 w-5" />}
                title={t("workWith.cards.security.title")}
                items={[
                  t("workWith.cards.security.items.0"),
                  t("workWith.cards.security.items.1"),
                  t("workWith.cards.security.items.2"),
                ]}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-md px-8 py-12 md:px-12 md:py-14 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] shadow-black/40"
          >
            <div
              className="pointer-events-none absolute -inset-10 opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 40%, rgba(34,211,238,0.12), transparent 55%)," +
                  "radial-gradient(circle at 70% 40%, rgba(168,85,247,0.10), transparent 55%)",
              }}
            />

            <motion.h3
              variants={fadeUp}
              className="relative text-2xl md:text-3xl font-semibold"
            >
              {t("cta.title")}
            </motion.h3>

            <motion.div variants={fadeUp} className="relative mt-7">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium text-black bg-white hover:opacity-90 transition"
              >
                <span className="flex items-center gap-2">
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ---------- UI helpers ---------- */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="relative rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-5 hover:bg-black/40 transition
      before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:content-['']"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-white">
          {icon}
        </div>
        <div className="font-semibold text-white/90">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/65">{text}</p>
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex gap-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-5 hover:bg-black/40 transition
      before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:content-['']"
    >
      <div className="mt-2 h-2 w-2 rounded-full bg-cyan-300/70 shrink-0" />
      <p className="text-sm leading-relaxed text-white/70">{text}</p>
    </motion.div>
  );
}

function Card({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-6 hover:bg-black/40 transition
      before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:content-['']"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-white">
          {icon}
        </div>
        <h3 className="text-sm font-semibold leading-snug text-white/90">
          {title}
        </h3>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-white/65">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45 shrink-0" />
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
