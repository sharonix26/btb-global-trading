"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  key: "home" | "about" | "services" | "contact";
  href: string;
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const items: NavItem[] = useMemo(
    () => [
      { key: "home", href: "/" },
      { key: "about", href: "/about" },
      { key: "services", href: "/services" },
      { key: "contact", href: "/contact-us" },
    ],
    []
  );

  const withLocale = (href: NavItem["href"]) =>
    href === "/" ? `/${locale}` : `/${locale}${href}`;

  const isActive = (href: NavItem["href"]) => {
    const full = withLocale(href);
    if (href === "/") return pathname === `/${locale}` || pathname === full;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const dir =
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("dir") || "ltr"
      : "ltr";

  const drawerFrom: "left" | "right" = dir.toLowerCase() === "rtl" ? "left" : "right";
  const drawerHiddenX = drawerFrom === "right" ? "100%" : "-100%";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-[60]">
      <div
        className={[
          "relative transition-all duration-300",
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent backdrop-blur-md border-b border-white/[0.06]",
        ].join(" ")}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center shrink-0">
              <Image
                src="/images/logo.jpeg"
                alt="BTB Global Payment Solutions"
                width={100}
                height={100}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={withLocale(item.href)}
                    className={[
                      "relative rounded-md px-3.5 py-2 text-sm transition-colors",
                      active ? "text-white" : "text-white/55 hover:text-white/90",
                    ].join(" ")}
                  >
                    <span className="relative z-10">{t(item.key)}</span>
                    {active && (
                      <motion.span
                        layoutId="btb-active-indicator"
                        className="absolute inset-0 rounded-md bg-white/8"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/contact-us`}
                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold text-black tracking-wide transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(197,146,42,1), rgba(21,45,86,1))",
                }}
              >
                {t("contactSales")}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:text-white transition"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              type="button"
            >
              <Menu size={17} />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[998] bg-black/75 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.aside
              id="mobile-drawer"
              ref={panelRef}
              initial={{ x: drawerHiddenX }}
              animate={{ x: 0 }}
              exit={{ x: drawerHiddenX }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              className="fixed top-0 z-[999] h-dvh w-[85vw] max-w-xs bg-[#0a0a0a] border-l border-white/10"
              style={drawerFrom === "right" ? { right: 0 } : { left: 0 }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="text-sm font-semibold text-white">Menu</span>
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/70 hover:text-white transition"
                  aria-label="Close menu"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-4 py-5 flex flex-col gap-4">
                <nav className="flex flex-col gap-1">
                  {items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.key}
                        href={withLocale(item.href)}
                        onClick={close}
                        className={[
                          "rounded-xl px-4 py-3 text-sm transition",
                          active
                            ? "bg-white/10 text-white font-medium"
                            : "text-white/65 hover:bg-white/5 hover:text-white",
                        ].join(" ")}
                      >
                        {t(item.key)}
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  href={`/${locale}/contact-us`}
                  onClick={close}
                  className="flex items-center justify-center rounded-full py-2.5 text-sm font-semibold text-black tracking-wide"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(197,146,42,1), rgba(21,45,86,1))",
                  }}
                >
                  {t("contactSales")}
                </Link>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-xs text-white/45 uppercase tracking-widest">Language</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
