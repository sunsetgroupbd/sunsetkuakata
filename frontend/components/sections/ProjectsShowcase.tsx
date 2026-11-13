"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const { locale, t } = useLanguage();

  const projectImages: { [slug: string]: string } = {
    "kuakata-hotel": "/images/1.webp",
    "sun-care": "/images/12.webp",
    "dfi": "/images/13.webp",
    "mangrove-kuakata": "/images/10.webp",
    "super-combo": "/images/11.webp",
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title matching Image 1 */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            {locale === "bn" ? "আমাদের প্রকল্পসমূহ" : "Our Projects"}
          </h2>
        </div>

        {/* 5 Cards Grid side-by-side - 2 per row on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6">
          {projects.map((proj, idx) => {
            const badgeNum = `0${idx + 1}`;
            const imageSrc = projectImages[proj.slug] || proj.heroImage;

            return (
              <div
                key={proj.id}
                className="border border-ink/10 rounded-xl sm:rounded-2xl bg-white overflow-hidden flex flex-col justify-between transition-colors hover:border-green-900/40 shadow-xs hover:shadow-sm"
              >
                <div>
                  {/* Image container with rounded top & overlapping circular badge */}
                  <div className="relative aspect-[16/11] w-full bg-sand overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                    <Image
                      src={imageSrc}
                      alt={t(proj, "name")}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                    {/* Circular dark green badge at bottom left of image */}
                    <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-900 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold border border-white">
                      {badgeNum}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-3 sm:p-5 space-y-1.5 sm:space-y-3">
                    <h3 className="font-serif text-xs sm:text-base md:text-lg text-green-900 font-semibold leading-snug line-clamp-2">
                      <Link href={`/projects/${proj.slug}`} className="hover:underline">
                        {t(proj, "name")}
                      </Link>
                    </h3>

                    <p className="text-[10px] sm:text-xs text-grey-700 leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {t(proj, "summary")}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-3 pb-3 sm:px-5 sm:pb-5 pt-1 sm:pt-2">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-ink hover:text-green-900 transition-colors"
                  >
                    <span>{locale === "bn" ? "বিস্তারিত দেখুন" : "View Details"}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
