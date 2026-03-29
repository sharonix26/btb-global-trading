"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const POINTS = [
  "euCompliance",
  "personalizedGuidance",
  "crossBorderExpertise",
  "fastSecureTransactions",
] as const;

const NUMS = ["01", "02", "03", "04"];

export default function WhyChooseUs() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-12"
        >
          <div className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-4">
            Why BTB
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            {t("whyChoose.title")}
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/55 max-w-xl">
            {t("whyChoose.subtitle")}
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {POINTS.map((key, idx) => (
            <motion.div
              key={key}
              variants={item}
              className="group relative rounded-2xl border border-white/10 bg-[#0b0e14] p-6 overflow-hidden hover:border-white/20 transition-colors"
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/40 via-indigo-400/30 to-transparent" />

              <div className="text-[11px] font-mono tracking-[0.18em] text-white/25 mb-4">
                {NUMS[idx]}
              </div>

              <p className="text-sm md:text-[15px] leading-relaxed text-white/80">
                {t(`whyChoose.points.${key}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
