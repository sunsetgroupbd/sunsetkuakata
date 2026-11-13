"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { familyOwnerPhotos } from "@/data/partners";
import { ShieldCheck, FileCheck } from "lucide-react";

export function FamilySection() {
  const { locale } = useLanguage();

  return (
    <section className="bg-ash py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching Brochure Right Page in Image 2 */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-green-900/20 text-xs font-semibold text-green-900 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>{locale === "bn" ? "সাফ-কবালা দলিল সম্পন্ন" : "Saf-Kabala Milestone"}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            {locale === "bn" ? "তারা আমাদের পরিবারের অংশ" : "They are part of our family."}
          </h2>

          <p className="font-serif text-base sm:text-lg text-green-900 font-medium">
            {locale === "bn"
              ? "সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট লি. ইতোমধ্যে সফলভাবে সাফ-কবালা রেজিস্ট্রেশন সম্পন্ন করেছে।"
              : "Sunset Kuakata Hotel & Resort Ltd. has already completed the Saf Kabla registration."}
          </p>

          <p className="text-xs sm:text-sm text-grey-700 max-w-lg mx-auto">
            {locale === "bn"
              ? "মালিকানা দলিলের স্বচ্ছতা, প্রাতিষ্ঠানিক জবাবদিহিতা এবং ভবিষ্যৎ প্রজন্মের জন্য স্থায়ী সম্পদ নিশ্চিতকরণ।"
              : "Real investors and families receiving permanent legal ownership documents and joining our growing community."}
          </p>
          <div className="w-12 h-[3px] bg-green-900 mx-auto" />
        </div>

        {/* Real Owners Photo Mosaic from public/images/ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {familyOwnerPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`group relative rounded-xl overflow-hidden border border-ink/10 bg-white ${
                idx === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <FileCheck className="w-5 h-5 text-sand mb-1" />
                <p className="text-xs font-medium leading-snug">
                  {locale === "bn" ? photo.captionBn : photo.captionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

