"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package } from "@/lib/types";
import { useLanguage, formatCurrencyBDT } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calculator, ArrowRight } from "lucide-react";

interface CalculatorTeaserProps {
  packages: Package[];
}

export function CalculatorTeaser({ packages }: CalculatorTeaserProps) {
  const { locale, t, formatNumber } = useLanguage();
  const [selectedSlug, setSelectedSlug] = useState<string>(packages[0]?.slug || "platinum");

  const currentPkg = packages.find((p) => p.slug === selectedSlug) || packages[0];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-ink/10 bg-ash p-6 sm:p-12 lg:p-16 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Explanatory Copy (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-paper border border-ink/10 rounded-full text-xs font-medium text-green-900 shadow-xs">
                <Calculator className="w-3.5 h-3.5" />
                <span>{locale === "bn" ? "মুনাফা ও বিনিয়োগ ক্যালকুলেটর" : "Profit and Investment Calculator"}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight font-semibold">
                {locale === "bn"
                  ? "প্যাকেজ ভিত্তিক মূল্য ও বুকিং হিসাব জানুন"
                  : "Calculate Package Breakdown and Profit Period"}
              </h2>

              <p className="text-sm sm:text-base text-grey-700 leading-relaxed">
                {locale === "bn"
                  ? "প্রতিটি প্যাকেজের নির্ধারিত মূল্য, বুকিং মানি এবং মুনাফা বণ্টন সময়কাল স্বচ্ছভাবে দেখুন। কোনো অনুমানমূলক বা অলীক মুনাফার প্রতিশ্রুতি নয়—বাস্তব ব্যবসায়িক কাঠামো।"
                  : "Explore transparent pricing, booking requirements, and defined profit periods across ownership tiers. Illustrative projections are available on request."}
              </p>

              <div className="pt-2">
                <Button href={`/profit-calculator?package=${selectedSlug}`} variant="secondary" className="rounded-xl">
                  {locale === "bn" ? "পূর্ণাঙ্গ ক্যালকুলেটর খুলুন" : "Open Full Calculator"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right: Interactive Package Selector & Snapshot (6 cols) */}
            <div className="lg:col-span-6">
              <Card variant="white" className="space-y-6 rounded-2xl shadow-sm p-6 sm:p-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-3">
                    {locale === "bn" ? "প্যাকেজ নির্বাচন করুন:" : "Select Ownership Package:"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedSlug(pkg.slug)}
                        className={`px-3 py-2.5 text-xs font-semibold border text-center transition-all cursor-pointer rounded-xl ${
                          selectedSlug === pkg.slug
                            ? "bg-green-900 text-white border-green-900 shadow-sm"
                            : "bg-paper text-ink border-ink/15 hover:border-green-900/50"
                        }`}
                      >
                        {t(pkg, "name").split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {currentPkg && (
                  <div className="space-y-4 pt-4 border-t border-ink/10">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-grey-700">
                        {locale === "bn" ? "মোট মূল্য:" : "Total Price:"}
                      </span>
                      <span className="font-serif text-2xl text-ink font-medium tabular-nums">
                        {formatCurrencyBDT(currentPkg.price, locale)}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-grey-700">
                        {locale === "bn" ? "বুকিং মানি:" : "Booking Money:"}
                      </span>
                      <span className="font-serif text-lg text-green-900 font-medium tabular-nums">
                        {formatCurrencyBDT(currentPkg.bookingMoney, locale)}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-grey-700">
                        {locale === "bn" ? "মুনাফার সময়কাল:" : "Profit Period:"}
                      </span>
                      <span className="text-xs font-semibold text-ink tabular-nums">
                        {formatNumber(currentPkg.profitPeriodDays)} {locale === "bn" ? "দিন" : "days"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="text-[11px] text-grey-700 pt-2 border-t border-ink/10 italic">
                  {locale === "bn"
                    ? "* দ্রষ্টব্য: নির্দিষ্ট মুনাফার হার প্রক্ষেপণ চুক্তির শর্ত সাপেক্ষে প্রযোজ্য।"
                    : "* Note: Defined profit rate projections are available upon direct request."}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

