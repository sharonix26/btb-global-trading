"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactPageClient() {
  const t = useTranslations("contact");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO (image + overlays + centered copy) */}
      <section className="relative min-h-[72vh] md:min-h-[78vh] overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/contact-hero.png"
          alt="City skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Brand wash */}
        <div
          className="absolute inset-0 opacity-55"
          style={{
            background:
              "radial-gradient(circle at 25% 30%, rgba(34,211,238,0.20), transparent 55%)," +
              "radial-gradient(circle at 75% 30%, rgba(168,85,247,0.16), transparent 55%)," +
              "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.88))",
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mx-auto max-w-4xl text-center"
            >
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
                {t("hero.title")}
              </h1>

              <p className="mt-4 text-base md:text-lg text-white/70">
                {t("hero.subtitle")}
              </p>

              <div className="mt-8 space-y-5 text-white/70 text-sm md:text-base leading-relaxed">
                <p>{t("hero.body1")}</p>
                <p>{t("hero.body2")}</p>
                <p>{t("hero.body3")}</p>
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/services"
                  className="group relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-black overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1))",
                      backgroundSize: "200% 200%",
                      animation: "btb-gradient-move 7s ease infinite",
                    }}
                  />
                  <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-white/10" />
                  <span className="relative z-10">{t("hero.cta")}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* bottom fade into black so section transition is smooth */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* GET IN TOUCH */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t("touch.title")}
            </h2>
            <p className="mt-3 text-white/65">{t("touch.subtitle")}</p>
          </motion.div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12 items-start">
            {/* LEFT: CONTACT DETAILS */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {t("touch.leftTitle")}
              </h3>

              <div className="space-y-4 text-white/75">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/55">
                      {t("touch.items.email.label")}
                    </div>
                    <a
                      className="hover:text-white transition"
                      href={`mailto:${t("touch.items.email.value")}`}
                    >
                      {t("touch.items.email.value")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/55">
                      {t("touch.items.phone1.label")}
                    </div>
                    <a
                      className="hover:text-white transition"
                      href={`tel:${t("touch.items.phone1.tel")}`}
                    >
                      {t("touch.items.phone1.value")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/55">
                      {t("touch.items.office.label")}
                    </div>
                    <div>{t("touch.items.office.value")}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/55">
                      {t("touch.items.whatsapp.label")}
                    </div>
                    <a
                      className="hover:text-white transition"
                      href={t("touch.items.whatsapp.href")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("touch.items.whatsapp.value")}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: FORM (UI-only) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="relative"
            >
              {/* glow behind card */}
              <div
                className="pointer-events-none absolute -inset-10 opacity-45 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 45% 40%, rgba(34,211,238,0.18), transparent 60%)," +
                    "radial-gradient(circle at 80% 35%, rgba(168,85,247,0.14), transparent 60%)",
                }}
              />

              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8">
                <h3 className="text-xl font-semibold text-white">
                  {t("form.title")}
                </h3>

                <form className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs text-white/60">
                      {t("form.fields.name")}
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-cyan-400/40"
                      placeholder={t("form.placeholders.name")}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/60">
                      {t("form.fields.email")}
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-cyan-400/40"
                      placeholder={t("form.placeholders.email")}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/60">
                      {t("form.fields.subject")}
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-cyan-400/40"
                      placeholder={t("form.placeholders.subject")}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/60">
                      {t("form.fields.message")}
                    </label>
                    <textarea
                      className="mt-2 min-h-[130px] w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-cyan-400/40"
                      placeholder={t("form.placeholders.message")}
                    />
                  </div>

                  <button
                    type="button"
                    className="group relative w-full rounded-xl px-4 py-3 text-sm font-medium text-black overflow-hidden"
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1))",
                        backgroundSize: "200% 200%",
                        animation: "btb-gradient-move 7s ease infinite",
                      }}
                    />
                    <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-white/10" />
                    <span className="relative z-10">{t("form.submit")}</span>
                  </button>

                  <p className="pt-2 text-[11px] text-white/45 leading-relaxed">
                    {t("form.disclaimer")}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* keyframes for the animated gradient */}
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
    </main>
  );
}
