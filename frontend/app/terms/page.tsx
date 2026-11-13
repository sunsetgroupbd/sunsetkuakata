import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sunset Group",
  description: "Terms and conditions of website use and investment engagement with Sunset Group.",
};

export default function TermsPage() {
  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-serif text-4xl text-ink">Terms & Conditions</h1>
        <div className="prose max-w-none text-grey-700 space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to the corporate website of Sunset Group (sunsetgroupbd.com), operated by Sunset Kuakata Hotel & Resort Limited, a private limited company registered and governed by the Company Act 1994.
          </p>
          <h2 className="font-serif text-xl text-ink">1. Nature of Content</h2>
          <p>
            The content provided on this website is for informational purposes describing our real asset developments, ownership packages, and corporate framework. Nothing on this website constitutes a promise of guaranteed returns or risk-free financial outcomes.
          </p>
          <h2 className="font-serif text-xl text-ink">2. Ownership and Formal Contracts</h2>
          <p>
            Formal ownership and partnership deeds (including saf-kabala registration where applicable) are executed individually under verified legal documentation. Online calculators and figures provide illustrative structures only.
          </p>
          <h2 className="font-serif text-xl text-ink">3. Intellectual Property</h2>
          <p>
            All trademarks, logos, texts, architectural designs, and imagery presented on this platform are the property of Sunset Kuakata Hotel & Resort Limited.
          </p>
        </div>
      </div>
    </div>
  );
}

