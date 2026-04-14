"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MessageCircle, Linkedin } from "lucide-react";

const reveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPageClient() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      country: String(fd.get("country") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
      locale,
      page: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send");
      }
      setStatus("sent");
      form.reset();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[56vh] md:min-h-[62vh] overflow-hidden">
        <Image
          src="/images/contact-hero.png"
          alt="Contact BTB Global Trading"
          fill priority sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#0B1F3A]/65" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 25% 35%, rgba(200,169,106,0.12), transparent 60%)," +
              "linear-gradient(to bottom, rgba(7,22,41,0.05), rgba(7,22,41,0.88))",
          }}
        />

        <div className="relative z-10 px-6 pt-24 pb-14 md:pt-32 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-2xl"
            >
              <motion.div variants={reveal}>
                <span className="section-label">Contact</span>
              </motion.div>
              <motion.div
                variants={reveal}
                className="h-px w-10 my-4"
                style={{ background: "linear-gradient(90deg, #C8A96A, transparent)" }}
              />
              <motion.h1
                variants={reveal}
                className="font-display text-5xl md:text-7xl font-light tracking-tight leading-tight"
              >
                {t("hero.title")}
              </motion.h1>
              <motion.p
                variants={reveal}
                className="mt-5 text-base md:text-lg text-white/55 leading-relaxed font-body font-light"
              >
                {t("hero.subtitle")}
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0B1F3A]" />
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-5 md:gap-16 items-start">

            {/* LEFT — Contact info + inquiry guide (2/5) */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="md:col-span-2 space-y-8"
            >
              <motion.div variants={reveal}>
                <h2 className="font-display text-3xl md:text-4xl font-light mb-1">
                  {t("touch.title")}
                </h2>
                <div className="gold-line" />
              </motion.div>

              {/* Contact items */}
              <motion.div variants={stagger} className="space-y-5">
                {(["email", "phone1", "whatsapp", "linkedin"] as const).map((item) => {
                  const icon = {
                    email:    <Mail size={16} style={{ color: "#C8A96A" }} />,
                    phone1:   <Phone size={16} style={{ color: "#C8A96A" }} />,
                    whatsapp: <MessageCircle size={16} style={{ color: "#C8A96A" }} />,
                    linkedin: <Linkedin size={16} style={{ color: "#C8A96A" }} />,
                  }[item];

                  const href = item === "email"
                    ? `mailto:${t(`touch.items.${item}.value`)}`
                    : item === "phone1"
                    ? `tel:${t("touch.items.phone1.tel")}`
                    : t(`touch.items.${item}.href` as Parameters<typeof t>[0]);

                  const isExternal = item === "whatsapp" || item === "linkedin";

                  return (
                    <motion.div
                      key={item}
                      variants={reveal}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="mt-0.5 flex items-center justify-center rounded-lg p-2 shrink-0"
                        style={{
                          background: "rgba(200,169,106,0.07)",
                          border: "1px solid rgba(200,169,106,0.15)",
                        }}
                      >
                        {icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-white/40 mb-0.5">
                          {t(`touch.items.${item}.label`)}
                        </div>
                        <a
                          href={href as string}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="text-sm text-white/75 hover:text-white transition-colors font-body"
                        >
                          {t(`touch.items.${item}.value`)}
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Inquiry guide */}
              <motion.div
                variants={reveal}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(13,37,69,0.6)",
                  border: "1px solid rgba(200,169,106,0.10)",
                }}
              >
                <div className="text-[10px] font-body font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: "#C8A96A" }}>
                  {t("touch.inquiryGuide.title")}
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {(["markets", "currencies", "volume", "timeline"] as const).map((item) => (
                    <div
                      key={item}
                      className="rounded-xl px-4 py-3 text-sm text-white/60 font-body"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {t(`touch.inquiryGuide.${item}`)}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — Form (3/5) */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="md:col-span-3 relative"
            >
              <div
                className="pointer-events-none absolute -inset-10 opacity-25 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, rgba(200,169,106,0.12), transparent 65%)",
                }}
              />

              <div
                className="relative rounded-2xl p-8 md:p-10"
                style={{
                  background: "rgba(13,37,69,0.7)",
                  border: "1px solid rgba(200,169,106,0.10)",
                }}
              >
                {/* Decorative corner lines */}
                <div
                  className="absolute top-0 left-0 w-8 h-8"
                  style={{
                    borderTop: "1px solid rgba(200,169,106,0.35)",
                    borderLeft: "1px solid rgba(200,169,106,0.35)",
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-8 h-8"
                  style={{
                    borderBottom: "1px solid rgba(200,169,106,0.35)",
                    borderRight: "1px solid rgba(200,169,106,0.35)",
                  }}
                />

                <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-8">
                  {t("form.title")}
                </h3>

                <form className="space-y-4" onSubmit={onSubmit}>
                  {/* Honeypot */}
                  <input
                    type="text" name="website" tabIndex={-1} autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <LuxuryInput name="name" label={t("form.fields.name")} placeholder={t("form.placeholders.name")} required />
                    <LuxuryInput name="company" label={t("form.fields.company")} placeholder={t("form.placeholders.company")} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <LuxuryInput name="email" label={t("form.fields.email")} placeholder={t("form.placeholders.email")} type="email" required />
                    <LuxuryInput name="country" label={t("form.fields.country")} placeholder={t("form.placeholders.country")} />
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label className="block text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-white/45 mb-2">
                      {t("form.fields.service")}
                    </label>
                    <select
                      name="service"
                      className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-colors"
                      style={{
                        background: "rgba(7,22,41,0.7)",
                        border: "1px solid rgba(200,169,106,0.14)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <option value="">{t("form.selectService")}</option>
                      <option value="Global Settlements">{t("form.serviceOptions.globalSettlements")}</option>
                      <option value="FX & Treasury Coordination">{t("form.serviceOptions.fxTreasury")}</option>
                      <option value="Trade & Deal Support">{t("form.serviceOptions.tradeSupport")}</option>
                      <option value="Private International Case">{t("form.serviceOptions.privateCase")}</option>
                      <option value="General Inquiry">{t("form.serviceOptions.general")}</option>
                    </select>
                  </div>

                  <LuxuryTextarea name="message" label={t("form.fields.message")} placeholder={t("form.placeholders.message")} required />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-gold w-full justify-center py-3.5 disabled:opacity-60"
                  >
                    {status === "sending" ? t("form.sending") : t("form.submit")}
                  </button>

                  {status === "sent" && (
                    <p className="text-sm font-body" style={{ color: "#7dd3a8" }}>{t("form.sent")}</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm font-body text-red-300">
                      {errorMsg || t("form.error")}
                    </p>
                  )}

                  <p className="text-[11px] text-white/35 font-body leading-relaxed pt-1">
                    {t("form.disclaimer")}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Form field helpers ── */

function LuxuryInput({
  name, label, placeholder, required, type = "text",
}: {
  name: string; label: string; placeholder: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-white/45 mb-2">
        {label}
      </label>
      <input
        name={name} type={type} required={required}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200 placeholder:text-white/25"
        style={{
          background: "rgba(7,22,41,0.7)",
          border: "1px solid rgba(200,169,106,0.14)",
          color: "rgba(255,255,255,0.8)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(200,169,106,0.4)";
          e.target.style.boxShadow = "0 0 0 3px rgba(200,169,106,0.06)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(200,169,106,0.14)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function LuxuryTextarea({
  name, label, placeholder, required,
}: {
  name: string; label: string; placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-white/45 mb-2">
        {label}
      </label>
      <textarea
        name={name} required={required} placeholder={placeholder}
        className="w-full min-h-[120px] rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200 resize-none placeholder:text-white/25"
        style={{
          background: "rgba(7,22,41,0.7)",
          border: "1px solid rgba(200,169,106,0.14)",
          color: "rgba(255,255,255,0.8)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(200,169,106,0.4)";
          e.target.style.boxShadow = "0 0 0 3px rgba(200,169,106,0.06)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(200,169,106,0.14)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
