"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Variants } from "framer-motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 240, damping: 22 }
  }
};

export default function AboutSection() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-20 mx-auto max-w-6xl">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="
          relative overflow-hidden rounded-3xl
          border border-white/10
          bg-white/5 backdrop-blur-md
          p-10 md:p-12
        "
      >
        {/* subtle background glow (behind content) */}
        <div
          className="pointer-events-none absolute -inset-16 opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(34,211,238,0.12), transparent 60%)," +
              "radial-gradient(circle at 80% 40%, rgba(168,85,247,0.10), transparent 60%)," +
              "radial-gradient(circle at 55% 80%, rgba(99,102,241,0.08), transparent 60%)"
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            {t("aboutSection.title")}
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-white/75">
            {t("aboutSection.body")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
