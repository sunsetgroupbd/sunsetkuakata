"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/types";
import { seedVideos } from "@/data/videos";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { useLanguage, toBengaliNumber } from "@/lib/i18n";
import { Camera, Video } from "lucide-react";

interface GalleryClientProps {
  items: GalleryItem[];
}

export function GalleryClient({ items }: GalleryClientProps) {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  const [viewMode, setViewMode] = useState<"photos" | "videos">("photos");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", labelEn: "All Photos", labelBn: "সকল ছবি" },
    { key: "hotel", labelEn: "Projects & Architecture", labelBn: "প্রকল্প ও স্থাপত্য" },
    { key: "site", labelEn: "Deed Handovers & Owners", labelBn: "সাফ-কবালা ও মালিকগণ" },
    { key: "events", labelEn: "MoUs & Alliances", labelBn: "সমঝোতা স্মারক ও চুক্তি" },
    { key: "location", labelEn: "Kuakata Coastline", labelBn: "কুয়াকাটা উপকূল ও প্রকৃতি" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const getCategoryCount = (key: string) => {
    if (key === "all") return items.length;
    return items.filter((i) => i.category === key).length;
  };

  const getCategoryBadgeLabel = (cat: string) => {
    switch (cat) {
      case "hotel":
        return isBn ? "প্রকল্প" : "Project";
      case "site":
        return isBn ? "সাফ-কবালা ও সাইট" : "Deed & Site";
      case "events":
        return isBn ? "সমঝোতা স্মারক" : "MoU & Event";
      case "location":
        return isBn ? "উপকূলীয় দৃশ্য" : "Coastal";
      default:
        return "";
    }
  };

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <span className={`text-xs uppercase font-medium text-grey-700 block ${isBn ? "tracking-normal" : "tracking-[0.18em]"}`}>
            {isBn ? "বাস্তব ডকুমেন্টেশন ও স্থিরচিত্র" : "Visual Documentation & Archive"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold">
            {isBn ? "প্রকল্প, মালিকানা ও সাইট গ্যালারি" : "Projects, Ownership & Site Gallery"}
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            {isBn
              ? "সানসেট গ্রুপের প্রকল্পসমূহের আধুনিক স্থাপত্য নকশা, সাব-রেজিস্ট্রেশনে সাফ-কবালা দলিল হস্তান্তর, অংশীদারদের সমঝোতা স্মারক এবং কুয়াকাটার প্রাকৃতিক দৃশ্যের আলোকচিত্র ও ভিডিও রূপরেখা।"
              : "Comprehensive visual documentation covering architectural master models, statutory saf-kabala deed registrations, institutional MoU signings, and coastal Kuakata scenery & official videos."}
          </p>
        </div>

        {/* Primary View Mode Switcher (Photos vs. Videos) */}
        <div className="flex items-center gap-3 border-b border-ink/10 pb-6">
          <button
            onClick={() => setViewMode("photos")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
              viewMode === "photos"
                ? "bg-green-900 text-white border-green-900 shadow-xs"
                : "bg-white text-ink border-ink/15 hover:border-green-900/40 hover:bg-ash/50"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{isBn ? "ফটো গ্যালারি" : "Photo Gallery"}</span>
            <span
              className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md font-semibold ${
                viewMode === "photos" ? "bg-white/20 text-white" : "bg-ink/5 text-grey-700"
              }`}
            >
              {isBn ? toBengaliNumber(items.length) : items.length}
            </span>
          </button>

          <button
            onClick={() => setViewMode("videos")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
              viewMode === "videos"
                ? "bg-green-900 text-white border-green-900 shadow-xs"
                : "bg-white text-ink border-ink/15 hover:border-green-900/40 hover:bg-ash/50"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{isBn ? "ভিডিও ডকুমেন্টেশন" : "Video Features"}</span>
            <span
              className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md font-semibold ${
                viewMode === "videos" ? "bg-white/20 text-white" : "bg-ink/5 text-grey-700"
              }`}
            >
              {isBn ? toBengaliNumber(seedVideos.length) : seedVideos.length}
            </span>
          </button>
        </div>

        {/* VIEW 1: VIDEO DOCUMENTARIES */}
        {viewMode === "videos" ? (
          <div className="space-y-8">
            <div className="max-w-xl space-y-2">
              <h2 className="font-serif text-2xl text-ink font-semibold">
                {isBn ? "ভিডিও ডকুমেন্টেশন ও প্রকল্প রূপরেখা" : "Video Documentaries & Site Tours"}
              </h2>
              <p className="text-xs sm:text-sm text-grey-700">
                {isBn
                  ? "কুয়াকাটার পর্যটন সম্ভাবনা, প্রকল্প মাস্টার প্ল্যান এবং সাফ-কবালা দলিলের আইনি নিরাপত্তা সংক্রান্ত ভিডিও ডকুমেন্টারি।"
                  : "Watch high-definition official videos showcasing Kuakata's hospitality boom, engineering master plans, and legal saf-kabala ownership."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {seedVideos.map((video, idx) => {
                const title = isBn ? video.titleBn : video.titleEn;
                const desc = isBn ? video.descriptionBn : video.descriptionEn;

                return (
                  <div
                    key={video.id}
                    className="border border-ink/10 bg-white rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs hover:border-green-900/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <YouTubeEmbed
                        videoId={video.youtubeId}
                        title={title}
                        className="rounded-xl border border-ink/10"
                      />
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] uppercase font-semibold text-green-900 tracking-wider bg-green-900/10 px-2 py-0.5 rounded-md">
                          {isBn ? `ভিডিও ০${idx + 1}` : `Video 0${idx + 1}`}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-ink leading-snug">
                          {title}
                        </h3>
                        {desc && (
                          <p className="text-xs text-grey-700 leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* VIEW 2: PHOTO GALLERY */
          <div className="space-y-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.key);
                const countStr = isBn ? toBengaliNumber(count) : count;
                const isActive = activeCategory === cat.key;

                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                      isActive
                        ? "bg-green-900 text-white border-green-900 shadow-xs"
                        : "bg-white text-ink border-ink/15 hover:border-green-900/40 hover:bg-ash/50"
                    }`}
                  >
                    <span>{isBn ? cat.labelBn : cat.labelEn}</span>
                    <span
                      className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md font-semibold ${
                        isActive ? "bg-white/20 text-white" : "bg-ink/5 text-grey-700"
                      }`}
                    >
                      {countStr}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Gallery Grid: 2 columns on mobile, 3 columns on tablet/desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {filteredItems.map((item) => {
                const caption = isBn ? item.captionBn : item.captionEn;
                const badge = getCategoryBadgeLabel(item.category);

                return (
                  <div
                    key={item.id}
                    className="border border-ink/10 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 space-y-2 sm:space-y-3 group shadow-2xs sm:shadow-xs hover:border-green-900/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl border border-ink/10 bg-paper">
                      <Image
                        src={item.url}
                        alt={caption}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {badge && (
                        <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-black/65 backdrop-blur-xs text-white text-[9px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md">
                          {badge}
                        </span>
                      )}
                    </div>
                    <div className="px-0.5 sm:px-1 pt-0.5 pb-0.5">
                      <p className="font-serif text-[11px] sm:text-sm text-ink font-medium leading-snug line-clamp-2 sm:line-clamp-none">
                        {caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
