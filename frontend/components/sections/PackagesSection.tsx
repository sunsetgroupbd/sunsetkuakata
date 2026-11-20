"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package } from "@/lib/types";
import { seedPackages } from "@/data/packages";
import { useLanguage, formatLakhBDT, toBengaliNumber } from "@/lib/i18n";
import { Crown, Sparkles, Home, Building2, ShieldCheck, Users, Percent, Gift, Calendar, Check } from "lucide-react";

interface PackagesSectionProps {
  packages: Package[];
}

export function PackagesSection({ packages }: PackagesSectionProps) {
  const { locale, formatNumber } = useLanguage();
  const isBn = locale === "bn";

  // Project Filter Tabs (Order: 1. Sun Care, 2. Dhaka Fantasy Island, 3. Sunset Kuakata, 4. The Deck, 5. Super Combo)
  const projectTabs = [
    { slug: "sun-care", nameEn: "Sun Care Hospital", nameBn: "সান কেয়ার হসপিটাল" },
    { slug: "dfi", nameEn: "Dhaka Fantasy Island (DFI)", nameBn: "ঢাকা ফ্যান্টাসি আইল্যান্ড (ডিএফআই)" },
    { slug: "kuakata-hotel", nameEn: "Sunset Kuakata", nameBn: "সানসেট কুয়াকাটা" },
    { slug: "the-deck", nameEn: "The Deck (Cox's Bazar)", nameBn: "দ্য ডেক (কক্সবাজার)" },
    { slug: "super-combo", nameEn: "Super Combo (4-in-1)", nameBn: "সুপার কম্বো (৪-ইন-১)" },
  ];

  const [activeProject, setActiveProject] = useState<string>("sun-care");

  const tierStyles: {
    [key: string]: {
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

  // Resilient fallback: ensure verified brochure packages are always displayed even if backend data is empty
  const allPackages = packages && packages.length > 0 ? packages : seedPackages;
  const projectPackages = allPackages.filter((p) => p.projectSlug === activeProject);
  const fallbackProjectPackages = seedPackages.filter((p) => p.projectSlug === activeProject);
  const displayPackages =
    projectPackages.length > 0
      ? projectPackages
      : (fallbackProjectPackages.length > 0 ? fallbackProjectPackages : seedPackages.slice(0, 4));

  // Helper for Land + Build detail string
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

  return (
    <section className="bg-ash py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className={`text-xs uppercase font-semibold text-green-900 block ${isBn ? "tracking-normal" : "tracking-[0.2em]"}`}>
            {isBn ? "সম্পদ অংশীদারিত্বের স্তর" : "Ownership Packages"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            {isBn ? "মালিকানা প্যাকেজসমূহ" : "Ownership Packages"}
          </h2>
          <p className="text-xs sm:text-sm text-grey-700">
            {isBn
              ? "প্রকল্প নির্বাচন করে প্রতিটি স্তরের ইউনিট সাইজ, জমি ও নির্মাণ অনুপাত এবং আবাসন সুবিধা দেখুন।"
              : "Select a project to explore unit tiers, land + construction ratios, and accommodation benefits."}
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {projectTabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveProject(tab.slug)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs ${
                activeProject === tab.slug
                  ? "bg-green-900 text-white shadow-sm border border-green-900"
                  : "bg-white text-ink border border-ink/15 hover:border-green-900/40 hover:bg-white"
              }`}
            >
              {isBn ? tab.nameBn : tab.nameEn}
            </button>
          ))}
        </div>

        {/* 4 Cards Grid - 2 per row on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {displayPackages.map((pkg) => {
            const tierKey = pkg.tier.toLowerCase();
            const tier = tierStyles[tierKey] || {
              headerBg: "bg-green-900",
              accentBorder: "hover:border-green-900",
              buttonHover: "hover:bg-green-900 hover:text-white",
              titleEn: pkg.nameEn,
              titleBn: pkg.nameBn,
            };

            return (
              <div
                key={pkg.id}
                className={`border border-ink/10 bg-white rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${tier.accentBorder} shadow-2xs sm:shadow-xs hover:shadow-md relative`}
              >
                <div>
                  {/* Colored Metallic Header Banner with Crown Icon */}
                  <div
                    className={`${tier.headerBg} text-white py-2.5 sm:py-4 px-2.5 sm:px-4 flex items-center justify-between text-center rounded-t-xl sm:rounded-t-2xl shadow-xs`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/95 flex-shrink-0" />
                      <span className="font-serif text-xs sm:text-lg font-semibold tracking-wide">
                        {isBn ? tier.titleBn : tier.titleEn}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md bg-white/20 text-white backdrop-blur-xs whitespace-nowrap">
                      {pkg.unitMultiplier}x {isBn ? "ইউনিট" : "Unit"}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-2.5 sm:p-6 space-y-2.5 sm:space-y-4">
                    {/* Price in Lakh format */}
                    <div className="text-center space-y-0.5 sm:space-y-1 pb-2 sm:pb-3 border-b border-ink/10">
                      <span className="text-[9px] sm:text-xs text-grey-700 uppercase tracking-wider block">
                        {isBn ? "প্যাকেজ মূল্য" : "Total Package Price"}
                      </span>
                      <div className="font-serif text-sm sm:text-2xl font-bold text-ink leading-snug">
                        {formatLakhBDT(pkg.price, locale)}
                      </div>
                      <div className="text-[9px] sm:text-[11px] text-grey-700 font-medium">
                        (৳ {pkg.price.toLocaleString("en-IN")})
                      </div>
                    </div>

                    {/* Booking Money in Lakh format */}
                    <div className="flex justify-between items-baseline text-[10px] sm:text-xs pt-0.5 sm:pt-1">
                      <span className="text-grey-700 font-medium">
                        {isBn ? "বুকিং মানি:" : "Booking Money:"}
                      </span>
                      <div className="text-right">
                        <span className="font-semibold text-green-900 font-serif text-xs sm:text-base">
                          {formatLakhBDT(pkg.bookingMoney, locale)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-grey-700 block">
                          (৳ {pkg.bookingMoney.toLocaleString("en-IN")})
                        </span>
                      </div>
                    </div>

                    {/* The Deck specific highlights vs other projects space allocation */}
                    {pkg.projectSlug === "the-deck" ? (
                      <div className="space-y-2 pt-1.5 sm:pt-2 border-t border-ink/10">
                        {Boolean(pkg.dayProfitDays && pkg.dayProfitDays > 0) && (
                          <div className="flex justify-between items-center text-[10px] sm:text-xs">
                            <span className="text-grey-700 font-medium flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-green-900 flex-shrink-0" />
                              <span>{isBn ? "ডে প্রফিট:" : "Day Profit:"}</span>
                            </span>
                            <span className="font-semibold text-green-900 font-serif text-[11px] sm:text-sm">
                              {formatNumber(pkg.dayProfitDays || 0)} {isBn ? "দিন" : "Days"}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-ink font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-green-900 flex-shrink-0" />
                          <span>{isBn ? "সাফ-কবলা মালিকানা" : "Saf-Kabala Ownership"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-ink font-medium">
                          <Check className="w-3.5 h-3.5 text-green-900 flex-shrink-0" />
                          <span>{isBn ? "হালাল মুনাফা" : "Halal & Shariah Profit"}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Land & Construction / Area Detail ("Land X sft + Build Y sft = Total Z sft") */}
                        <div className="space-y-1 pt-1.5 sm:pt-2 border-t border-ink/10 text-[9px] sm:text-xs">
                          <span className="text-grey-700 block font-medium">
                            {isBn ? "জমি ও নির্মাণ অনুপাত:" : "Space Allocation:"}
                          </span>
                          <div className="font-serif text-[9px] sm:text-xs text-ink font-semibold bg-sand/80 p-1.5 sm:p-2 rounded-md sm:rounded-lg leading-snug">
                            {renderAreaDetail(pkg)}
                          </div>
                        </div>

                        {/* Accommodation days (UI label: "Accommodation days") */}
                        {Boolean((pkg.stayDays && pkg.stayDays > 0) || (pkg.stayDaysDfi && pkg.stayDaysDfi > 0)) && (
                          <div className="flex justify-between items-center text-[9px] sm:text-xs pt-1.5 sm:pt-2 border-t border-ink/10">
                            <span className="text-grey-700 font-medium">
                              {isBn ? "আবাসন সুবিধা:" : "Accommodation days:"}
                            </span>
                            <span className="font-semibold text-ink font-serif text-[10px] sm:text-sm text-right">
                              {pkg.stayDaysDfi
                                ? `${isBn ? "কুয়াকাটা" : "Kuakata"} ${formatNumber(pkg.stayDays || 0)}d + DFI ${formatNumber(pkg.stayDaysDfi)}d`
                                : `${formatNumber(pkg.stayDays || 0)} ${isBn ? "দিন" : "days"}`}
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Discount Percent if applicable */}
                    {Boolean(pkg.discountPercent && pkg.discountPercent > 0) && (
                      <div className="flex justify-between items-center text-[9px] sm:text-xs pt-1 border-t border-ink/5">
                        <span className="text-grey-700 font-medium">
                          {isBn ? "রিসোর্ট ডিসকাউন্ট:" : "Resort Discount:"}
                        </span>
                        <span className="font-semibold text-green-900 font-serif text-[10px] sm:text-sm">
                          {formatNumber(pkg.discountPercent || 0)}%
                        </span>
                      </div>
                    )}

                    {/* Nominated People if applicable */}
                    {Boolean(pkg.nominatedPeople && pkg.nominatedPeople > 0) && (
                      <div className="flex justify-between items-center text-[9px] sm:text-xs pt-1 border-t border-ink/5">
                        <span className="text-grey-700 font-medium">
                          {isBn ? "মনোনীত ব্যক্তি:" : "Nominated People:"}
                        </span>
                        <span className="font-semibold text-ink font-serif text-[10px] sm:text-sm">
                          {formatNumber(pkg.nominatedPeople || 0)} {isBn ? "জন" : "Persons"}
                        </span>
                      </div>
                    )}

                    {/* Insurance Coverage if applicable */}
                    {Boolean(pkg.insuranceCoverage && pkg.insuranceCoverage > 0) && (
                      <div className="flex justify-between items-center text-[9px] sm:text-xs pt-1 border-t border-ink/5">
                        <span className="text-grey-700 font-medium">
                          {isBn ? "জীবন বীমা:" : "Insurance:"}
                        </span>
                        <span className="font-semibold text-green-900 font-serif text-[10px] sm:text-sm">
                          {formatLakhBDT(pkg.insuranceCoverage || 0, locale)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-2.5 sm:p-6 pt-0">
                  <Link
                    href={`/contact?package=${pkg.slug}&project=${pkg.projectSlug}`}
                    className={`block w-full py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg sm:rounded-xl border border-ink/20 text-ink ${tier.buttonHover} transition-colors duration-200 shadow-2xs`}
                  >
                    {isBn ? "বুকিং আবেদন" : "Apply for Booking"}
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
