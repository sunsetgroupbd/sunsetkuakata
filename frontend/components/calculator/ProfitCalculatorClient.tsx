"use client";

import React, { useState } from "react";
import { Package, CalculatorConfig } from "@/lib/types";
import { useLanguage, formatCurrencyBDT } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calculator, AlertCircle, Info, Calendar, Bookmark } from "lucide-react";
import { BdtIcon } from "@/components/svg/BdtIcon";

interface ProfitCalculatorClientProps {
  packages: Package[];
  config: CalculatorConfig;
  initialPackageSlug?: string;
}

export function ProfitCalculatorClient({
  packages,
  config,
  initialPackageSlug,
}: ProfitCalculatorClientProps) {
  const { locale, t, formatNumber } = useLanguage();

  const [mode, setMode] = useState<"package" | "custom">("package");
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialPackageSlug || packages[0]?.slug || "platinum"
  );
  const [customAmount, setCustomAmount] = useState<number>(1000000);

  const selectedPkg = packages.find((p) => p.slug === selectedSlug) || packages[0];
  const activeRate = config.rates[selectedSlug];

  // Calculated values
  const currentPrice = mode === "package" ? selectedPkg.price : customAmount;
  const currentBooking = mode === "package" ? selectedPkg.bookingMoney : Math.round(customAmount * 0.25);
  const currentRemaining = currentPrice - currentBooking;
  const currentPeriod = mode === "package" ? selectedPkg.profitPeriodDays : 30;

  // Illustrative projection if rate is defined
  const illustrativeReturn = activeRate ? Math.round((currentPrice * activeRate) / 100) : null;

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Mode Selector */}
      <div className="flex border border-ink/15 rounded-xl overflow-hidden max-w-xs mx-auto shadow-xs">
        <button
          onClick={() => setMode("package")}
          className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
            mode === "package" ? "bg-green-900 text-white" : "bg-white text-ink hover:bg-ash"
          }`}
        >
          {locale === "bn" ? "প্যাকেজ নির্বাচন" : "Select Package"}
        </button>
        <button
          onClick={() => setMode("custom")}
          className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
            mode === "custom" ? "bg-green-900 text-white" : "bg-white text-ink hover:bg-ash"
          }`}
        >
          {locale === "bn" ? "কাস্টম পরিমাণ" : "Custom Amount"}
        </button>
      </div>

      {/* Main Calculator Card */}
      <Card variant="white" className="space-y-8 p-6 sm:p-12 rounded-2xl shadow-sm">
        {mode === "package" ? (
          <div>
            <label className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-3">
              {locale === "bn" ? "হোটেল মালিকানা প্যাকেজ:" : "Hotel Ownership Package:"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedSlug(pkg.slug)}
                  className={`py-3 px-4 border text-center transition-all cursor-pointer rounded-xl ${
                    selectedSlug === pkg.slug
                      ? "border-green-900 bg-green-900 text-white font-medium shadow-sm"
                      : "border-ink/15 bg-paper text-ink hover:border-green-900/50"
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider font-semibold">{t(pkg, "name").split(" ")[0]}</div>
                  <div className="text-[11px] opacity-80 mt-1 tabular-nums font-medium">
                    {formatCurrencyBDT(pkg.price, locale)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-2">
              {locale === "bn" ? "আপনার প্রস্তাবিত বিনিয়োগের পরিমাণ (BDT):" : "Proposed Investment Amount (BDT):"}
            </label>
            <input
              type="number"
              min="100000"
              step="50000"
              value={customAmount}
              onChange={(e) => setCustomAmount(Math.max(0, Number(e.target.value)))}
              className="w-full border border-ink/20 px-4 py-3 bg-paper text-ink font-serif text-xl rounded-xl focus:border-green-900 focus:outline-none"
            />
            <span className="text-[11px] text-grey-700 mt-1 block">
              {locale === "bn" ? "প্রস্তাবিত বুকিং মানি আনুমানিক ২৫%" : "Estimated booking money ~25%"}
            </span>
          </div>
        )}

        {/* Breakdown Summary */}
        <div className="border border-ink/10 bg-ash p-6 sm:p-8 space-y-4 rounded-2xl shadow-xs">
          <h3 className="font-serif text-lg text-ink">
            {locale === "bn" ? "হিসাব ও অর্থ পরিশোধ বিবরণী" : "Financial Breakdown Summary"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1">
              <span className="text-xs text-grey-700 flex items-center gap-1.5">
                <BdtIcon className="w-3.5 h-3.5 text-green-900" />
                {locale === "bn" ? "মোট প্যাকেজ মূল্য:" : "Total Package Price:"}
              </span>
              <div className="font-serif text-2xl text-ink font-medium tabular-nums">
                {formatCurrencyBDT(currentPrice, locale)}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-grey-700 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-green-900" />
                {locale === "bn" ? "প্রারম্ভিক বুকিং মানি:" : "Initial Booking Money:"}
              </span>
              <div className="font-serif text-2xl text-green-900 font-medium tabular-nums">
                {formatCurrencyBDT(currentBooking, locale)}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-grey-700">
                {locale === "bn" ? "অবশিষ্ট পরিশোধযোগ্য পরিমাণ:" : "Remaining Balance Payable:"}
              </span>
              <div className="font-serif text-xl text-ink font-medium tabular-nums">
                {formatCurrencyBDT(currentRemaining, locale)}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-grey-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-green-900" />
                {locale === "bn" ? "মুনাফা বণ্টন সময়কাল:" : "Profit Period:"}
              </span>
              <div className="text-base font-semibold text-ink tabular-nums">
                {formatNumber(currentPeriod)} {locale === "bn" ? "দিন" : "days"}
              </div>
            </div>
          </div>
        </div>

        {/* Rate & Projection Logic (As strictly specified) */}
        <div className="border border-ink/10 p-6 space-y-3 bg-paper">
          {activeRate === null || activeRate === undefined ? (
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-grey-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-serif text-base text-ink font-medium">
                  {locale === "bn" ? "প্রক্ষেপণ প্রাপ্তি সাপেক্ষে উপলব্ধ" : "Projection Available on Request"}
                </h4>
                <p className="text-xs text-grey-700 leading-relaxed">
                  {locale === "bn"
                    ? "কোম্পানি আইন ১৯৯৪ এবং শরীয়াহ নির্দেশিকা অনুসারে কোনো প্রকার নিশ্চিত বা পূর্বনির্ধারিত লাভ ধার্য করা হয় না। প্রকৃত হোটেল পরিচালনা ফলাফল ও অংশীদারী চুক্তির ভিত্তিতে নির্দিষ্ট প্রক্ষেপণ সরাসরি যোগাযোগের মাধ্যমে সরবরাহ করা হয়।"
                    : "As per statutory and Shariah guidelines, fixed or guaranteed return rates are not published. Detailed illustrative schedules and partnership deeds are provided upon direct formal consultation."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-grey-700 uppercase tracking-wider">
                  {locale === "bn" ? "আনুমানিক প্রক্ষেপণ:" : "Illustrative Projection:"}
                </span>
                <span className="font-serif text-xl text-green-900 font-medium tabular-nums">
                  {illustrativeReturn ? formatCurrencyBDT(illustrativeReturn, locale) : "—"}
                </span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-ink/10 text-[11px] text-red font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Illustrative estimate only. Not a guarantee of returns.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink/10">
          <Button href={`/contact?package=${selectedSlug}`} variant="primary">
            {locale === "bn" ? "এই প্যাকেজে বুকিং করুন" : "Apply for This Package"}
          </Button>

          <Button href="tel:+8801325074535" variant="outline">
            {locale === "bn" ? "পরামর্শের জন্য কল করুন" : "Consultation: +8801325074535"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

