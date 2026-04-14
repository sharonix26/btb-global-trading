import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  const sections = [
    { key: "s1", body: t("s1.body") },
    { key: "s2", body: t("s2.body") },
    { key: "s3", list: [t("s3.i0"), t("s3.i1"), t("s3.i2"), t("s3.i3")], intro: t("s3.intro") },
    { key: "s4", body: t("s4.body") },
    { key: "s5", body: t("s5.body") },
    { key: "s6", body: t("s6.body") },
    { key: "s7", body: t("s7.body") },
    { key: "s8", body: t("s8.body") },
    { key: "s9", body: t("s9.body") },
  ] as const;

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
            <section key={s.key}>
              <h2 className="font-display text-xl font-medium text-white mb-3">
                {t(`${s.key}.title` as Parameters<typeof t>[0])}
              </h2>
              {"list" in s ? (
                <>
                  <p className="mb-2">{s.intro}</p>
                  <ul className="list-none space-y-1.5 mt-2">
                    {s.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 shrink-0 h-1 w-1 rounded-full"
                          style={{ background: "rgba(200,169,106,0.6)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>{s.body}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
