import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sunset Group",
  description: "Privacy policy and data governance practices of Sunset Kuakata Hotel & Resort Limited.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-serif text-4xl text-ink">Privacy Policy</h1>
        <div className="prose max-w-none text-grey-700 space-y-6 text-sm leading-relaxed">
          <p>
            Sunset Kuakata Hotel & Resort Limited (&ldquo;Sunset Group&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy outlines how we handle personal data collected through our corporate website (sunsetgroupbd.com).
          </p>
          <h2 className="font-serif text-xl text-ink">1. Information We Collect</h2>
          <p>
            We collect personal details that you voluntarily submit via our inquiry and contact forms, including your full name, Bangladeshi phone number, email address, and project/package preferences.
          </p>
          <h2 className="font-serif text-xl text-ink">2. Use of Information</h2>
          <p>
            Submitted information is solely utilized to respond to your ownership inquiries, provide certified corporate project documentation, and facilitate consultation regarding our hospitality and healthcare assets.
          </p>
          <h2 className="font-serif text-xl text-ink">3. Data Security & Governance</h2>
          <p>
            In compliance with Company Act 1994 governance, client inquiries and ownership registers are held under strict confidentiality. We do not sell or distribute personal information to third parties.
          </p>
          <h2 className="font-serif text-xl text-ink">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding your personal information, please contact us at 27 Shaptak Square, Level-11, Old Dhanmondi 27, Dhaka-1209 or call +8801325074535.
          </p>
        </div>
      </div>
    </div>
  );
}

