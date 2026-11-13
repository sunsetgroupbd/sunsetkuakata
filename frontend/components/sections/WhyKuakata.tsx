"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { WaveBand } from "@/components/svg/WaveBand";
import { Compass, Sun, Map, Shield, Plane, Sparkles } from "lucide-react";

export function WhyKuakata() {
  const { locale } = useLanguage();

  const points = [
    {
      icon: Sun,
      titleEn: "Sunrise, Sunset & Sundarbans in One Frame",
      titleBn: "এক ফ্রেমে সূর্যোদয়, সূর্যাস্ত ও সুন্দরবন",
      descEn: "One of the rare beaches globally where you witness both dawn and dusk over water, adjacent to the Sundarbans mangrove forest.",
      descBn: "বিশ্বের বিরল সৈকতগুলোর একটি যেখানে একই স্থান থেকে সূর্যোদয় ও সূর্যাস্ত দেখা যায় এবং কাছেই রয়েছে সুন্দরবন।",
    },
    {
      icon: Map,
      titleEn: "Under the KTC Master Plan",
      titleBn: "কেটিসি (KTC) মাস্টার প্ল্যানের আওতাভুক্ত",
      descEn: "Planned under the government's Kuakata Tourism City Master Plan for long-term sustainable coastal zoning and modern infrastructure.",
      descBn: "কুয়াকাটা পর্যটন নগরী (KTC) মহাপরিকল্পনার আওতায় সমন্বিত ও পরিবেশবান্ধব পর্যটন অবকাঠামো তৈরি হচ্ছে।",
    },
    {
      icon: Shield,
      titleEn: "Outside Earthquake-Prone Zone",
      titleBn: "ভূমিকম্পপ্রবণ অঞ্চলের বাইরে অবস্থিত",
      descEn: "Strategically located in a region outside high-risk seismic zones, enhancing long-term structural safety of real assets.",
      descBn: "উচ্চ ঝুঁকিপূর্ণ ভূমিকম্প অঞ্চলের বাইরে অবস্থিত হওয়ায় দীর্ঘমেয়াদে অবকাঠামোর স্থায়িত্ব ও নিরাপত্তা অধিকতর সুদৃঢ়।",
    },
    {
      icon: Plane,
      titleEn: "Improved Regional Connectivity",
      titleBn: "উন্নত ও আধুনিক যোগাযোগ ব্যবস্থা",
      descEn: "Accelerated accessibility via modern bridges (Padma & Payra), upgraded express highways, and planned regional airport links.",
      descBn: "পদ্মা ও পায়রা সেতু, আধুনিক এক্সপ্রেসওয়ে এবং প্রস্তাবিত বিমান সংযোগের মাধ্যমে কুয়াকাটায় ভ্রমণ এখন অত্যন্ত সহজ।",
    },
    {
      icon: Compass,
      titleEn: "Rising Numbers & Low Competition",
      titleBn: "পর্যটকের দ্রুত বৃদ্ধি ও কম প্রতিযোগিতা",
      descEn: "Surging tourist arrivals year-round with limited five-star quality hotel options, creating prime opportunity for premium hospitality.",
      descBn: "সারাবছর বিপুল পর্যটকের আগমন থাকলেও মানসম্পন্ন ফাইভ-স্টার হোটেলের স্বল্পতা থাকায় বাজারে শক্ত অবস্থান তৈরির সুযোগ।",
    },
    {
      icon: Sparkles,
      titleEn: "Two Prime Hotel Ownerships",
      titleBn: "প্রাইম লোকেশনে দুটি হোটেল মালিকানা",
      descEn: "The Kuakata Combo project encompasses two prime location hotel ownerships in the most sought-after tourist nodes.",
      descBn: "কুয়াকাটা কম্বো প্রকল্পের আওতায় সবচেয়ে গুরুত্বপূর্ণ পর্যটন পয়েন্টে দুটি হোটেলের মালিকানা প্রাপ্তির সুবিধা।",
    },
  ];

  return (
    <section className="bg-green-900 text-paper relative overflow-hidden">
      {/* Wave divider at top */}
      <WaveBand className="opacity-90" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-sand/70">
            {locale === "bn" ? "ভৌগোলিক ও কৌশলগত প্রাধান্য" : "Strategic Destination"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-paper leading-tight">
            {locale === "bn"
              ? "কেন কুয়াকাটায় প্রথম ফাইভ-স্টার সমমানের হোটেল?"
              : "Why Kuakata: Coastal Potential & Natural Wonder"}
          </h2>
          <p className="text-base text-sand/80 leading-relaxed">
            {locale === "bn"
              ? "প্রাকৃতিক সৌন্দর্য, সরকারি মাস্টার প্ল্যান এবং আধুনিক যোগাযোগ ব্যবস্থা কুয়াকাটাকে দেশের অন্যতম শীর্ষ পর্যটন কেন্দ্রে রূপান্তর করেছে।"
              : "Positioned directly under the Kuakata Tourism City Master Plan, Sunset Kuakata Hotel & Resort offers unmatched coastal hospitality with international tourism potential."}
          </p>
        </div>

        {/* Grid of 6 Solid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="border border-paper/15 p-6 md:p-8 bg-green-900/40 space-y-4 hover:border-paper/40 transition-colors"
              >
                <div className="w-10 h-10 border border-sand/30 flex items-center justify-center text-sand">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-paper">
                  {locale === "bn" ? pt.titleBn : pt.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-sand/80 leading-relaxed">
                  {locale === "bn" ? pt.descBn : pt.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wave divider at bottom */}
      <WaveBand className="opacity-90 rotate-180" />
    </section>
  );
}

