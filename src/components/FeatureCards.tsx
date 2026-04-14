"use client";

import { motion, type Variants } from "framer-motion";
import { Globe, DollarSign, Ship } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const CARDS = [
  {
    num: "01",
    key: "globalSettlements" as const,
    icon: Globe,
    accentColor: "#C8A96A",
  },
  {
    num: "02",
    key: "fxTreasury" as const,
    icon: DollarSign,
    accentColor: "#4a7fb5",
  },
  {
    num: "03",
    key: "tradeDealSupport" as const,
    icon: Ship,
    accentColor: "#2d5a8a",
  },
];

export default function FeatureCards() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-24 md:py-28 mx-auto max-w-7xl">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <span className="section-label">{t("whatWeDo.sectionLabel")}</span>
        <div className="gold-line" />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 md:grid-cols-3"
      >
        {CARDS.map(({ num, key, icon: Icon, accentColor }) => (
          <motion.div
            key={key}
            variants={item}
            className="card-luxury group p-8"
          >
            {/* Top accent glow bar */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                opacity: 0.5,
              }}
            />

            {/* Ghost number */}
            <div
              className="absolute top-5 right-6 font-display text-5xl font-light select-none pointer-events-none transition-opacity duration-300"
              style={{ color: `${accentColor}10` }}
            >
              {num}
            </div>

            {/* Icon — gold tinted box */}
            <div
              className="mb-6 inline-flex items-center justify-center rounded-xl p-3 transition-all duration-300 group-hover:scale-105"
              style={{
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}28`,
              }}
            >
              <Icon size={22} style={{ color: accentColor }} />
            </div>

            {/* Title */}
            <h3 className="font-display text-xl md:text-2xl font-medium text-white leading-snug mb-3">
              {t(`whatWeDo.${key}.title`)}
            </h3>

            {/* Body */}
            <p className="text-sm text-white/55 leading-relaxed font-body">
              {t(`whatWeDo.${key}.body`)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
