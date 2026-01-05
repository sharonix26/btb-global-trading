"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

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
  const pathname = usePathname();
  const locale = useLocale();

  function switchTo(nextLocale: string) {
    // pathname looks like: /en/about-us or /he/contact-us
    // replace only the first segment
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/"));
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
