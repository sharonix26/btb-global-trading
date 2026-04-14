import { setRequestLocale } from "next-intl/server";
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

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-[11px] tracking-[0.22em] text-white/40 uppercase mb-4">Legal</div>
        <h1 className="text-4xl font-semibold mb-3">Privacy Policy</h1>
        <p className="text-white/55 text-sm mb-12">Last updated: April 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Who We Are</h2>
            <p>
              BTB Global Trading is an EU-based company headquartered in Warsaw, Poland.
              We coordinate international settlements, FX execution, and trade-payment
              operations through licensed partners. Contact: info@btbpayments.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Data We Collect</h2>
            <p>
              When you use our contact form we collect: your name, company name, email
              address, country, the service category you selected, and your message.
              We also automatically collect standard server logs (IP address, browser
              type, pages visited) for security and analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Respond to your inquiry and provide the services you requested.</li>
              <li>Conduct compliance and onboarding checks as required by our licensed partners.</li>
              <li>Improve our website and services.</li>
              <li>Comply with applicable legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Legal Basis (GDPR)</h2>
            <p>
              Where EU GDPR applies, we process your data on the basis of: (a) your
              consent (form submission), (b) legitimate interests in operating our
              business, and (c) compliance with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share data with licensed financial
              partners involved in executing your requested service, and with service
              providers who assist us in operating this website (such as Google Workspace
              for lead logging). All processors are bound by data processing agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p>
              We retain your data for as long as necessary to fulfil the purposes described
              above, or as required by applicable law — typically up to 5 years for
              financial coordination records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              Under GDPR you have the right to access, rectify, erase, restrict, or
              port your data, and to object to processing. To exercise these rights
              contact us at info@btbpayments.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
            <p>
              This website may use essential cookies to ensure proper functionality.
              Analytics cookies, if active, are used to improve site performance.
              You may adjust cookie preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              For privacy-related questions contact: info@btbpayments.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
