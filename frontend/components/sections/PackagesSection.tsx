"use client";

import React from "react";
import Link from "next/link";
import { Package } from "@/lib/types";
import { useLanguage, toBengaliNumber } from "@/lib/i18n";
import { Crown } from "lucide-react";

interface PackagesSectionProps {
  packages: Package[];
}

export function PackagesSection({ packages }: PackagesSectionProps) {
  const { locale, formatNumber } = useLanguage();

  const tierStyles: {
    [slug: string]: {
      headerBg: string;
      accentBorder: string;
      buttonHover: string;
      titleEn: string;
      titleBn: string;
    };
  } = {
    platinum: {
      headerBg: "bg-[#2D3748]",
      accentBorder: "hover:border-[#4A5568]",
      buttonHover: "hover:bg-[#2D3748] hover:text-white hover:border-[#2D3748]",
      titleEn: "Platinum",
      titleBn: "প্লাটিনাম",
    },
    gold: {
      headerBg: "bg-[#B8860B]",
      accentBorder: "hover:border-[#D4AF37]",
      buttonHover: "hover:bg-[#B8860B] hover:text-white hover:border-[#B8860B]",
      titleEn: "Gold",
      titleBn: "গোল্ড",
    },
    silver: {
      headerBg: "bg-[#64748B]",
      accentBorder: "hover:border-[#94A3B8]",
      buttonHover: "hover:bg-[#64748B] hover:text-white hover:border-[#64748B]",
      titleEn: "Silver",
      titleBn: "সিলভার",
    },
    bronze: {
      headerBg: "bg-[#8C4A1D]",
      accentBorder: "hover:border-[#A0522D]",
      buttonHover: "hover:bg-[#8C4A1D] hover:text-white hover:border-[#8C4A1D]",
      titleEn: "Bronze",
      titleBn: "ব্রোঞ্জ",
    },
  };

  const formatTaka = (amount: number) => {
    const enFormatted = amount.toLocaleString("en-IN");
    if (locale === "bn") {
      return `৳ ${toBengaliNumber(enFormatted)}`;
    }
    return `৳ ${enFormatted}`;
  };

  return (
    <section className="bg-ash py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Image 1 */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            {locale === "bn" ? "মালিকানা প্যাকেজসমূহ" : "Ownership Packages"}
          </h2>
        </div>

        {/* 4 Cards Grid - 2 per row on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {packages.map((pkg) => {
            const tier = tierStyles[pkg.slug] || {
              headerBg: "bg-green-900",
              titleEn: pkg.nameEn,
              titleBn: pkg.nameBn,
            };

            return (
              <div
                key={pkg.id}
                className={`border border-ink/10 bg-white rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${tier.accentBorder} shadow-xs hover:shadow-md`}
              >
                <div>
                  {/* Colored Header Banner with Crown Icon */}
                  <div
                    className={`${tier.headerBg} text-white py-2.5 sm:py-4 px-2 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 text-center rounded-t-xl sm:rounded-t-2xl shadow-xs`}
                  >
                    <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/95" />
                    <span className="font-serif text-xs sm:text-base md:text-lg font-medium tracking-wide">
                      {locale === "bn" ? tier.titleBn : tier.titleEn}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-6 text-center space-y-3 sm:space-y-5">
                    {/* Price */}
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="font-serif text-base sm:text-2xl md:text-3xl text-ink font-bold tabular-nums">
                        {formatTaka(pkg.price)}
                      </div>
                    </div>

                    {/* Booking Money */}
                    <div className="space-y-0.5 pt-1.5 sm:pt-2 border-t border-ink/10">
                      <span className="text-[10px] sm:text-[11px] text-grey-700 block">
                        {locale === "bn" ? "বুকিং" : "Booking"}
                      </span>
                      <div className="font-serif text-xs sm:text-base md:text-lg text-ink font-semibold tabular-nums">
                        {formatTaka(pkg.bookingMoney)}
                      </div>
                    </div>

                    {/* Profit Period */}
                    <div className="space-y-0.5 pt-1.5 sm:pt-2 border-t border-ink/10">
                      <span className="text-[10px] sm:text-[11px] text-grey-700 block">
                        {locale === "bn" ? "মুনাফা সময়কাল" : "Profit Period"}
                      </span>
                      <div className="font-serif text-xs sm:text-base md:text-lg text-ink font-semibold tabular-nums">
                        {formatNumber(pkg.profitPeriodDays)} {locale === "bn" ? "দিন" : "Days"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-3 sm:p-5 pt-0">
                  <Link
                    href={`/contact?package=${pkg.slug}`}
                    className={`block w-full py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg border border-ink/20 text-ink ${tier.buttonHover} transition-colors duration-200`}
                  >
                    {locale === "bn" ? "আবেদন করুন" : "Apply for Booking"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
