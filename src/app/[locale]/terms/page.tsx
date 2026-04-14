import { setRequestLocale } from "next-intl/server";
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

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-4">Legal</div>
        <h1 className="text-4xl font-semibold mb-3">Terms of Use</h1>
        <p className="text-white/55 text-sm mb-12">Last updated: April 2026</p>

        <div className="space-y-8 text-white/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the BTB Global Trading website (btbpayments.com) you
              agree to be bound by these Terms of Use. If you do not agree, please do not
              use this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Nature of Services</h2>
            <p>
              BTB Global Trading provides coordination and support services for international
              settlements, FX execution, and trade-payment operations. BTB does not itself
              hold a payment institution licence. Regulated financial activities are carried
              out exclusively through licensed financial partners. Nothing on this website
              constitutes financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Use of Website</h2>
            <p>
              You may use this website only for lawful purposes and in accordance with these
              Terms. You agree not to use the site in any way that violates applicable law,
              transmits unsolicited communications, or interferes with its operation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and design —
              is the property of BTB Global Trading or its licensors and is protected by
              applicable intellectual property laws. You may not reproduce, distribute, or
              create derivative works without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Disclaimer of Warranties</h2>
            <p>
              This website and its content are provided &ldquo;as is&rdquo; without warranties of any
              kind, express or implied. BTB Global Trading does not warrant that the website
              will be error-free, uninterrupted, or free of harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, BTB Global Trading shall not be liable
              for any indirect, incidental, special, or consequential damages arising from
              your use of this website or reliance on its content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites. BTB Global Trading has
              no control over and assumes no responsibility for the content or practices of
              any third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Poland. Any disputes shall be subject
              to the exclusive jurisdiction of the courts of Warsaw, Poland.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              For questions about these Terms contact: info@btbpayments.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
