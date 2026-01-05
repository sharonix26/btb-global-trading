"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Menu, X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";
import {Link, usePathname} from "@/i18n/navigation";

type NavKey = "home" | "about" | "services" | "contact";
type NavHref = "/" | "/about" | "/services" | "/contact-us";

type NavItem = {
  key: NavKey;
  href: NavHref;
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [drawerFrom, setDrawerFrom] = useState<"left" | "right">("right");
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ✅ Keys match your JSON: nav.home / nav.about / nav.services / nav.contact
  const items: NavItem[] = useMemo(
    () => [
      {key: "home", href: "/"},
      {key: "about", href: "/about"},
      {key: "services", href: "/services"},
      {key: "contact", href: "/contact-us"}
    ],
    []
  );

  // ✅ Active detection (pathname is locale-aware with createNavigation)
  const isActive = (href: NavHref) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // decide drawer side by dir
  useEffect(() => {
    const dir = document.documentElement.getAttribute("dir") || "ltr";
    setDrawerFrom(dir.toLowerCase() === "rtl" ? "left" : "right");
  }, [locale]);

  // lock body scroll when open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  // Esc closes drawer
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // click outside closes drawer
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (!panel.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  const drawerHiddenX = drawerFrom === "right" ? "100%" : "-100%";

  return (
    <header className="sticky top-0 z-50">
      <div
        className="
          group relative
          bg-transparent
          supports-[backdrop-filter]:bg-black/35
          backdrop-blur-md
          border-b border-white/10
        "
      >
        {/* Hover line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-90">
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

        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* ✅ Brand: always stays in current locale */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white">
                  BTB
                </div>
                <div
                  className="pointer-events-none absolute -inset-[1px] rounded-xl opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(168,85,247,0.18), rgba(99,102,241,0.16))"
                  }}
                />
              </div>

              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-white">
                  BTB Global Trading
                </div>
                <div className="hidden sm:block text-[11px] text-white/55">
                  Cross-border payments & FX execution
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={[
                      "relative rounded-full px-4 py-2 text-sm transition",
                      active ? "text-white" : "text-white/70 hover:text-white"
                    ].join(" ")}
                  >
                    <span
                      className="absolute inset-0 rounded-full opacity-0 transition hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.10), transparent 55%)," +
                          "radial-gradient(circle at 70% 70%, rgba(168,85,247,0.08), transparent 55%)"
                      }}
                    />

                    <span className="relative z-10">{t(item.key)}</span>

                    {active && (
                      <motion.span
                        layoutId="btb-active-underline"
                        className="absolute left-4 right-4 -bottom-[2px] h-[2px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1))",
                          backgroundSize: "200% 200%",
                          animation: "btb-gradient-move 7s ease infinite"
                        }}
                        transition={{type: "spring", stiffness: 420, damping: 32}}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right */}
            <div className="hidden md:flex items-center">
              <LanguageSwitcher />
            </div>

            {/* Mobile button */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              type="button"
            >
              <Menu size={18} />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.15}}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              id="mobile-drawer"
              ref={panelRef}
              initial={{x: drawerHiddenX}}
              animate={{x: 0}}
              exit={{x: drawerHiddenX}}
              transition={{type: "spring", stiffness: 380, damping: 36}}
              className="fixed top-0 z-50 h-dvh w-[88vw] max-w-sm border-l border-white/10 bg-black/90 backdrop-blur-xl"
              style={drawerFrom === "right" ? {right: 0} : {left: 0}}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="border-b border-white/10">
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="text-white font-semibold">Menu</div>
                  <button
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white"
                    aria-label="Close menu"
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div
                  className="h-[2px] w-full opacity-80"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(34,211,238,0), rgba(34,211,238,1), rgba(168,85,247,1), rgba(99,102,241,1), rgba(34,211,238,1), rgba(34,211,238,0))",
                    backgroundSize: "200% 200%",
                    animation: "btb-gradient-move 7s ease infinite"
                  }}
                />
              </div>

              <div className="px-5 py-5 flex flex-col gap-5">
                <nav className="flex flex-col gap-2">
                  {items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        className={[
                          "rounded-2xl px-4 py-3 text-sm transition border",
                          active
                            ? "border-white/20 bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                        ].join(" ")}
                      >
                        {t(item.key)}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-xs text-white/60">Language</span>
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
