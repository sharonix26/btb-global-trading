"use client";

import { useTranslations } from "next-intl";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative mt-auto">
      {/* Top animated accent line (same vibe as navbar hover line) */}
      <div className="h-[2px] w-full opacity-80">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(34,211,238,0), rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1), rgba(34,211,238,1), rgba(34,211,238,0))",
            backgroundSize: "200% 200%",
            animation: "btb-gradient-move 7s ease infinite"
          }}
        />
      </div>

      {/* Glass footer body */}
      <div className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
        {/* subtle haze */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-50 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, rgba(99,102,241,0.18), transparent 55%)," +
              "radial-gradient(circle at 80% 10%, rgba(34,211,238,0.14), transparent 55%)," +
              "radial-gradient(circle at 50% 80%, rgba(168,85,247,0.10), transparent 55%)"
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute -inset-[7px] rounded-2xl opacity-70 blur-md"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.20), transparent 60%)," +
                        "radial-gradient(circle at 70% 70%, rgba(168,85,247,0.16), transparent 60%)"
                    }}
                  />
                  <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white">
                    BTB
                  </div>
                </div>

                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-tight text-white">
                    BTB Global Trading
                  </div>
                  <div className="text-[11px] text-white/55">
                    Cross-border payments & FX execution
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-white/60 max-w-xs">
                {t("description")}
              </p>

              <div className="mt-5 flex gap-4 text-white/60">
                <a href="#" aria-label="Twitter" className="hover:text-white transition">
                  <Twitter size={18} />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white transition">
                  <Linkedin size={18} />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition">
                  <Instagram size={18} />
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-white transition">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white">{t("company")}</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>
                  <Link className="hover:text-white transition" href="/">
                    {t("links.home")}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/about">
                    {t("links.about")}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/contact-us">
                    {t("links.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-white">{t("services")}</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>{t("serviceItems.globalPayments")}</li>
                <li>{t("serviceItems.fxTreasury")}</li>
                <li>{t("serviceItems.tradeSupport")}</li>
              </ul>
            </div>
          </div>

          <div className="my-10 h-px bg-white/10" />

          <p className="text-center text-xs text-white/50">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
