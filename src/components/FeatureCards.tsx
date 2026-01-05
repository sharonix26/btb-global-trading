"use client";

import { motion } from "framer-motion";
import { Globe, DollarSign, Ship } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 }
  }
};

function Card({
  icon,
  title,
  body,
  glow
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  glow: string;
}) {
  return (
    <motion.div
      variants={reveal}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative"
    >
      {/* AMBIENT GLOW BEHIND CARD */}
      <div
        className="
          pointer-events-none absolute inset-0
          rounded-2xl
          opacity-0
          blur-2xl
          transition-opacity duration-300
          group-hover:opacity-100
        "
        style={{
          background: glow
        }}
      />

      {/* CARD */}
      <div
        className="
          relative z-10
          rounded-2xl
          border border-white/10
          bg-[#0b0e14]/80
          backdrop-blur
          p-8
          transition-shadow duration-300
          shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]
          group-hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,1)]
        "
      >
        <div className="flex justify-center mb-6">{icon}</div>

        <h3 className="text-xl font-semibold text-white text-center">
          {title}
        </h3>

        <p className="mt-4 text-white/70 text-center leading-relaxed">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeatureCards() {
  const t = useTranslations("home");

  return (
    <section className="px-6 py-20 mx-auto max-w-6xl">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-6 md:grid-cols-3"
      >
        <Card
          icon={<Globe size={42} className="text-cyan-300" />}
          title={t("features.globalPayments.title")}
          body={t("features.globalPayments.body")}
          glow="radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)"
        />

        <Card
          icon={<DollarSign size={42} className="text-indigo-300" />}
          title={t("features.fxTreasury.title")}
          body={t("features.fxTreasury.body")}
          glow="radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)"
        />

        <Card
          icon={<Ship size={42} className="text-purple-300" />}
          title={t("features.tradeSupport.title")}
          body={t("features.tradeSupport.body")}
          glow="radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)"
        />
      </motion.div>
    </section>
  );
}
