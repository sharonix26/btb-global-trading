"use client";

import { motion } from "framer-motion";
import { Globe, DollarSign, Ship } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const CARDS = [
  {
    num: "01",
    key: "globalPayments" as const,
    icon: Globe,
    accent: "rgba(197,146,42,0.7)",
  },
  {
    num: "02",
    key: "fxTreasury" as const,
    icon: DollarSign,
    accent: "rgba(21,45,86,0.7)",
  },
  {
    num: "03",
    key: "tradeSupport" as const,
    icon: Ship,
    accent: "rgba(12,31,63,0.7)",
  },
];

export default function FeatureCards() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-20 mx-auto max-w-6xl">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-5 md:grid-cols-3"
      >
        {CARDS.map(({ num, key, icon: Icon, accent }) => (
          <motion.div
            key={key}
            variants={item}
            className="group relative rounded-2xl border border-white/10 bg-[#0b0e14] p-7 overflow-hidden transition-colors hover:border-white/20"
          >
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, ${accent}, transparent)`,
              }}
            />

            {/* Number label */}
            <div className="text-[11px] font-mono tracking-[0.18em] text-white/30 mb-5">
              {num}
            </div>

            {/* Icon */}
            <div className="mb-5 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
              <Icon size={20} className="text-white/80" />
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-white leading-snug">
              {t(`features.${key}.title`)}
            </h3>

            {/* Body */}
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              {t(`features.${key}.body`)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
