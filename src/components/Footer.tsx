"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Linkedin, MapPin, Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const withLocale = (href: string) =>
    href === "/" ? `/${locale}` : `/${locale}${href}`;

  return (
    <footer className="relative mt-auto">
      {/* Gold gradient top line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,169,106,0.0) 10%, rgba(200,169,106,0.7) 40%, rgba(200,169,106,0.7) 60%, rgba(200,169,106,0.0) 90%, transparent)",
        }}
      />

      <div
        style={{
          background: "#071629",
          borderTop: "1px solid rgba(200,169,106,0.07)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-4">

            {/* Brand column */}
            <div className="md:col-span-1">
              <Image
                src="/images/logo.jpeg"
                alt="BTB Global Trading"
                width={110}
                height={110}
                className="h-14 w-auto object-contain mb-6"
              />

              <p className="text-sm text-white/42 max-w-[220px] leading-relaxed font-body">
                {t("description")}
              </p>

              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/35 font-body">
                  <MapPin size={12} style={{ color: "rgba(200,169,106,0.5)" }} />
                  {t("location")}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/35 font-body">
                  <Mail size={12} style={{ color: "rgba(200,169,106,0.5)" }} />
                  {t("email")}
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/company/btbpayments/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(200,169,106,0.07)",
                    border: "1px solid rgba(200,169,106,0.15)",
                    color: "rgba(200,169,106,0.7)",
                  }}
                >
                  <Linkedin size={15} />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4
                className="text-[10px] font-body font-semibold tracking-[0.22em] uppercase mb-5"
                style={{ color: "#C8A96A" }}
              >
                {t("company")}
              </h4>
              <ul className="space-y-3">
                {[
                  { key: "links.home",     href: "/" },
                  { key: "links.about",    href: "/about" },
                  { key: "links.services", href: "/services" },
                  { key: "links.contact",  href: "/contact-us" },
                ].map(({ key, href }) => (
                  <li key={key}>
                    <Link
                      href={withLocale(href)}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-body"
                    >
                      {t(key as Parameters<typeof t>[0])}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-[10px] font-body font-semibold tracking-[0.22em] uppercase mb-5"
                style={{ color: "#C8A96A" }}
              >
                {t("services")}
              </h4>
              <ul className="space-y-3">
                <li className="text-sm text-white/45 font-body">{t("serviceItems.globalSettlements")}</li>
                <li className="text-sm text-white/45 font-body">{t("serviceItems.fxTreasury")}</li>
                <li className="text-sm text-white/45 font-body">{t("serviceItems.tradeSupport")}</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4
                className="text-[10px] font-body font-semibold tracking-[0.22em] uppercase mb-5"
                style={{ color: "#C8A96A" }}
              >
                {t("legal")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href={withLocale("/privacy")} className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-body">
                    {t("legalLinks.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href={withLocale("/terms")} className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-body">
                    {t("legalLinks.terms")}
                  </Link>
                </li>
                <li>
                  <Link href={withLocale("/legal")} className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-body">
                    {t("legalLinks.legalNotice")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom divider + copyright */}
          <div
            className="mt-12 pt-6"
            style={{ borderTop: "1px solid rgba(200,169,106,0.08)" }}
          >
            <p className="text-center text-[11px] text-white/25 font-body tracking-wide">
              © {new Date().getFullYear()} {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
