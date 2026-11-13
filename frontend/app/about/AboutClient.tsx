"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { Target, Rocket, Scale, ShieldCheck, Landmark } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Leader {
  name: string;
  roleEn: string;
  roleBn: string;
}

const leaders: Leader[] = [
  {
    name: "Engr. Monjurrul Hasan Khan",
    roleEn: "Chairman",
    roleBn: "চেয়ারম্যান",
  },
  {
    name: "S. M. Shahjahan",
    roleEn: "Managing Director",
    roleBn: "ব্যবস্থাপনা পরিচালক",
  },
  {
    name: "Emdadul Haque",
    roleEn: "Additional Managing Director",
    roleBn: "অতিরিক্ত ব্যবস্থাপনা পরিচালক",
  },
  {
    name: "Engr. Ibrahim Khalil Nahid",
    roleEn: "Deputy Managing Director",
    roleBn: "উপ-ব্যবস্থাপনা পরিচালক",
  },
  {
    name: "Protiva Shaon",
    roleEn: "Director",
    roleBn: "পরিচালক",
  },
  {
    name: "Shahinu Akter (Joya)",
    roleEn: "Director",
    roleBn: "পরিচালক",
  },
];

export function AboutClient() {
  const { locale } = useLanguage();

  return (
    <div className="bg-white min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ======================================================== */}
        {/* 1. HERO / TITLE SECTION                                  */}
        {/* ======================================================== */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-green-900 block">
            {locale === "bn" ? "আমাদের কথা" : "Our Story"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight font-semibold">
            {locale === "bn"
              ? "একটি স্বপ্ন, প্রকৃতির কোলে এক নতুন ঠিকানা"
              : "A Dream, A New Haven in Nature's Lap"}
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-green-900">
            {locale === "bn"
              ? "“Luxury & Recreation with Ethical Hospitality” (নৈতিক আতিথেয়তার মাধ্যমে বিলাসিতা ও বিনোদন)"
              : "“Luxury & Recreation with Ethical Hospitality”"}
          </p>
          <p className="text-base sm:text-lg text-grey-700 leading-relaxed pt-2">
            {locale === "bn" ? (
              <>
                কুয়াকাটার নৈসর্গিক সৌন্দর্যকে বিশ্বমানের আতিথেয়তার সাথে এক সুতোয় বাঁধার স্বপ্ন নিয়ে যাত্রা শুরু করেছে{" "}
                <strong className="text-ink font-semibold">Sunset Kuakata Hotel & Resort Ltd</strong>। প্রকৃতির অনুপ্রেরণায় অনুপ্রাণিত হয়ে এবং বিশেষভাবে অতিথিদের জন্য ডিজাইন করা আমাদের এই হোটেল ও রিসোর্টটি কুয়াকাটায় প্রথম পাঁচ তারকা সমমানের অভিজ্ঞতা নিশ্চিত করতে অঙ্গীকারবদ্ধ।
              </>
            ) : (
              <>
                Sunset Kuakata Hotel & Resort Ltd. embarked on its journey with the vision of uniting the natural splendor of Kuakata with world-class hospitality. Inspired by nature and designed specifically for our valued guests, our hotel and resort is dedicated to delivering the premier five-star standard experience in Kuakata.
              </>
            )}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. FEATURED BRAND BANNER                                 */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-ink/10 bg-ash/50 rounded-2xl p-6 sm:p-10">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#12406E] block">
              {locale === "bn" ? "নৈতিক আতিথেয়তা ও হালাল বিনিয়োগ" : "Ethical Hospitality & Halal Investment"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold leading-snug">
              {locale === "bn"
                ? "আধুনিক সুযোগ-সুবিধা ও প্রাকৃতিক পরিবেশের অনন্য মেলবন্ধন"
                : "The Harmonious Fusion of Modern Luxury & Natural Serenity"}
            </h2>
            <p className="text-sm sm:text-base text-grey-700 leading-relaxed">
              {locale === "bn"
                ? "সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট একটি দূরদর্শী উদ্যোগ যা বাংলাদেশের দক্ষিণাঞ্চলের পর্যটন শিল্পে নতুন দিগন্ত উন্মোচন করতে প্রতিশ্রুতিবদ্ধ। সূর্যোদয় ও সূর্যাস্তের অপরূপ লীলাভূমি কুয়াকাটায় পরিবেশবান্ধব ও টেকসই পর্যটন অবকাঠামো নির্মাণের মাধ্যমে আমরা গড়ে তুলছি শান্তি ও বিলাসিতার সেরা ঠিকানা।"
                : "Sunset Kuakata Hotel & Resort is a visionary hospitality development committed to pioneering a new era in southern Bangladesh tourism. By building sustainable, eco-friendly tourism infrastructure in Kuakata—the rare land where both sunrise and sunset meet the sea—we are crafting the ultimate sanctuary of peace and luxury."}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/projects" variant="primary">
                {locale === "bn" ? "আমাদের প্রকল্পসমূহ দেখুন" : "Explore Our Projects"}
              </Button>
              <Button href="/contact" variant="outline">
                {locale === "bn" ? "যোগাযোগ ও পরামর্শ" : "Consultation & Contact"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[16/11] rounded-xl overflow-hidden border border-ink/10 bg-white shadow-sm">
            <Image
              src="/images/hero1.jpg"
              alt="Sunset Kuakata Coastline & Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. VISION & MISSION                                      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="border border-green-900/20 bg-white rounded-2xl p-6 sm:p-10 space-y-4 shadow-sm hover:border-green-900/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-green-900/10 text-green-900 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink">
              {locale === "bn" ? "আমাদের ভিশন" : "Our Vision"}
            </h3>
            <p className="text-sm sm:text-base text-grey-700 leading-relaxed">
              {locale === "bn"
                ? "বাংলাদেশের পর্যটন শিল্পকে আন্তর্জাতিক মানে উন্নীত করা এবং দেশীয় ও বিদেশী পর্যটকদের জন্য বিশ্বমানের আতিথেয়তা সেবা প্রদান করা। কুয়াকাটাকে দক্ষিণ এশিয়ার অন্যতম পর্যটন গন্তব্য হিসেবে প্রতিষ্ঠিত করা।"
                : "To elevate the tourism industry of Bangladesh to international standards and provide world-class hospitality services for domestic and international travelers. To establish Kuakata as a leading premier destination across South Asia."}
            </p>
          </div>

          {/* Mission */}
          <div className="border border-[#12406E]/20 bg-white rounded-2xl p-6 sm:p-10 space-y-4 shadow-sm hover:border-[#12406E]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#12406E]/10 text-[#12406E] flex items-center justify-center">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink">
              {locale === "bn" ? "আমাদের মিশন" : "Our Mission"}
            </h3>
            <p className="text-sm sm:text-base text-grey-700 leading-relaxed">
              {locale === "bn"
                ? "পরিবেশবান্ধব এবং টেকসই পর্যটন অবকাঠামো নির্মাণের মাধ্যমে স্থানীয় অর্থনীতিতে অবদান রাখা। আন্তর্জাতিক মানসম্পন্ন হোটেল, রিসোর্ট ও মোটেল প্রতিষ্ঠার মাধ্যমে হাজার হাজার মানুষের কর্মসংস্থান সৃষ্টি করা।"
                : "To contribute directly to the regional and national economy through eco-friendly and sustainable tourism infrastructure. To create thousands of high-value employment opportunities by establishing international-standard hotels, resorts, and eco-lodges."}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. OUR STORY (আমাদের গল্প)                                */}
        {/* ======================================================== */}
        <div className="border border-ink/10 bg-white rounded-2xl p-6 sm:p-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-green-900 block">
              {locale === "bn" ? "আমাদের যাত্রা" : "Our Journey"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
              {locale === "bn" ? "আমাদের গল্প" : "Our Story"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm sm:text-base text-grey-700 leading-relaxed">
            <div className="space-y-3">
              <p>
                {locale === "bn"
                  ? "সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট একটি দূরদর্শী প্রকল্প যা বাংলাদেশের দক্ষিণাঞ্চলের পর্যটন শিল্পে বিপ্লব আনতে প্রতিশ্রুতিবদ্ধ।"
                  : "Sunset Kuakata Hotel and Resort is a visionary project committed to revolutionizing tourism across southern Bangladesh."}
              </p>
              <p>
                {locale === "bn"
                  ? "কুয়াকাটা সমুদ্র সৈকত, যা সূর্যোদয় এবং সূর্যাস্ত উভয়ই দেখা যায় এমন একটি বিরল স্থান, তার প্রাকৃতিক সৌন্দর্যকে কাজে লাগিয়ে আমরা তৈরি করছি এক অনন্য অভিজ্ঞতা।"
                  : "Utilizing the pristine beauty of Kuakata beach—a rare geographical wonder showcasing both sunrise and sunset—we are creating an incomparable hospitality experience."}
              </p>
            </div>
            <div className="space-y-3">
              <p>
                {locale === "bn"
                  ? "আমাদের প্রতিষ্ঠাতারা বিশ্বাস করেন যে বাংলাদেশের পর্যটন খাতে রয়েছে অপার সম্ভাবনা।"
                  : "Our founders believe in the tremendous untapped potential of Bangladesh's tourism industry."}
              </p>
              <p>
                {locale === "bn"
                  ? "দেশীয় এবং আন্তর্জাতিক পর্যটকদের জন্য বিশ্বমানের সুবিধা প্রদানের মাধ্যমে আমরা এই অঞ্চলকে একটি প্রিমিয়াম পর্যটন গন্তব্যে রূপান্তরিত করছি।"
                  : "By delivering world-class amenities to domestic and global travelers, we are transforming this coastal paradise into a premier luxury destination."}
              </p>
            </div>
            <div className="space-y-3">
              <p>
                {locale === "bn"
                  ? "আমাদের পরিকল্পনায় রয়েছে আধুনিক সুবিধা সম্পন্ন হোটেল, লাক্সারি রিসোর্ট, পরিবেশবান্ধব মোটেল এবং বিনোদন কেন্দ্র।"
                  : "Our comprehensive master plan includes high-end hotels, luxury villas, eco-friendly resorts, and recreational facilities."}
              </p>
              <p>
                {locale === "bn"
                  ? "প্রতিটি প্রকল্প ডিজাইন করা হয়েছে স্থানীয় সংস্কৃতি এবং আধুনিকতার নিখুঁত সমন্বয়ে।"
                  : "Every development is thoughtfully engineered as a seamless blend of local heritage and modern architectural luxury."}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. LEADERSHIP BOARD (আমাদের নেতৃত্বে)                     */}
        {/* ======================================================== */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-green-900 block">
              {locale === "bn" ? "পরিচালনা পর্ষদ" : "Board of Directors"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
              {locale === "bn" ? "আমাদের নেতৃত্বে" : "Our Leadership"}
            </h2>
            <p className="text-sm text-grey-700">
              {locale === "bn"
                ? "অভিজ্ঞ প্রকৌশলী, করপোরেট উদ্যোক্তা ও দক্ষ ব্যবস্থাপকদের সমন্বয়ে গঠিত আমাদের পরিচালনা পর্ষদ।"
                : "Guided by accomplished engineers, corporate leaders, and seasoned hospitality executives."}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="border border-ink/10 bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-7 space-y-3 sm:space-y-4 hover:border-green-900/40 shadow-xs hover:shadow-sm transition-all group"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-ash border border-ink/10 flex items-center justify-center text-green-900 font-serif font-bold text-sm sm:text-lg group-hover:bg-green-900 group-hover:text-white transition-colors duration-200 flex-shrink-0">
                    {leader.name
                      .split(" ")
                      .filter((p) => !p.includes("."))
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-green-900 block line-clamp-1">
                      {locale === "bn" ? leader.roleBn : leader.roleEn}
                    </span>
                    <h3 className="font-serif text-xs sm:text-lg font-semibold text-ink leading-snug line-clamp-2">
                      {leader.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. STATUTORY & SHARIAH PILLARS                            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 pt-4">
          <Card variant="sand" className="space-y-2 sm:space-y-3 p-4 sm:p-6">
            <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-green-900" />
            <h3 className="font-serif text-sm sm:text-lg font-semibold text-ink">Company Act 1994</h3>
            <p className="text-[11px] sm:text-sm text-grey-700 leading-relaxed">
              {locale === "bn"
                ? "কোম্পানি আইন ১৯৯৪ অনুযায়ী সম্পূর্ণ বিধিবদ্ধভাবে নিবন্ধিত ও পরিচালিত প্রাইভেট লিমিটেড প্রতিষ্ঠান।"
                : "A statutory private limited entity registered and governed under the Company Act 1994."}
            </p>
          </Card>

          <Card variant="sand" className="space-y-2 sm:space-y-3 p-4 sm:p-6">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-900" />
            <h3 className="font-serif text-sm sm:text-lg font-semibold text-ink">
              {locale === "bn" ? "শরীয়াহ তত্ত্বাবধান কমিটি" : "Shariah Supervisory Committee"}
            </h3>
            <p className="text-[11px] sm:text-sm text-grey-700 leading-relaxed">
              {locale === "bn"
                ? "হালাল বিনিয়োগ ও নৈতিক মুনাফা কাঠামো নিশ্চিত করতে গঠিত স্বাধীন শরীয়াহ পর্যবেক্ষণ পর্ষদ।"
                : "Independent Shariah supervisory board ensuring halal revenue frameworks and ethical profit distribution."}
            </p>
          </Card>

          <Card variant="sand" className="space-y-2 sm:space-y-3 p-4 sm:p-6 col-span-2 md:col-span-1">
            <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-green-900" />
            <h3 className="font-serif text-sm sm:text-lg font-semibold text-ink">
              {locale === "bn" ? "সাফ-কবালা আইনগত মালিকানা" : "Saf-Kabala Legal Title"}
            </h3>
            <p className="text-[11px] sm:text-sm text-grey-700 leading-relaxed">
              {locale === "bn"
                ? "সাব-রেজিস্ট্রি অফিসের মাধ্যমে আজীবন হস্তান্তরযোগ্য ও সুরক্ষিত সাফ-কবালা রেজিস্ট্রেশন দলিল।"
                : "Lifetime inheritable and secure ownership deeds executed through statutory Sub-Registry offices."}
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
}

