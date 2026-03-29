"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Variants } from "framer-motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function AboutSection() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-20 mx-auto max-w-6xl">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-12 md:grid-cols-12 items-start"
      >
        {/* Left: label + headline */}
        <motion.div variants={reveal} className="md:col-span-5">
          <div className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-4">
            Who We Are
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
            {t("aboutSection.title")}
          </h2>
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-cyan-400/50 to-transparent" />
        </motion.div>

        {/* Right: body copy */}
        <motion.div variants={reveal} className="md:col-span-7">
          <p className="text-base md:text-lg leading-relaxed text-white/70">
            {t("aboutSection.body")}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
