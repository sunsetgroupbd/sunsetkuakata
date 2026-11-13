"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Scale, FileText, TrendingUp, HeartHandshake, Landmark } from "lucide-react";

export function WhyInvest() {
  const { locale } = useLanguage();

  const cards = [
    {
      icon: Scale,
      titleEn: "Company Act 1994 Governance",
      titleBn: "কোম্পানি আইন ১৯৯৪ এর আওতাভুক্ত",
      descEn: "Sunset Kuakata Hotel & Resort Limited is a private limited company registered and strictly governed under the Company Act 1994.",
      descBn: "সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট লিমিটেড কোম্পানি আইন ১৯৯৪-এর অধীন নিবন্ধিত এবং পরিচালিত একটি প্রাইভেট লিমিটেড কোম্পানি।",
    },
    {
      icon: ShieldCheck,
      titleEn: "Halal Investment & Shariah Supervision",
      titleBn: "হালাল বিনিয়োগ ও শরীয়াহ তদারকি",
      descEn: "A dedicated Shariah supervisory committee has been formed to ensure all hospitality and revenue practices adhere to halal standards.",
      descBn: "ব্যবসা ও মুনাফার সকল স্তরে হালাল নীতিমালা অনুসরণে একটি যোগ্য শরীয়াহ তদারকি কমিটি গঠন করা হয়েছে।",
    },
    {
      icon: FileText,
      titleEn: "Saf-Kabala Registration",
      titleBn: "সাফ-কবালা দলিলের মাধ্যমে মালিকানা",
      descEn: "Lifetime tangible asset ownership backed by official saf-kabala registration for applicable healthcare and resort properties.",
      descBn: "সান কেয়ার হসপিটাল ও ঢাকা ফ্যান্টাসি আইল্যান্ডে সাফ-কবালা রেজিস্ট্রেশনের মাধ্যমে আজীবন মালিকানার সুযোগ।",
    },
    {
      icon: Landmark,
      titleEn: "Asset Diversification & Inheritance",
      titleBn: "সম্পদ বহুমুখীকরণ ও ভবিষ্যৎ নিরাপত্তা",
      descEn: "Real estate and healthcare assets provide permanent wealth building, legal inheritance security, and portfolio diversification.",
      descBn: "স্থায়ী সম্পদে অংশীদারিত্বের মাধ্যমে ভবিষ্যৎ প্রজন্মের জন্য উত্তরাধিকারের নিরাপত্তা এবং বহুমুখী সম্পদের সুরক্ষা।",
    },
    {
      icon: TrendingUp,
      titleEn: "Fast-Growing Sectors",
      titleBn: "দ্রুত বর্ধনশীল খাতসমূহ",
      descEn: "Healthcare and tourism represent dynamic growth sectors in Bangladesh, driven by infrastructure improvements and rising demand.",
      descBn: "উন্নত যোগাযোগ ব্যবস্থা ও ক্রমবর্ধমান চাহিদার কারণে স্বাস্থ্যসেবা ও উপকূলীয় পর্যটন দেশের দ্রুত বর্ধনশীল ক্ষেত্র।",
    },
    {
      icon: HeartHandshake,
      titleEn: "Tangible Healthcare Benefits",
      titleBn: "স্বাস্থ্যসেবায় বিশেষ অংশীদারী সুবিধা",
      descEn: "Sun Care Hospital investors + 20 nominated people get medical services at institutional cost, plus annual sales & service profit.",
      descBn: "সান কেয়ারের বিনিয়োগকারী ও মনোনীত ২০ জন নিজস্ব খরচে চিকিৎসা সেবা পাবেন এবং বিক্রয় ও সেবা থেকে বার্ষিক অংশীদারী মুনাফা পাবেন।",
    },
  ];

  return (
    <section className="bg-ash py-20 md:py-28 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            {locale === "bn" ? "বিনিয়োগের সুনির্দিষ্ট ভিত্তি" : "Core Investment Pillars"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
            {locale === "bn"
              ? "আইনগত স্বচ্ছতা ও বাস্তব সম্পদ কাঠামো"
              : "Structured for Stability and Lawful Growth"}
          </h2>
          <p className="text-base text-grey-700">
            {locale === "bn"
              ? "আমাদের প্রতিটি প্রকল্পে আইনগত নিবন্ধন, শরীয়াহ তদারকি ও বাস্তব দলিলের নিশ্চয়তা বিদ্যমান।"
              : "Every project operates under transparent statutory compliance, formed Shariah supervision, and registered title documentation."}
          </p>
        </div>

        {/* 6 Solid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} variant="white" className="space-y-4 hover:border-ink/30 transition-colors">
                <div className="w-10 h-10 border border-ink/10 bg-sand flex items-center justify-center text-green-900">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-ink">
                  {locale === "bn" ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-grey-700 leading-relaxed">
                  {locale === "bn" ? item.descBn : item.descEn}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

