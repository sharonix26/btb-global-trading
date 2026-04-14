import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });

  const sections = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"] as const;

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-4 font-body">
          {t("pageLabel")}
        </div>
        <h1 className="font-display text-4xl font-light mb-3">{t("title")}</h1>
        <p className="text-white/45 text-sm mb-12 font-body">{t("updated")}</p>

        <div
          className="h-px w-full mb-12"
          style={{ background: "linear-gradient(90deg, rgba(200,169,106,0.35), transparent)" }}
        />

        <div className="space-y-10 text-white/65 leading-relaxed text-sm font-body">
          {sections.map((s) => (
            <section key={s}>
              <h2 className="font-display text-xl font-medium text-white mb-3">
                {t(`${s}.title` as Parameters<typeof t>[0])}
              </h2>
              <p>{t(`${s}.body` as Parameters<typeof t>[0])}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
