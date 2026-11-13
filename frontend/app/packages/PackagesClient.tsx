"use client";

import React from "react";
import { Package } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { CalculatorTeaser } from "@/components/sections/CalculatorTeaser";
import { FinalCta } from "@/components/sections/FinalCta";

interface PackagesClientProps {
  packages: Package[];
}

export function PackagesClient({ packages }: PackagesClientProps) {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-3xl space-y-4">
          <span className={`text-xs uppercase font-medium text-grey-700 block ${isBn ? "tracking-normal" : "tracking-[0.18em]"}`}>
            {isBn ? "মালিকানা বিনিয়োগ স্তর" : "Ownership Investment Tiers"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold">
            {isBn ? "মালিকানা প্যাকেজসমূহ" : "Ownership Packages"}
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            {isBn
              ? "আমাদের সম্পদ মালিকানা স্তরের জন্য স্বচ্ছ মূল্য তালিকা, বুকিং শিডিউল এবং আবাসন সুবিধা।"
              : "Transparent pricing, booking schedules, space allocations, and accommodation days across our asset ownership tiers."}
          </p>
        </div>
      </div>

      <PackagesSection packages={packages} />
      <CalculatorTeaser packages={packages} />
      <FinalCta />
    </div>
  );
}
