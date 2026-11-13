"use client";

import React from "react";
import { FAQ } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

interface FaqSectionProps {
  faqs: FAQ[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const { locale, t } = useLanguage();

  const items: AccordionItem[] = faqs.map((faq) => ({
    id: faq.id,
    title: t(faq, "question"),
    content: t(faq, "answer"),
  }));

  return (
    <section className="bg-ash py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Context (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
              {locale === "bn" ? "প্রয়োজনীয় প্রশ্নোত্তর" : "Common Inquiries"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
              {locale === "bn"
                ? "আইনগত ও প্রকল্প সংক্রান্ত স্বচ্ছ ধারণা"
                : "Legal Framework and Investment Clarity"}
            </h2>
            <p className="text-sm text-grey-700 leading-relaxed">
              {locale === "bn"
                ? "কোম্পানি আইন ১৯৯৪, শরীয়াহ তদারকি কমিটি, সাফ-কবালা দলিলের মাধ্যমে মালিকানা এবং বিভিন্ন প্যাকেজের কার্যপদ্ধতি সম্পর্কে সচরাচর জিজ্ঞাসিত প্রশ্নাবলী।"
                : "Clear, factual answers regarding our registration under Company Act 1994, Shariah oversight, saf-kabala registration, and partnership frameworks."}
            </p>
          </div>

          {/* Right Column: Accordion (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-ink/10 p-6 sm:p-8">
            <Accordion items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}

