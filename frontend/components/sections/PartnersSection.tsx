"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { partnerLogos, mouSigningPhotos } from "@/data/partners";

export function PartnersSection() {
  const { locale } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header from Brochure Image 2 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.18em] font-semibold text-green-900 block">
            {locale === "bn" ? "সম্মানিত অংশীদারিত্ব" : "Esteemed Partnerships"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink font-semibold leading-tight">
            {locale === "bn"
              ? "সম্মানিত অংশীদারদের সাথে সমঝোতা স্মারক স্বাক্ষর"
              : "We are Honoured to sign a Memorandum of Understanding with Our Esteemed Partners."}
          </h2>
          <p className="font-serif text-sm sm:text-base text-grey-700 italic">
            {locale === "bn"
              ? "একটি সম্ভাবনাময় যৌথ সহযোগিতার শুভ সূচনা।"
              : "Marking the beginning of a promising collaboration."}
          </p>
          <div className="w-12 h-[3px] bg-green-900 mx-auto mt-2" />
        </div>

        {/* Real Photo Grid: MoU Signings from public/images/ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {mouSigningPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-ink/10 bg-sand"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                <span className="text-[11px] text-white leading-tight">
                  {locale === "bn" ? photo.captionBn : photo.captionEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos Banner matching Image 2 */}
        <div className="pt-8 border-t border-ink/10 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-lg sm:text-xl text-ink font-semibold">
              {locale === "bn"
                ? "সানসেট মালিকগণ নিম্নলিখিত সংস্থাসমূহ থেকে বিশেষ সুবিধা লাভ করবেন"
                : "Sunset owners will receive special benefits from the following companies."}
            </h3>
            <p className="text-xs text-grey-700">
              {locale === "bn"
                ? "স্বাস্থ্যসেবা, ডায়াগনস্টিক ও কর্পোরেট সেবা অংশীদারবৃন্দ"
                : "Healthcare, diagnostic, clinical, and corporate benefits partners"}
            </p>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
            {partnerLogos.map((partner) => (
              <div
                key={partner.id}
                className="border border-ink/10 bg-white p-3 rounded-xl h-20 flex items-center justify-center hover:border-ink/30 transition-colors"
                title={partner.name}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

