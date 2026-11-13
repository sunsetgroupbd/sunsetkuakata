"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export function TermsClient() {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  if (isBn) {
    return (
      <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            ব্যবহারের শর্তাবলী (Terms & Conditions)
          </h1>
          <div className="prose max-w-none text-grey-700 space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              সানসেট গ্রুপ (sunsetkuakatahotel.com) এর অফিসিয়াল ওয়েবসাইটে আপনাকে স্বাগতম। এটি “কোম্পানি আইন ১৯৯৪” দ্বারা নিবন্ধিত ও পরিচালিত একটি প্রাইভেট লিমিটেড প্রতিষ্ঠান Sunset Kuakata Hotel & Resort Limited কর্তৃক পরিচালিত।
            </p>
            <h2 className="font-serif text-xl text-ink font-semibold">১. তথ্যের প্রকৃতি ও বিবরণ</h2>
            <p>
              এই ওয়েবসাইটে উপস্থাপিত সমস্ত তথ্য আমাদের বাস্তব প্রকল্পসমূহ, সম্পদ মালিকানা প্যাকেজ এবং প্রাতিষ্ঠানিক কাঠামোর বর্ণনামূলক ব্যাখ্যার জন্য প্রদত্ত। এখানে প্রদর্শিত কোনো তথ্য পূর্বনির্ধারিত বা নিশ্চিত লাভের প্রতিশ্রুতি প্রদান করে না; সকল ফলাফল প্রকৃত হোটেল ও হাসপাতাল পরিচালনার ফলাফলের ওপর নির্ভরশীল।
            </p>
            <h2 className="font-serif text-xl text-ink font-semibold">২. বৈধ মালিকানা ও রেজিস্ট্রিকৃত চুক্তি</h2>
            <p>
              আইনগত মালিকানা ও অংশীদারী দলিল (প্রযোজ্য ক্ষেত্রে সাব-রেজিস্ট্রি অফিসের মাধ্যমে সাফ-কবালা রেজিস্ট্রেশন) যাচাইকৃত আইনি নথিপত্রের মাধ্যমে সম্পাদিত হয়। অনলাইন ক্যালকুলেটর ও আর্থিক বিবরণী কেবলমাত্র প্রক্ষেপণমূলক ধারণা প্রদানের উদ্দেশ্যে তৈরি।
            </p>
            <h2 className="font-serif text-xl text-ink font-semibold">৩. মেধা সম্পদ ও স্বত্বাধিকার</h2>
            <p>
              এই ওয়েবসাইটে প্রদর্শিত সকল ট্রেডমার্ক, লোগো, পাঠ্যবস্তু, স্থাপত্য নকশা এবং আলোকচিত্র Sunset Kuakata Hotel & Resort Limited এর আইনগত সম্পত্তি। অনুমতি ব্যতীত এগুলো বাণিজ্যিক উদ্দেশ্যে পুনঃব্যবহার সম্পূর্ণ নিষিদ্ধ।
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">Terms & Conditions</h1>
        <div className="prose max-w-none text-grey-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            Welcome to the corporate website of Sunset Group (sunsetkuakatahotel.com), operated by Sunset Kuakata Hotel & Resort Limited, a private limited company registered and governed by the Company Act 1994.
          </p>
          <h2 className="font-serif text-xl text-ink font-semibold">1. Nature of Content</h2>
          <p>
            The content provided on this website is for informational purposes describing our real asset developments, ownership packages, and corporate framework. Nothing on this website constitutes a promise of guaranteed returns or risk-free financial outcomes.
          </p>
          <h2 className="font-serif text-xl text-ink font-semibold">2. Ownership and Formal Contracts</h2>
          <p>
            Formal ownership and partnership deeds (including saf-kabala registration where applicable) are executed individually under verified legal documentation. Online calculators and figures provide illustrative structures only.
          </p>
          <h2 className="font-serif text-xl text-ink font-semibold">3. Intellectual Property</h2>
          <p>
            All trademarks, logos, texts, architectural designs, and imagery presented on this platform are the property of Sunset Kuakata Hotel & Resort Limited.
          </p>
        </div>
      </div>
    </div>
  );
}

