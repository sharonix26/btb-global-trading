"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eye, Users, Compass, LayoutGrid } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const POINTS = [
  { key: "operationalClarity" as const, icon: Eye },
  { key: "directSupport"      as const, icon: Users },
  { key: "crossBorderExpertise" as const, icon: Compass },
  { key: "structuredCoordination" as const, icon: LayoutGrid },
];

export default function WhyChooseUs() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <span className="section-label">{t("whyBTB.sectionLabel")}</span>
          <div className="gold-line" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight mt-1">
            {t("whyBTB.title")}
          </h2>
        </motion.div>

        {/* 2 × 2 grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {POINTS.map(({ key, icon: Icon }, idx) => (
            <motion.div
              key={key}
              variants={item}
              className="card-luxury group flex items-start gap-5 p-8"
            >
              {/* Numbered icon cluster */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-xl p-3 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "rgba(200,169,106,0.08)",
                    border: "1px solid rgba(200,169,106,0.18)",
                  }}
                >
                  <Icon size={20} style={{ color: "#C8A96A" }} />
                </div>
                <span
                  className="font-display text-xs font-light"
                  style={{ color: "rgba(200,169,106,0.35)" }}
                >
                  0{idx + 1}
                </span>
              </div>

              {/* Text */}
              <div className="pt-1">
                <p className="font-display text-xl md:text-2xl font-medium text-white leading-snug">
                  {t(`whyBTB.${key}`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
