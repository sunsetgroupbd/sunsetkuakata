"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryItem } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

interface GalleryPreviewProps {
  items: GalleryItem[];
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  const { locale, t } = useLanguage();

  return (
    <section className="bg-paper py-20 md:py-28 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl space-y-4">
            <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
              {locale === "bn" ? "প্রাকৃতিক ও প্রকল্প দৃশ্য" : "Visual Portfolio"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
            {locale === "bn"
              ? "কুয়াকাটার উপকূলীয় সৌন্দর্য ও বাস্তবতা"
              : "Coastal Panorama and Site Reality"}
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-green-900 hover:text-red transition-colors pb-1"
          >
            <span>{locale === "bn" ? "সম্পূর্ণ গ্যালারি দেখুন" : "View Full Gallery"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item, idx) => (
            <div
              key={item.id}
              className="border border-ink/10 bg-sand overflow-hidden group space-y-3 p-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-ink/10">
                <Image
                  src={item.url}
                  alt={t(item, "caption") || "Sunset Group asset"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-xs text-grey-700 px-2 pb-2 leading-relaxed">
                {t(item, "caption")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

