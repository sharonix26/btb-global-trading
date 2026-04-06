"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Linkedin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const withLocale = (href: string) => (href === "/" ? `/${locale}` : `/${locale}${href}`);

  return (
    <footer className="relative mt-auto">
      {/* Top gradient accent line */}
      <div className="h-px w-full">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(197,146,42,0), rgba(197,146,42,0.6), rgba(12,31,63,0.6), rgba(21,45,86,0.6), rgba(197,146,42,0))",
          }}
        />
      </div>

      <div className="border-t border-white/[0.06] bg-black">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center">
                <Image
                  src="/images/logo.jpeg"
                  alt="BTB Global Payment Solutions"
                  width={120}
                  height={120}
                  className="h-16 w-auto object-contain"
                />
              </div>

              <p className="mt-5 text-sm text-white/55 max-w-xs leading-relaxed">
                {t("description")}
              </p>

              <div className="mt-5 flex gap-3 text-white/45">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-white transition"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                {t("company")}
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                <li>
                  <Link className="hover:text-white transition" href={withLocale("/")}>
                    {t("links.home")}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href={withLocale("/about")}>
                    {t("links.about")}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href={withLocale("/services")}>
                    {t("links.services")}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href={withLocale("/contact-us")}>
                    {t("links.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                {t("services")}
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                <li>{t("serviceItems.globalPayments")}</li>
                <li>{t("serviceItems.fxTreasury")}</li>
                <li>{t("serviceItems.tradeSupport")}</li>
              </ul>
            </div>
          </div>

          <div className="my-10 h-px bg-white/[0.08]" />

          <p className="text-center text-xs text-white/35">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
