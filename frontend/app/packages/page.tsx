import { Metadata } from "next";
import { getPackages } from "@/lib/api";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { CalculatorTeaser } from "@/components/sections/CalculatorTeaser";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Ownership Packages | Sunset Group",
  description:
    "Hotel ownership packages for Sunset Kuakata Hotel & Resort: Platinum, Gold, Silver, and Bronze tiers with defined booking amounts and profit periods.",
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            Ownership Investment Tiers
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            Hotel Ownership Packages
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            Transparent pricing, booking schedules, and profit period days for Sunset Kuakata Hotel & Resort.
          </p>
        </div>
      </div>

      <PackagesSection packages={packages} />
      <CalculatorTeaser packages={packages} />
      <FinalCta />
    </div>
  );
}
