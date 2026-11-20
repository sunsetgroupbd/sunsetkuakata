"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, CalculatorConfig } from "@/lib/types";
import { seedPackages } from "@/data/packages";
import { useLanguage, formatCurrencyBDT, formatLakhBDT, toBengaliNumber } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Calculator,
  Calendar,
  Bookmark,
  CheckCircle2,
  Clock,
  Home,
  ShieldCheck,
  Users,
  Percent,
  PhoneCall,
} from "lucide-react";
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
  const { locale, formatNumber } = useLanguage();
  const isBn = locale === "bn";

  const [mode, setMode] = useState<"package" | "custom">("package");

  // Project Filter Tabs (Order: 1. Sun Care, 2. Dhaka Fantasy Island, 3. Sunset Kuakata, 4. The Deck, 5. Super Combo)
  const projectTabs = [
    { slug: "sun-care", nameEn: "Sun Care Hospital", nameBn: "সান কেয়ার হসপিটাল" },
    { slug: "dfi", nameEn: "Dhaka Fantasy Island (DFI)", nameBn: "ঢাকা ফ্যান্টাসি আইল্যান্ড (ডিএফআই)" },
    { slug: "kuakata-hotel", nameEn: "Sunset Kuakata", nameBn: "সানসেট কুয়াকাটা" },
    { slug: "the-deck", nameEn: "The Deck (Cox's Bazar)", nameBn: "দ্য ডেক (কক্সবাজার)" },
    { slug: "super-combo", nameEn: "Super Combo (4-in-1)", nameBn: "সুপার কম্বো (৪-ইন-১)" },
  ];

  const [selectedProject, setSelectedProject] = useState<string>("sun-care");

  // Resilient fallback: ensure packages are always available
  const allPackages = packages && packages.length > 0 ? packages : seedPackages;
  const availablePackages = allPackages.filter((p) => p.projectSlug === selectedProject);
  const fallbackForProject = seedPackages.filter((p) => p.projectSlug === selectedProject);
  const currentProjectPackages =
    availablePackages.length > 0
      ? availablePackages
      : (fallbackForProject.length > 0 ? fallbackForProject : seedPackages.slice(0, 4));

  // Selected package tier
  const [selectedTier, setSelectedTier] = useState<string>("bronze");

  // Installment period simulator (0 = full payment, 12, 24, 36 months)
  const [installmentMonths, setInstallmentMonths] = useState<number>(24);

  // Custom mode amount
  const [customAmount, setCustomAmount] = useState<number>(1000000);

  // Match selected package with fallback
  const selectedPkg =
    currentProjectPackages.find((p) => p.tier.toLowerCase() === selectedTier.toLowerCase()) ||
    currentProjectPackages[0] ||
    seedPackages[0];

  // Calculated values
  const currentPrice = mode === "package" ? selectedPkg.price : customAmount;
  const currentBooking = mode === "package" ? selectedPkg.bookingMoney : Math.round(customAmount * 0.25);
  const currentRemaining = currentPrice - currentBooking;
  const estimatedMonthly =
    installmentMonths > 0 ? Math.round(currentRemaining / installmentMonths) : null;

  // Space allocation detail
  const renderAreaDetail = (pkg: Package) => {
    if (pkg.landSft !== undefined && pkg.buildSft !== undefined) {
      if (isBn) {
        return `জমি ${toBengaliNumber(pkg.landSft)} sft + নির্মাণ ${toBengaliNumber(pkg.buildSft)} sft = মোট ${toBengaliNumber(pkg.areaSft)} sft`;
      }
      return `Land ${pkg.landSft} sft + Build ${pkg.buildSft} sft = Total ${pkg.areaSft} sft`;
    }
    if (isBn) {
      return `মোট এরিয়া: ${toBengaliNumber(pkg.areaSft)} sft`;
    }
    return `Total Area: ${pkg.areaSft} sft`;
  };

  const customPresets = [500000, 1000000, 2500000, 5000000, 10000000];

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Mode Selector */}
      <div className="flex border border-ink/15 rounded-xl overflow-hidden max-w-sm mx-auto shadow-xs bg-white p-1">
        <button
          onClick={() => setMode("package")}
          className={`flex-1 py-2.5 px-3 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
            mode === "package"
              ? "bg-green-900 text-white shadow-xs"
              : "bg-transparent text-ink hover:text-green-900 hover:bg-ash"
          }`}
        >
          {isBn ? "প্যাকেজ ভিত্তিক হিসাব" : "Select by Package"}
        </button>
        <button
          onClick={() => setMode("custom")}
          className={`flex-1 py-2.5 px-3 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
            mode === "custom"
              ? "bg-green-900 text-white shadow-xs"
              : "bg-transparent text-ink hover:text-green-900 hover:bg-ash"
          }`}
        >
          {isBn ? "কাস্টম বিনিয়োগ হিসাব" : "Custom Amount"}
        </button>
      </div>

      {/* Main Calculator Card */}
      <Card variant="white" className="space-y-8 p-5 sm:p-10 rounded-2xl shadow-sm border border-ink/10">
        {mode === "package" ? (
          <div className="space-y-6">
            {/* Step 1: Select Project */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-green-900 text-white flex items-center justify-center text-[10px] font-bold">
                  ১
                </span>
                <label className="text-xs uppercase tracking-wider text-grey-700 font-semibold">
                  {isBn ? "প্রকল্প নির্বাচন করুন:" : "1. Select Project:"}
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                {projectTabs.map((tab) => (
                  <button
                    key={tab.slug}
                    onClick={() => {
                      setSelectedProject(tab.slug);
                    }}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      selectedProject === tab.slug
                        ? "bg-green-900 text-white border-green-900 shadow-xs"
                        : "bg-paper text-ink border-ink/15 hover:border-green-900/40 hover:bg-ash"
                    }`}
                  >
                    {isBn ? tab.nameBn : tab.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Tier */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-green-900 text-white flex items-center justify-center text-[10px] font-bold">
                  ২
                </span>
                <label className="text-xs uppercase tracking-wider text-grey-700 font-semibold">
                  {isBn ? "মালিকানা প্যাকেজ স্তর নির্বাচন করুন:" : "2. Select Ownership Tier:"}
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {currentProjectPackages.map((pkg) => {
                  const isSelected = selectedTier.toLowerCase() === pkg.tier.toLowerCase();
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedTier(pkg.tier.toLowerCase())}
                      className={`p-3 sm:p-4 border text-center transition-all cursor-pointer rounded-xl flex flex-col justify-between ${
                        isSelected
                          ? "border-green-900 bg-green-900/5 ring-2 ring-green-900 shadow-sm"
                          : "border-ink/15 bg-paper text-ink hover:border-green-900/40"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="font-serif text-sm sm:text-base font-bold text-ink">
                            {isBn ? pkg.nameBn.split(" ")[0] : pkg.tier}
                          </span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sand font-medium text-grey-700 block">
                          {pkg.unitMultiplier}x {isBn ? "ইউনিট" : "Unit"}
                        </span>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-ink/10">
                        <div className="text-xs sm:text-sm font-bold text-green-900 font-serif tabular-nums">
                          {formatLakhBDT(pkg.price, locale)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-wider text-grey-700 font-semibold">
              {isBn ? "প্রস্তাবিত বিনিয়োগের পরিমাণ নির্বাচন বা টাইপ করুন (BDT):" : "Proposed Investment Amount (BDT):"}
            </label>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2">
              {customPresets.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCustomAmount(amount)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    customAmount === amount
                      ? "bg-green-900 text-white border-green-900"
                      : "bg-paper text-ink border-ink/15 hover:border-green-900/40"
                  }`}
                >
                  {formatLakhBDT(amount, locale)}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="number"
                min="100000"
                step="50000"
                value={customAmount}
                onChange={(e) => setCustomAmount(Math.max(0, Number(e.target.value)))}
                className="w-full border border-ink/20 px-4 py-3 bg-paper text-ink font-serif text-2xl font-bold rounded-xl focus:border-green-900 focus:outline-none tabular-nums"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-grey-700">
                BDT (টাকা)
              </span>
            </div>
            <span className="text-[11px] text-grey-700 block">
              {isBn
                ? "প্রস্তাবিত প্রারম্ভিক বুকিং মানি আনুমানিক ২৫% (বাকি টাকা কিস্তিতে পরিশোধযোগ্য)"
                : "Standard estimated booking money ~25% (balance payable in flexible installments)"}
            </span>
          </div>
        )}

        {/* Step 3: Installment Period Simulator */}
        <div className="pt-4 border-t border-ink/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-900" />
              <label className="text-xs uppercase tracking-wider text-grey-700 font-semibold">
                {isBn ? "পরিশোধের সময়কাল / কিস্তির মেয়াদ:" : "Installment Period / Schedule:"}
              </label>
            </div>
            <span className="text-[11px] text-grey-700">
              {isBn ? "(বুকিং পরবর্তী অবশিষ্ট ব্যালেন্সের কিস্তি)" : "(For balance after booking money)"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { months: 0, labelEn: "Full Payment", labelBn: "এককালীন" },
              { months: 12, labelEn: "12 Months (1 yr)", labelBn: "১২ মাস (১ বছর)" },
              { months: 24, labelEn: "24 Months (2 yrs)", labelBn: "২৪ মাস (২ বছর)" },
              { months: 36, labelEn: "36 Months (3 yrs)", labelBn: "৩৬ মাস (৩ বছর)" },
            ].map((option) => (
              <button
                key={option.months}
                onClick={() => setInstallmentMonths(option.months)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                  installmentMonths === option.months
                    ? "bg-green-900 text-white border-green-900 shadow-xs"
                    : "bg-paper text-ink border-ink/15 hover:border-green-900/40"
                }`}
              >
                {isBn ? option.labelBn : option.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Financial Breakdown & Summary Box (Mobile App-Optimized UI) */}
        <div className="border border-green-900/20 bg-green-900/5 p-3.5 sm:p-8 space-y-3.5 sm:space-y-5 rounded-xl sm:rounded-2xl shadow-xs">
          
          {/* Header (Clean title without icon) */}
          <div className="flex items-center justify-between border-b border-green-900/15 pb-2.5 sm:pb-3">
            <h3 className="font-serif text-sm sm:text-lg text-ink font-bold">
              {isBn ? "হিসাব ও অর্থ পরিশোধ বিবরণী" : "Financial Breakdown & Allocation"}
            </h3>
            <span className="text-[10px] sm:text-xs font-semibold text-green-900 bg-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-green-900/20 shadow-2xs whitespace-nowrap">
              {mode === "package" ? `${selectedPkg.unitMultiplier}x Unit Share` : "Custom Share"}
            </span>
          </div>

          {/* App-like Hero Monthly Installment Card (Solid Clean White, No Gradient) */}
          {estimatedMonthly && installmentMonths > 0 ? (
            <div className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-xs border-2 border-green-900/40">
              <div className="flex items-center justify-between gap-2 pb-1.5 sm:pb-2 border-b border-ink/10">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-green-900" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-green-900">
                    {isBn ? "সম্ভাব্য মাসিক কিস্তি" : "Estimated Monthly Installment"}
                  </span>
                </div>
                <span className="bg-green-900/10 px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-semibold text-green-900 border border-green-900/20 whitespace-nowrap">
                  {isBn ? `${toBengaliNumber(installmentMonths)} মাসের শিডিউল` : `${installmentMonths} Mo Schedule`}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-900 tracking-tight tabular-nums flex items-baseline gap-1">
                    <span>৳ {estimatedMonthly.toLocaleString("en-IN")}</span>
                    <span className="text-xs sm:text-sm font-normal text-grey-700">
                      /{isBn ? "মাস" : "mo"}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-grey-700 mt-0.5 sm:mt-1">
                    {isBn
                      ? `বুকিং মানি বাদে অবশিষ্ট ব্যালেন্সের ${toBengaliNumber(installmentMonths)}টি সমান মাসিক কিস্তি (বিনা সুদে)`
                      : `Payable across ${installmentMonths} equal monthly installments`}
                  </p>
                </div>

                {/* Mobile Quick Action Link */}
                <Link
                  href={
                    mode === "package"
                      ? `/contact?package=${selectedPkg.slug}&project=${selectedPkg.projectSlug}`
                      : `/contact?project=${selectedProject}`
                  }
                  className="inline-flex sm:hidden items-center justify-center gap-1.5 py-2 px-3 bg-green-900 hover:bg-green-800 text-white text-[11px] font-bold rounded-lg uppercase tracking-wider transition-all mt-1 shadow-xs"
                >
                  <span>{isBn ? "এই কিস্তিতে বুকিং আবেদন" : "Book This Plan"}</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : installmentMonths === 0 ? (
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-green-900/30 flex items-center justify-between gap-3 shadow-2xs">
              <div className="space-y-0.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-green-900 block">
                  {isBn ? "এককালীন পরিশোধ পরিকল্পনা" : "Full Payment Option"}
                </span>
                <p className="text-[11px] text-grey-700">
                  {isBn ? "রেজিস্ট্রেশনের সময় সম্পূর্ণ মূল্য পরিশোধযোগ্য" : "100% full payment at the time of deed registration"}
                </p>
              </div>
              <div className="font-serif text-lg sm:text-2xl font-bold text-ink tabular-nums">
                {formatLakhBDT(currentPrice, locale)}
              </div>
            </div>
          ) : null}

          {/* 3 Compact App-Style Metrics (All 3 side-by-side in 1 row on mobile & desktop) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1">
            {/* Total Price */}
            <div className="bg-white p-2.5 sm:p-4 rounded-xl border border-ink/10 space-y-0.5 sm:space-y-1 text-center sm:text-left shadow-2xs">
              <span className="text-[9px] sm:text-[11px] text-grey-700 uppercase tracking-wider block font-medium">
                {isBn ? "মোট মূল্য" : "Total Price"}
              </span>
              <div className="font-serif text-xs sm:text-2xl font-bold text-ink tabular-nums leading-tight">
                {formatLakhBDT(currentPrice, locale)}
              </div>
              <div className="text-[8.5px] sm:text-[10px] text-grey-700 truncate">
                (৳ {currentPrice.toLocaleString("en-IN")})
              </div>
            </div>

            {/* Booking Money */}
            <div className="bg-white p-2.5 sm:p-4 rounded-xl border border-green-900/30 ring-1 ring-green-900/10 space-y-0.5 sm:space-y-1 text-center sm:text-left shadow-2xs">
              <span className="text-[9px] sm:text-[11px] text-green-900 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1 font-semibold">
                <Bookmark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-900 flex-shrink-0" />
                <span>{isBn ? "বুকিং মানি" : "Initial Booking"}</span>
              </span>
              <div className="font-serif text-xs sm:text-2xl font-bold text-green-900 tabular-nums leading-tight">
                {formatLakhBDT(currentBooking, locale)}
              </div>
              <div className="text-[8.5px] sm:text-[10px] text-green-900/80 truncate">
                (৳ {currentBooking.toLocaleString("en-IN")})
              </div>
            </div>

            {/* Remaining Balance */}
            <div className="bg-white p-2.5 sm:p-4 rounded-xl border border-ink/10 space-y-0.5 sm:space-y-1 text-center sm:text-left shadow-2xs">
              <span className="text-[9px] sm:text-[11px] text-grey-700 uppercase tracking-wider block font-medium">
                {isBn ? "অবশিষ্ট ব্যালেন্স" : "Remaining"}
              </span>
              <div className="font-serif text-xs sm:text-2xl font-bold text-ink tabular-nums leading-tight">
                {formatLakhBDT(currentRemaining, locale)}
              </div>
              <div className="text-[8.5px] sm:text-[10px] text-grey-700 truncate">
                (৳ {currentRemaining.toLocaleString("en-IN")})
              </div>
            </div>
          </div>

          {/* Space & Accommodation Details */}
          {mode === "package" && (
            <div className="bg-white p-4 rounded-xl border border-ink/10 space-y-3 text-xs">
              {selectedPkg.projectSlug === "the-deck" ? (
                <>
                  {Boolean(selectedPkg.dayProfitDays && selectedPkg.dayProfitDays > 0) && (
                    <div className="flex items-center justify-between pb-2 border-b border-ink/5">
                      <span className="text-grey-700 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-green-900" />
                        <span>{isBn ? "ডে প্রফিট সুবিধা:" : "Day Profit:"}</span>
                      </span>
                      <span className="font-serif font-bold text-green-900 text-sm">
                        {formatNumber(selectedPkg.dayProfitDays || 0)} {isBn ? "দিন" : "Days"}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-grey-700">
                    <span className="flex items-center gap-1 text-ink font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-900" />
                      <span>{isBn ? "সাফ-কবলা মালিকানা" : "Saf-Kabala Ownership"}</span>
                    </span>
                    <span className="flex items-center gap-1 text-ink font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-900" />
                      <span>{isBn ? "হালাল মুনাফা" : "Halal & Shariah Profit"}</span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-ink/5">
                    <span className="text-grey-700 font-medium">
                      {isBn ? "জমি ও নির্মাণ স্পেস বরাদ্দ:" : "Space Allocation:"}
                    </span>
                    <span className="font-serif font-bold text-ink">
                      {renderAreaDetail(selectedPkg)}
                    </span>
                  </div>

                  {Boolean((selectedPkg.stayDays && selectedPkg.stayDays > 0) || (selectedPkg.stayDaysDfi && selectedPkg.stayDaysDfi > 0)) && (
                    <div className="flex items-center justify-between pb-2 border-b border-ink/5">
                      <span className="text-grey-700 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-green-900" />
                        <span>{isBn ? "আবাসন সুবিধা:" : "Accommodation days:"}</span>
                      </span>
                      <span className="font-serif font-bold text-ink">
                        {selectedPkg.stayDaysDfi
                          ? `${isBn ? "কুয়াকাটা" : "Kuakata"} ${formatNumber(selectedPkg.stayDays || 0)}d + DFI ${formatNumber(selectedPkg.stayDaysDfi)}d`
                          : `${formatNumber(selectedPkg.stayDays || 0)} ${isBn ? "দিন" : "days"}`}
                      </span>
                    </div>
                  )}

                  {/* Extra Benefits */}
                  <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-grey-700">
                    {Boolean(selectedPkg.nominatedPeople && selectedPkg.nominatedPeople > 0) && (
                      <span className="flex items-center gap-1 text-ink font-medium">
                        <Users className="w-3.5 h-3.5 text-green-900" />
                        {isBn ? `মনোনীত ব্যক্তি: ${selectedPkg.nominatedPeople} জন` : `Nominated: ${selectedPkg.nominatedPeople} Persons`}
                      </span>
                    )}
                    {Boolean(selectedPkg.insuranceCoverage && selectedPkg.insuranceCoverage > 0) && (
                      <span className="flex items-center gap-1 text-ink font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-900" />
                        {isBn ? `জীবন বীমা: ${formatLakhBDT(selectedPkg.insuranceCoverage || 0, locale)}` : `Insurance: ${formatLakhBDT(selectedPkg.insuranceCoverage || 0, locale)}`}
                      </span>
                    )}
                    {Boolean(selectedPkg.discountPercent && selectedPkg.discountPercent > 0) && (
                      <span className="flex items-center gap-1 text-ink font-medium">
                        <Percent className="w-3.5 h-3.5 text-green-900" />
                        {isBn ? `রিসোর্ট ডিসকাউন্ট: ${selectedPkg.discountPercent}%` : `Discount: ${selectedPkg.discountPercent}%`}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* CTA & Next Steps */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ink/10">
          <Link
            href={`/contact?project=${mode === "package" ? selectedProject : "super-combo"}&package=${mode === "package" ? selectedTier : ""}`}
            className="w-full sm:w-auto px-8 py-3.5 bg-green-900 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-xl text-center transition-colors shadow-xs"
          >
            {isBn ? "এই প্যাকেজে বুকিং আবেদন করুন →" : "Apply for This Booking →"}
          </Link>

          <Button href="tel:+8801325074535" variant="outline" className="w-full sm:w-auto rounded-xl">
            <PhoneCall className="w-4 h-4 mr-2 text-green-900" />
            <span>{isBn ? "পরামর্শের জন্য কল করুন: +8801325074535" : "Call Advisor: +8801325074535"}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
