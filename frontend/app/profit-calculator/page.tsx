import { Metadata } from "next";
import { getPackages, getCalculatorConfig } from "@/lib/api";
import { ProfitCalculatorClient } from "@/components/calculator/ProfitCalculatorClient";

export const metadata: Metadata = {
  title: "Profit Calculator | Sunset Group",
  description:
    "Calculate package pricing, booking money, remaining balance, and accommodation days for Sunset Kuakata Hotel & Resort ownership packages.",
};

interface ProfitCalculatorPageProps {
  searchParams: Promise<{ package?: string }>;
}

export default async function ProfitCalculatorPage({
  searchParams,
}: ProfitCalculatorPageProps) {
  const { package: packageSlug } = await searchParams;
  const [packages, config] = await Promise.all([
    getPackages(),
    getCalculatorConfig(),
  ]);

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            Transparent Financial Framework
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            Profit & Ownership Calculator
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            Select an ownership package to review total price, initial booking money, remaining balance, and accommodation days.
          </p>
        </div>

        <ProfitCalculatorClient
          packages={packages}
          config={config}
          initialPackageSlug={packageSlug}
        />
      </div>
    </div>
  );
}
