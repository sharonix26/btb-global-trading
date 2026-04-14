"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Vault, ChartLineUp, Anchor,
  Buildings, UsersThree, GlobeHemisphereWest, UserCircle,
  MagnifyingGlass, MapTrifold, Certificate, Rocket,
  Eye, Users, Compass, Layout,
} from "@phosphor-icons/react";
import SectionDivider from "@/components/SectionDivider";

/* ── Motion variants ── */
const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(5px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ── Floating dot (decorative) ── */
function Dot({ size, top, left, delay }: { size: number; top: string; left: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size, top, left,
        background: "radial-gradient(circle, rgba(200,169,106,0.55), transparent 70%)",
        filter: "blur(1px)",
      }}
      animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  const TRUST = [
    t("trust.euBased"),
    t("trust.warsawHQ"),
    t("trust.licensedPartner"),
    t("trust.multiCurrency"),
  ];

  const SERVE = [
    { key: "importersExporters",   Icon: Buildings },
    { key: "cfosTreasury",         Icon: UsersThree },
    { key: "internationalOperators",Icon: GlobeHemisphereWest },
    { key: "privateInternational", Icon: UserCircle },
  ] as const;

  const STEPS = [
    { key: "review",           Icon: MagnifyingGlass },
    { key: "corridorMapping",  Icon: MapTrifold },
    { key: "partnerStructuring",Icon: Certificate },
    { key: "executionSupport", Icon: Rocket },
  ] as const;

  const WHY = [
    { key: "operationalClarity",     Icon: Eye      },
    { key: "directSupport",          Icon: Users    },
    { key: "crossBorderExpertise",   Icon: Compass  },
    { key: "structuredCoordination", Icon: Layout },
  ] as const;

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO  — large, atmospheric, floating dots
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[76vh] flex items-center overflow-hidden">
        <Image
          src="/images/home-hero.png"
          alt="BTB Global Trading"
          fill priority sizes="100vw"
          className="object-cover object-center"
          style={{ transform: "scale(1.06)", transformOrigin: "center" }}
        />
        <div className="absolute inset-0 bg-[#0B1F3A]/60" />
        {/* Gradient depth layers */}
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(ellipse 80% 60% at 8% 40%, rgba(200,169,106,0.09), transparent 55%)," +
            "radial-gradient(ellipse 55% 65% at 92% 18%, rgba(7,22,41,0.55), transparent 60%)," +
            "linear-gradient(to bottom, rgba(7,22,41,0.0) 0%, rgba(7,22,41,0.90) 100%)",
        }} />
        {/* Fine gold grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage:
            "linear-gradient(rgba(200,169,106,1) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(200,169,106,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }} />

        {/* Floating gold dots */}
        <Dot size={5}  top="20%" left="74%" delay={0}   />
        <Dot size={3}  top="58%" left="83%" delay={1.3} />
        <Dot size={7}  top="34%" left="89%" delay={2.1} />
        <Dot size={3}  top="68%" left="67%" delay={0.7} />

        {/* Large ghost lettermark */}
        <div
          className="absolute right-[-1%] top-1/2 -translate-y-1/2 font-display font-light leading-none select-none pointer-events-none hidden lg:block"
          style={{ fontSize: "22vw", color: "rgba(200,169,106,0.022)", letterSpacing: "-0.05em" }}
        >
          BTB
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-20 md:py-24 mx-auto max-w-7xl w-full">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl md:ml-12">

            {/* Label + thin rule */}
            <motion.div variants={reveal} className="flex items-center gap-3 mb-5">
              <span className="section-label">BTB Global Trading</span>
              <div className="h-px flex-1 max-w-[48px]" style={{ background: "linear-gradient(90deg, rgba(200,169,106,0.5), transparent)" }} />
            </motion.div>

            <motion.h1
              variants={reveal}
              className="font-display font-light tracking-tight leading-[1.10]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.2rem)" }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p variants={reveal} className="mt-5 text-sm md:text-base text-white/55 max-w-lg leading-relaxed font-body font-light">
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact-us`} className="btn-gold">
                {t("hero.bookACall")}
              </Link>
              <Link href={`/${locale}/services`} className="btn-ghost">
                {t("hero.seeServices")}
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-2">
              {TRUST.map((label) => (
                <span key={label} className="tag-gold">
                  <span className="h-1 w-1 rounded-full" style={{ background: "#C8A96A" }} />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#0B1F3A]" />
      </section>

      {/* ════════════════════════════════════════════════════════
          WHAT WE DO  — bento grid (featured + 2 stacked)
      ════════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-28 mx-auto max-w-7xl">
        <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.2 }} transition={{ duration:0.75, ease:EASE }} className="mb-14">
          <span className="section-label">{t("whatWeDo.sectionLabel")}</span>
          <div className="gold-line" />
        </motion.div>

        {/* Bento: left (featured, spans 2 rows) + right column (2 cards) */}
        <motion.div variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, amount:0.1 }}
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "auto",
          }}
        >
          {/* FEATURED — Global Settlements */}
          <motion.div variants={cardIn}
            className="card-luxury group relative row-span-2 p-9 md:p-11 flex flex-col justify-between min-h-[340px]"
            style={{ gridRow: "span 2" }}
          >
            {/* Gradient wash inside featured card */}
            <div className="absolute inset-0 opacity-40 rounded-[17px]" style={{
              background:
                "radial-gradient(ellipse 70% 60% at 15% 20%, rgba(200,169,106,0.12), transparent 60%)," +
                "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(7,22,41,0.6), transparent 60%)",
            }} />
            {/* Large ghost icon background */}
            <div className="absolute right-6 bottom-4 opacity-[0.04] pointer-events-none">
              <Vault size={200} weight="thin" />
            </div>

            <div className="relative z-10">
              <div className="font-body text-[10px] font-semibold tracking-[0.24em] uppercase mb-5"
                style={{ color: "rgba(200,169,106,0.6)" }}>01</div>
              <div className="icon-box-gold mb-6 w-fit">
                <Vault size={28} weight="thin" color="#C8A96A" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-white leading-snug mb-4">
                {t("whatWeDo.globalSettlements.title")}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed font-body max-w-sm">
                {t("whatWeDo.globalSettlements.body")}
              </p>
            </div>

            {/* Bottom accent pill */}
            <div className="relative z-10 mt-8">
              <span className="tag-gold text-xs">Settlement Infrastructure</span>
            </div>
          </motion.div>

          {/* FX & Treasury */}
          <motion.div variants={cardIn} className="card-luxury group relative p-7 flex flex-col justify-between">
            <div className="absolute right-4 bottom-2 opacity-[0.04] pointer-events-none">
              <ChartLineUp size={100} weight="thin" />
            </div>
            <div className="relative z-10">
              <div className="font-body text-[10px] font-semibold tracking-[0.24em] uppercase mb-4"
                style={{ color: "rgba(78,127,181,0.7)" }}>02</div>
              <div className="icon-box-blue mb-5 w-fit">
                <ChartLineUp size={24} weight="thin" color="#6eaadc" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-white leading-snug mb-3">
                {t("whatWeDo.fxTreasury.title")}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-body">
                {t("whatWeDo.fxTreasury.body")}
              </p>
            </div>
          </motion.div>

          {/* Trade & Deal */}
          <motion.div variants={cardIn} className="card-luxury group relative p-7 flex flex-col justify-between"
            style={{ borderColor: "rgba(78,127,181,0.10)" }}>
            <div className="absolute right-4 bottom-2 opacity-[0.04] pointer-events-none">
              <Anchor size={100} weight="thin" />
            </div>
            <div className="relative z-10">
              <div className="font-body text-[10px] font-semibold tracking-[0.24em] uppercase mb-4"
                style={{ color: "rgba(78,127,181,0.7)" }}>03</div>
              <div className="icon-box-blue mb-5 w-fit">
                <Anchor size={24} weight="thin" color="#6eaadc" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-white leading-snug mb-3">
                {t("whatWeDo.tradeDealSupport.title")}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-body">
                {t("whatWeDo.tradeDealSupport.body")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════
          WHO WE SERVE  — deeper bg, alternating layout
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-28" style={{ background: "#071629" }}>
        {/* Mesh */}
        <div className="absolute inset-0 mesh-blue pointer-events-none" />

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.2 }} transition={{ duration:0.75, ease:EASE }} className="mb-14">
            <span className="section-label">{t("whoWeServe.sectionLabel")}</span>
            <div className="gold-line" />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once:true, amount:0.1 }} className="grid gap-4 md:grid-cols-2">
            {SERVE.map(({ key, Icon }, idx) => (
              <motion.div key={key} variants={cardIn}
                className="relative group overflow-hidden rounded-[18px] p-8 flex gap-5 items-start"
                style={{
                  background: idx % 2 === 0
                    ? "linear-gradient(135deg, rgba(13,37,69,0.9), rgba(11,31,58,0.7))"
                    : "rgba(13,37,69,0.5)",
                  border: "1px solid rgba(200,169,106,0.10)",
                  transition: "border-color 0.35s, box-shadow 0.35s",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.3), transparent)" }} />
                {/* Ghost number */}
                <div className="absolute bottom-3 right-5 font-display text-5xl font-light pointer-events-none select-none"
                  style={{ color: "rgba(200,169,106,0.05)" }}>
                  0{idx + 1}
                </div>

                <div className="shrink-0 icon-box-gold">
                  <Icon size={24} weight="thin" color="#C8A96A" />
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-white mb-2 leading-snug">
                    {t(`whoWeServe.${key}.title`)}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed font-body">
                    {t(`whoWeServe.${key}.body`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS  — horizontal timeline
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-28" style={{ background: "#0B1F3A" }}>
        <div className="absolute inset-0 mesh-center pointer-events-none" />

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.2 }} transition={{ duration:0.75, ease:EASE }} className="mb-16">
            <span className="section-label">{t("howItWorks.sectionLabel")}</span>
            <div className="gold-line" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[52px] left-8 right-8 h-px hidden md:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.20), rgba(200,169,106,0.20), transparent)" }} />

            <motion.div variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once:true, amount:0.1 }} className="grid gap-5 md:grid-cols-4 md:gap-6">
              {STEPS.map(({ key, Icon }, idx) => (
                <motion.div key={key} variants={cardIn} className="relative group">
                  {/* Step circle with icon */}
                  <div className="relative z-10 mb-6 flex flex-col items-start md:items-center">
                    <div
                      className="flex items-center justify-center rounded-full w-[52px] h-[52px] mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, rgba(200,169,106,0.15), rgba(200,169,106,0.05))",
                        border: "1px solid rgba(200,169,106,0.30)",
                        boxShadow: "0 0 20px rgba(200,169,106,0.10)",
                      }}
                    >
                      <Icon size={22} weight="thin" color="#C8A96A" />
                    </div>
                    <div className="font-display text-xs font-light" style={{ color: "rgba(200,169,106,0.40)" }}>
                      0{idx + 1}
                    </div>
                  </div>

                  <div className="md:text-center">
                    <h3 className="font-display text-xl font-medium text-white mb-2">
                      {t(`howItWorks.${key}.title`)}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-body">
                      {t(`howItWorks.${key}.body`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════
          WHY BTB  — deep bg, spinning border on hover
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-28" style={{ background: "#071629" }}>
        <div className="absolute inset-0 mesh-gold pointer-events-none" />

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.2 }} transition={{ duration:0.75, ease:EASE }} className="mb-14">
            <span className="section-label">{t("whyBTB.sectionLabel")}</span>
            <div className="gold-line" />
            <h2 className="font-display text-5xl md:text-6xl font-light text-white mt-1 leading-tight">
              {t("whyBTB.title")}
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once:true, amount:0.1 }} className="grid gap-4 sm:grid-cols-2">
            {WHY.map(({ key, Icon }, idx) => (
              <motion.div key={key} variants={cardIn} className="spin-border-wrapper group">
                <div className="spin-border-inner p-8 flex items-start gap-5">
                  {/* Icon + number cluster */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="icon-box-gold">
                      <Icon size={22} weight="thin" color="#C8A96A" />
                    </div>
                    <span className="font-display text-xs font-light" style={{ color: "rgba(200,169,106,0.35)" }}>
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="pt-1">
                    <p className="font-display text-2xl md:text-3xl font-medium text-white leading-snug">
                      {t(`whyBTB.${key}`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider />
    </main>
  );
}
