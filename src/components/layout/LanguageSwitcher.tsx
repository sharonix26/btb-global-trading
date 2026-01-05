"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";

type Lang = { code: string; label: string };

const LANGS: Lang[] = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
  { code: "he", label: "HE" },
  { code: "tr", label: "TR" },
  { code: "zh", label: "中文" }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // This is locale-free (e.g., "/about" not "/en/about")
  const locale = useLocale();

  function switchTo(nextLocale: string) {
    // pathname from @/i18n/navigation is locale-free (e.g., "/about" not "/en/about")
    // Construct the full path with the new locale
    const newPath = pathname === "/" ? `/${nextLocale}` : `/${nextLocale}${pathname}`;
    router.push(newPath);
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950 p-1">
      {LANGS.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            onClick={() => switchTo(l.code)}
            className={[
              "px-3 py-1 text-xs rounded-full transition",
              active
                ? "bg-white text-black"
                : "text-neutral-300 hover:text-white hover:bg-neutral-900"
            ].join(" ")}
            aria-pressed={active}
            type="button"
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
