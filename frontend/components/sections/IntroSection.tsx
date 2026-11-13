"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { ArchImageMask } from "@/components/svg/ArchImageMask";
import { CountUp } from "@/components/ui/CountUp";

export function IntroSection() {
  const { locale } = useLanguage();

  return (
    <section className="bg-ash py-20 md:py-28 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Signature Arch Image (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] aspect-[3/4]">
              <ArchImageMask
                src="/images/hero2.jpg"
                alt="Coastal sunrise Kuakata"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Editorial Content + 3 Count-up Facts (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
                {locale === "bn" ? "আমাদের পরিচিতি ও অঙ্গীকার" : "About Sunset Group"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
                {locale === "bn"
                  ? "আইনগত ভিত্তি ও হালাল আয়ের নীতিতে নিবেদিত"
                  : "Grounding Luxury Hospitality in Lawful Principles"}
              </h2>
              <p className="text-base text-grey-700 leading-relaxed">
                {locale === "bn"
                  ? "কোম্পানি আইন ১৯৯৪ অনুযায়ী গঠিত সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট লিমিটেড দেশের উপকূলীয় ও পরিকল্পিত অঞ্চলে নির্ভরযোগ্য পর্যটন ও স্বাস্থ্য অবকাঠামো গড়ে তুলছে। একটি স্বাধীন শরীয়াহ তদারকি কমিটির তত্ত্বাবধানে হালাল আয়ের বিকল্প পথ তৈরি করাই আমাদের অন্যতম লক্ষ্য।"
                  : "Sunset Kuakata Hotel & Resort Limited is a private limited company registered and governed by the Company Act 1994. The group develops prime hotels, resorts, and healthcare facilities that blend upscale comfort with ethical hospitality, guided by a formed Shariah supervisory committee to ensure halal investment avenues."}
              </p>
            </div>

            {/* 3 Count-up Facts Drawn ONLY from Source Facts: 2023, 4, 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-ink/10">
              <div className="space-y-1">
                <div className="font-serif text-3xl sm:text-4xl text-green-900 font-medium">
                  <CountUp end={2023} duration={1.2} />
                </div>
                <p className="text-xs uppercase tracking-wider text-grey-700 font-medium">
                  {locale === "bn" ? "জমি ক্রয় সম্পন্ন" : "Land Purchased"}
                </p>
                <p className="text-[11px] text-grey-700">
                  {locale === "bn" ? "পরিকল্পনা অনুযায়ী ২০২৩ সালে" : "As per plan in 2023"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-serif text-3xl sm:text-4xl text-green-900 font-medium">
                  <CountUp end={4} duration={1} />
                </div>
                <p className="text-xs uppercase tracking-wider text-grey-700 font-medium">
                  {locale === "bn" ? "কোর প্রকল্প" : "Core Projects"}
                </p>
                <p className="text-[11px] text-grey-700">
                  {locale === "bn" ? "হোটেল, স্বাস্থ্য ও ইকো-রিসোর্ট" : "Hotel, Hospital & Resort"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-serif text-3xl sm:text-4xl text-green-900 font-medium">
                  <CountUp end={4} duration={1} />
                </div>
                <p className="text-xs uppercase tracking-wider text-grey-700 font-medium">
                  {locale === "bn" ? "মালিকানা প্যাকেজ" : "Ownership Tiers"}
                </p>
                <p className="text-[11px] text-grey-700">
                  {locale === "bn" ? "প্লাটিনাম থেকে ব্রোঞ্জ স্তর" : "Platinum to Bronze tiers"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

