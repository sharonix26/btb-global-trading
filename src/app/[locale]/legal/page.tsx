import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legalNotice" });

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

          {/* Company Info */}
          <section>
            <h2 className="font-display text-xl font-medium text-white mb-4">
              {t("companyInfo.title")}
            </h2>
            <div className="space-y-1.5">
              {(["name", "address", "email", "phone"] as const).map((field) => {
                const values: Record<string, string> = {
                  name: "BTB Global Trading",
                  address: "Warsaw, Poland",
                  email: "info@btbpayments.com",
                  phone: "+972 58-515-5340",
                };
                return (
                  <p key={field}>
                    <span className="text-white/40">{t(`companyInfo.${field}`)}</span>{" "}
                    {values[field]}
                  </p>
                );
              })}
            </div>
          </section>

          {/* Regulatory Status */}
          <section>
            <h2 className="font-display text-xl font-medium text-white mb-3">
              {t("regulatory.title")}
            </h2>
            <p>{t("regulatory.body")}</p>
          </section>

          {/* Website Responsibility */}
          <section>
            <h2 className="font-display text-xl font-medium text-white mb-3">
              {t("websiteResp.title")}
            </h2>
            <p>{t("websiteResp.body")}</p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="font-display text-xl font-medium text-white mb-3">
              {t("ip.title")}
            </h2>
            <p>{t("ip.body")}</p>
          </section>

          {/* Applicable Law */}
          <section>
            <h2 className="font-display text-xl font-medium text-white mb-3">
              {t("law.title")}
            </h2>
            <p>{t("law.body")}</p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-display text-xl font-medium text-white mb-3">
              {t("contact.title")}
            </h2>
            <p>{t("contact.body")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
