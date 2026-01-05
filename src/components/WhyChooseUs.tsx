"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" }
  }
};

export default function WhyChooseUs() {
  const t = useTranslations("home");

  const points = [
    "euCompliance",
    "personalizedGuidance",
    "crossBorderExpertise",
    "fastSecureTransactions"
  ] as const;

  return (
    <section className="px-6 py-20 md:py-5">
      <div className="mx-auto max-w-6xl">
        {/* floating center block */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {t("whyChoose.title")}
          </h2>

          <p className="mt-3 text-sm md:text-base text-white/60">
            {t("whyChoose.subtitle")}
          </p>
        </motion.div>

        {/* list */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-10 mx-auto max-w-xl space-y-4"
        >
          {points.map((key) => (
            <motion.li
              key={key}
              variants={item}
              className="flex items-center gap-3 text-white/80"
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                {/* subtle glow behind icon */}
                <span
                  className="absolute inset-0 rounded-full blur-md opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(34,211,238,0.22), transparent 70%)"
                  }}
                />
                <CheckCircle2 className="relative z-10 h-5 w-5 text-cyan-300" />
              </span>

              <span className="text-sm md:text-base leading-relaxed">
                {t(`whyChoose.points.${key}`)}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
