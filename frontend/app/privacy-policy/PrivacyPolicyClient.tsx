"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export function PrivacyPolicyClient() {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  if (isBn) {
    return (
      <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            গোপনীয়তা নীতি (Privacy Policy)
          </h1>
          <div className="prose max-w-none text-grey-700 space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট লিমিটেড (“সানসেট গ্রুপ”, “আমরা”) আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। আমাদের কর্পোরেট ওয়েবসাইট (sunsetkuakatahotel.com) ব্যবহারের মাধ্যমে সংগৃহীত তথ্যাবলী কীভাবে সংরক্ষিত ও পরিচালিত হয়, তা এই নীতিমালায় ব্যাখ্যা করা হয়েছে।
            </p>
            <h2 className="font-serif text-xl text-ink font-semibold">১. সংগৃহীত তথ্যাবলী</h2>
            <p>
              আমাদের যোগাযোগ ও অনুসন্ধান ফরমের মাধ্যমে আপনি স্বেচ্ছায় যে সকল তথ্য প্রদান করেন (যেমন: পূর্ণ নাম, বাংলাদেশি ফোন নম্বর, ইমেইল ঠিকানা, এবং প্রকল্প বা প্যাকেজ সংক্রান্ত পছন্দ), আমরা কেবল সেই তথ্যাবলী সংরক্ষণ করি।
            </p>
            <h2 className="font-serif text-xl text-ink font-semibold">২. তথ্যের ব্যবহার</h2>
            <p>
              প্রদত্ত তথ্যাবলী কেবল আপনার অনুসন্ধানের উত্তর প্রদান, প্রকল্পের অফিসিয়াল নথিপত্র সরবরাহ এবং হোটেল ও স্বাস্থ্যসেবা প্রকল্পের মালিকানা সংক্রান্ত সরাসরি পরামর্শের জন্য ব্যবহৃত হয়।
            </p>
            <h2 className="font-serif text-xl text-ink font-semibold">৩. তথ্যের নিরাপত্তা ও কর্পোরেট সুরক্ষা</h2>
            <p>
              “কোম্পানি আইন ১৯৯৪” এর বিধিবদ্ধ নীতিমালা অনুসারে সকল বিনিয়োগকারী ও ক্লায়েন্টের তথ্য কঠোর গোপনীয়তার সাথে সংরক্ষণ করা হয়। আমরা কোনো অবস্থাতেই তৃতীয় পক্ষের কাছে কোনো ব্যক্তিগত তথ্য বিক্রয় বা হস্তান্তর করি না।
            </p>
            <h2 className="font-serif text-xl text-ink font-semibold">৪. যোগাযোগ ও জিজ্ঞাসা</h2>
            <p>
              আপনার ব্যক্তিগত তথ্য বা গোপনীয়তা নীতিমালা সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদের প্রধান কার্যালয়ে (২৭ সপ্তক স্কয়ার, লেভেল-১১, পুরাতন ধানমন্ডি ২৭, ঢাকা-১২০৯) যোগাযোগ করতে পারেন অথবা সরাসরি কল করুন: +৮৮০১৩২৫০৭৪৫৩৫।
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">Privacy Policy</h1>
        <div className="prose max-w-none text-grey-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            Sunset Kuakata Hotel & Resort Limited (&ldquo;Sunset Group&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy outlines how we handle personal data collected through our corporate website (sunsetkuakatahotel.com).
          </p>
          <h2 className="font-serif text-xl text-ink font-semibold">1. Information We Collect</h2>
          <p>
            We collect personal details that you voluntarily submit via our inquiry and contact forms, including your full name, Bangladeshi phone number, email address, and project/package preferences.
          </p>
          <h2 className="font-serif text-xl text-ink font-semibold">2. Use of Information</h2>
          <p>
            Submitted information is solely utilized to respond to your ownership inquiries, provide certified corporate project documentation, and facilitate consultation regarding our hospitality and healthcare assets.
          </p>
          <h2 className="font-serif text-xl text-ink font-semibold">3. Data Security & Governance</h2>
          <p>
            In compliance with Company Act 1994 governance, client inquiries and ownership registers are held under strict confidentiality. We do not sell or distribute personal information to third parties.
          </p>
          <h2 className="font-serif text-xl text-ink font-semibold">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding your personal information, please contact us at 27 Shaptak Square, Level-11, Old Dhanmondi 27, Dhaka-1209 or call +8801325074535.
          </p>
        </div>
      </div>
    </div>
  );
}

