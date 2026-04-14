import { setRequestLocale } from "next-intl/server";
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

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-4">Legal</div>
        <h1 className="text-4xl font-semibold mb-3">Legal Notice</h1>
        <p className="text-white/55 text-sm mb-12">Last updated: April 2026</p>

        <div className="space-y-8 text-white/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Company Information</h2>
            <div className="space-y-1">
              <p><span className="text-white/50">Company name:</span> BTB Global Trading</p>
              <p><span className="text-white/50">Registered address:</span> Warsaw, Poland</p>
              <p><span className="text-white/50">Email:</span> info@btbpayments.com</p>
              <p><span className="text-white/50">Phone:</span> +972 58-515-5340</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Regulatory Status</h2>
            <p>
              BTB Global Trading provides coordination and support services for cross-border
              financial operations. BTB does not hold a payment institution licence or other
              regulated financial services licence. All regulated financial activities,
              including payment execution, FX transactions, and settlement operations, are
              carried out exclusively through licensed financial partner institutions where
              applicable. Onboarding, corridor review, and compliance checks may apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Website Responsibility</h2>
            <p>
              The information provided on this website is for general informational purposes
              only and does not constitute financial, legal, or investment advice. BTB Global
              Trading makes reasonable efforts to ensure the accuracy and timeliness of the
              information published but does not guarantee its completeness.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property</h2>
            <p>
              The content of this website, including texts, images, graphics, and logos,
              is protected by copyright and other intellectual property rights. Reproduction
              or distribution without prior written consent of BTB Global Trading is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Applicable Law</h2>
            <p>
              This website is operated in accordance with the laws of Poland and applicable
              EU regulations. Any disputes arising in connection with the use of this website
              shall be subject to the jurisdiction of the competent courts in Warsaw, Poland.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>
              For legal inquiries: info@btbpayments.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
