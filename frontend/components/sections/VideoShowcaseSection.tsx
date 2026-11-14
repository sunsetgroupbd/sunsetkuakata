"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { seedVideos } from "@/data/videos";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { Play, ArrowRight } from "lucide-react";

export function VideoShowcaseSection() {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  const [activeVideoId, setActiveVideoId] = useState<string>(seedVideos[0].youtubeId);

  const activeVideo =
    seedVideos.find((v) => v.youtubeId === activeVideoId) || seedVideos[0];

  const activeTitle = isBn ? activeVideo.titleBn : activeVideo.titleEn;
  const activeDesc = isBn ? activeVideo.descriptionBn : activeVideo.descriptionEn;

  return (
    <section className="bg-sand/35 py-16 sm:py-24 border-b border-ink/10 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
              {isBn ? "ভিডিওতে সানসেট কুয়াকাটার পরিচয়" : "Experience Sunset Kuakata on Video"}
            </h2>
            <p className="text-sm sm:text-base text-grey-700 leading-relaxed">
              {isBn
                ? "কুয়াকাটা উপকূলের অপার সম্ভাবনা, আধুনিক রিসোর্ট অবকাঠামো এবং সাফ-কবালা দলিলের মাধ্যমে নিরাপদ মালিকানার চিত্র দেখুন।"
                : "Explore Kuakata's hospitality potential, architectural master planning, and statutory saf-kabala ownership through our official video features."}
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-900 hover:text-ink transition-colors pb-1"
          >
            <span>{isBn ? "সম্পূর্ণ গ্যালারি দেখুন" : "View Complete Gallery"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Video Player & Playlist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Active Video Player (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <YouTubeEmbed
              key={activeVideo.youtubeId}
              videoId={activeVideo.youtubeId}
              title={activeTitle}
              className="border-2 border-ink/15 shadow-sm"
            />
            <div className="space-y-2 pt-1">
              <span className="inline-block bg-green-900/10 text-green-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                {isBn ? "চলমান ভিডিও" : "Currently Playing"}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold leading-snug">
                {activeTitle}
              </h3>
              {activeDesc && (
                <p className="text-xs sm:text-sm text-grey-700 leading-relaxed">
                  {activeDesc}
                </p>
              )}
            </div>
          </div>

          {/* Playlist Side Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-grey-700 mb-2">
              {isBn ? "ভিডিও তালিকা (৩টি ভিডিও)" : "Video Playlist (3 Features)"}
            </p>

            <div className="space-y-3">
              {seedVideos.map((video, idx) => {
                const isSelected = video.youtubeId === activeVideoId;
                const title = isBn ? video.titleBn : video.titleEn;
                const desc = isBn ? video.descriptionBn : video.descriptionEn;
                const thumb = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

                return (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideoId(video.youtubeId)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex gap-3.5 items-center ${
                      isSelected
                        ? "bg-white border-green-900 shadow-xs ring-1 ring-green-900/30"
                        : "bg-white/70 border-ink/10 hover:border-green-900/40 hover:bg-white"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 sm:w-32 aspect-video rounded-xl overflow-hidden bg-black flex-shrink-0 border border-ink/10">
                      <Image
                        src={thumb}
                        alt={title}
                        fill
                        unoptimized
                        sizes="128px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${
                          isSelected ? "bg-green-900" : "bg-black/60"
                        }`}>
                          <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isSelected ? "bg-green-900 text-white" : "bg-ink/5 text-grey-700"
                      }`}>
                        {isBn ? `ভিডিও ০${idx + 1}` : `Video 0${idx + 1}`}
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-ink line-clamp-2 leading-snug">
                        {title}
                      </h4>
                      {desc && (
                        <p className="text-[11px] text-grey-700 line-clamp-1">
                          {desc}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Contact CTA Banner */}
            <div className="p-4 rounded-2xl bg-paper border border-ink/10 mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-ink">
                  {isBn ? "প্রকল্প সম্পর্কে আরও জানতে চান?" : "Want to know more details?"}
                </p>
                <p className="text-[11px] text-grey-700">
                  {isBn ? "আমাদের বিনিয়োগ উপদেষ্টার সাথে কথা বলুন" : "Speak with an investment advisor"}
                </p>
              </div>
              <Link
                href="/contact"
                className="px-3.5 py-2 bg-green-900 hover:bg-green-800 text-white text-[11px] font-semibold rounded-xl uppercase tracking-wider transition-colors flex-shrink-0"
              >
                {isBn ? "যোগাযোগ" : "Contact"}
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

