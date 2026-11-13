"use client";

import React from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";

interface GalleryClientProps {
  items: GalleryItem[];
}

export function GalleryClient({ items }: GalleryClientProps) {
  const { locale, t } = useLanguage();
  const isBn = locale === "bn";

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className={`text-xs uppercase font-medium text-grey-700 block ${isBn ? "tracking-normal" : "tracking-[0.18em]"}`}>
            {isBn ? "দৃশ্যমান ডকুমেন্টেশন" : "Visual Documentation"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold">
            {isBn ? "প্রকল্প ও সাইট গ্যালারি" : "Project & Site Gallery"}
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            {isBn
              ? "কুয়াকাটা উপকূলের সূর্যোদয়, সূর্যাস্ত, সমুদ্র সৈকত এবং বাস্তব প্রকল্প উন্নয়নের আলোকচিত্র।"
              : "Real photography from the Kuakata coastal region showcasing sunrise, sunset, fishing fleets, and site developments."}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => {
            const caption = isBn ? item.captionBn : item.captionEn;

            return (
              <div
                key={item.id}
                className="border border-ink/10 bg-white rounded-2xl p-3 sm:p-4 space-y-3 group shadow-xs hover:border-green-900/40 hover:shadow-sm transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ink/10 bg-paper">
                  <Image
                    src={item.url}
                    alt={caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-1 py-1">
                  <p className="font-serif text-xs sm:text-sm text-ink font-medium leading-snug">
                    {caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
