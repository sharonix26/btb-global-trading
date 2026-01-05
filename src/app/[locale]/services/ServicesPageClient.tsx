"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Globe, DollarSign, Ship, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const li: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }
  }
};

function ServiceBlock({
  icon,
  title,
  body,
  bullets,
  ctaLabel,
  ctaHref,
  bgImage
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string; // route WITHOUT locale, ex: "/contact-us"
  bgImage: string;
}) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative mx-auto max-w-5xl"
    >
      {/* glow behind */}
      <div
        className="pointer-events-none absolute -inset-10 opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(34,211,238,0.16), transparent 60%)," +
            "radial-gradient(circle at 80% 30%, rgba(168,85,247,0.12), transparent 60%)"
        }}
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md px-7 py-10 md:px-12 md:py-12">
        {/* background image */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 960px"
            className="object-cover object-center opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at 22% 28%, rgba(34,211,238,0.14), transparent 60%)," +
                "radial-gradient(circle at 78% 26%, rgba(168,85,247,0.10), transparent 62%)," +
                "linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.35))"
            }}
          />
        </div>

        {/* shimmer line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80"
          style={{
            background:
              "linear-gradient(90deg, rgba(34,211,238,0), rgba(34,211,238,0.8), rgba(168,85,247,0.8), rgba(99,102,241,0.8), rgba(34,211,238,0))",
            backgroundSize: "200% 200%",
            animation: "btb-gradient-move 7s ease infinite"
          }}
        />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200">
            {icon}
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-white/70">
            {body}
          </p>

          <motion.ul
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-7 space-y-3 text-left mx-auto max-w-xl"
          >
            {bullets.map((b, idx) => (
              <motion.li
                key={idx}
                variants={li}
                className="flex items-start gap-3 text-white/75"
              >
                <span className="mt-0.5 shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                </span>
                <span className="text-sm md:text-[15px] leading-relaxed">
                  {b}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-black relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1))",
                  backgroundSize: "200% 200%",
                  animation: "btb-gradient-move 7s ease infinite"
                }}
              />
              <span className="relative z-10">{ctaLabel}</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes btb-gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.section>
  );
}

export default function ServicesPageClient() {
  const t = useTranslations("services");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
              {t("hero.title")}
            </h1>
            <p className="mt-5 mx-auto max-w-3xl text-sm md:text-base leading-relaxed text-white/65">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOCKS */}
      <section className="px-6 pb-20 md:pb-28 space-y-10 md:space-y-12">
        <ServiceBlock
          icon={<Globe className="h-6 w-6" />}
          title={t("globalPayments.title")}
          body={t("globalPayments.body")}
          bullets={[
            t("globalPayments.bullets.0"),
            t("globalPayments.bullets.1"),
            t("globalPayments.bullets.2"),
            t("globalPayments.bullets.3")
          ]}
          ctaLabel={t("cta")}
          ctaHref="/contact-us"
          bgImage="/images/img1.png"
        />

        <ServiceBlock
          icon={<DollarSign className="h-6 w-6" />}
          title={t("fxTreasury.title")}
          body={t("fxTreasury.body")}
          bullets={[
            t("fxTreasury.bullets.0"),
            t("fxTreasury.bullets.1"),
            t("fxTreasury.bullets.2"),
            t("fxTreasury.bullets.3")
          ]}
          ctaLabel={t("cta")}
          ctaHref="/contact-us"
          bgImage="/images/img2.png"
        />

        <ServiceBlock
          icon={<Ship className="h-6 w-6" />}
          title={t("tradeSupport.title")}
          body={t("tradeSupport.body")}
          bullets={[
            t("tradeSupport.bullets.0"),
            t("tradeSupport.bullets.1"),
            t("tradeSupport.bullets.2"),
            t("tradeSupport.bullets.3")
          ]}
          ctaLabel={t("cta")}
          ctaHref="/contact-us"
          bgImage="/images/img3.png"
        />
      </section>
    </main>
  );
}
