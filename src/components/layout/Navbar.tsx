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
      { key: "services", href: "/services" },
      { key: "about", href: "/about" },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      {/* Thin gold accent line at very top */}
      <div
        className="h-px w-full transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.5), rgba(200,169,106,0.8), rgba(200,169,106,0.5), transparent)",
          opacity: scrolled ? 1 : 0.6,
        }}
      />

      <div
        className="relative transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(7,22,41,0.92)"
            : "rgba(11,31,58,0.15)",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "blur(8px)",
          borderBottom: scrolled
            ? "1px solid rgba(200,169,106,0.10)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <Container>
          <div className="flex h-[68px] items-center justify-between gap-4">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center shrink-0 group">
              <Image
                src="/images/logo.jpeg"
                alt="BTB Global Trading"
                width={100}
                height={100}
                className="h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={withLocale(item.href)}
                    className="relative px-4 py-2 text-[13px] font-body font-medium tracking-wide transition-colors duration-200 group"
                    style={{
                      color: active ? "#C8A96A" : "rgba(255,255,255,0.6)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
                      {t(item.key)}
                    </span>
                    {/* Gold underline for active */}
                    {active && (
                      <motion.span
                        layoutId="btb-nav-active"
                        className="absolute inset-x-4 bottom-0 h-px"
                        style={{ background: "linear-gradient(90deg, transparent, #C8A96A, transparent)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Hover underline */}
                    <span
                      className="absolute inset-x-4 bottom-0 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-200"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.6), transparent)" }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/contact-us`}
                className="btn-gold text-[12px] px-5 py-2.5"
              >
                {t("bookACall")}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/70 hover:text-white transition border border-white/10 bg-white/5"
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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[998] bg-[#071629]/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.aside
              id="mobile-drawer"
              ref={panelRef}
              initial={{ x: drawerHiddenX }}
              animate={{ x: 0 }}
              exit={{ x: drawerHiddenX }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="fixed top-0 z-[999] h-dvh w-[82vw] max-w-[300px]"
              style={{
                ...(drawerFrom === "right" ? { right: 0 } : { left: 0 }),
                background: "#071629",
                borderLeft: "1px solid rgba(200,169,106,0.12)",
              }}
              role="dialog"
              aria-modal="true"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(200,169,106,0.10)" }}
              >
                <Image
                  src="/images/logo.jpeg"
                  alt="BTB Global Trading"
                  width={80}
                  height={80}
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/60 hover:text-white transition"
                  aria-label="Close menu"
                  type="button"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="px-4 py-6 flex flex-col gap-5">
                <nav className="flex flex-col gap-0.5">
                  {items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.key}
                        href={withLocale(item.href)}
                        onClick={close}
                        className="relative rounded-xl px-4 py-3 text-sm font-body font-medium tracking-wide transition-all duration-200"
                        style={{
                          color: active ? "#C8A96A" : "rgba(255,255,255,0.65)",
                          background: active ? "rgba(200,169,106,0.06)" : "transparent",
                          borderLeft: active ? "2px solid rgba(200,169,106,0.5)" : "2px solid transparent",
                        }}
                      >
                        {t(item.key)}
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  href={`/${locale}/contact-us`}
                  onClick={close}
                  className="btn-gold w-full justify-center"
                >
                  {t("bookACall")}
                </Link>

                <div
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span className="text-[10px] text-white/35 uppercase tracking-widest font-body">Language</span>
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
