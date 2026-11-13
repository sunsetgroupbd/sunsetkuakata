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

function SuperComboMedia() {
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const slides = React.useMemo(
    () => [
      {
        type: "collage" as const,
        title: "4-in-1 Combo",
      },
      {
        type: "single" as const,
        src: "/images/sunsetkuakata.webp",
        title: "Sunset Kuakata",
      },
      {
        type: "single" as const,
        src: "/images/suncare.webp",
        title: "Sun Care Hospital",
      },
      {
        type: "single" as const,
        src: "/images/dfi-aerial.webp",
        title: "DFI Fantasy Island",
      },
      {
        type: "single" as const,
        src: "/images/Mangrove.webp",
        title: "Mangrove",
      },
    ],
    []
  );

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {/* Slide 0: 2x2 Collage */}
        <div className="w-full h-full flex-shrink-0 relative grid grid-cols-2 grid-rows-2 gap-[1.5px] bg-white">
          <div className="relative w-full h-full overflow-hidden bg-ash">
            <Image
              src="/images/sunsetkuakata.webp"
              alt="Sunset Kuakata"
              fill
              sizes="(max-width: 640px) 25vw, 10vw"
              className="object-cover"
            />
            <span className="absolute bottom-0.5 left-1 bg-black/60 text-white text-[7px] sm:text-[8px] px-1 rounded-xs">
              Kuakata
            </span>
          </div>
          <div className="relative w-full h-full overflow-hidden bg-ash">
            <Image
              src="/images/suncare.webp"
              alt="Sun Care"
              fill
              sizes="(max-width: 640px) 25vw, 10vw"
              className="object-cover"
            />
            <span className="absolute bottom-0.5 left-1 bg-black/60 text-white text-[7px] sm:text-[8px] px-1 rounded-xs">
              Sun Care
            </span>
          </div>
          <div className="relative w-full h-full overflow-hidden bg-ash">
            <Image
              src="/images/dfi-aerial.webp"
              alt="DFI"
              fill
              sizes="(max-width: 640px) 25vw, 10vw"
              className="object-cover"
            />
            <span className="absolute bottom-0.5 left-1 bg-black/60 text-white text-[7px] sm:text-[8px] px-1 rounded-xs">
              DFI
            </span>
          </div>
          <div className="relative w-full h-full overflow-hidden bg-ash">
            <Image
              src="/images/Mangrove.webp"
              alt="Mangrove"
              fill
              sizes="(max-width: 640px) 25vw, 10vw"
              className="object-cover"
            />
            <span className="absolute bottom-0.5 left-1 bg-black/60 text-white text-[7px] sm:text-[8px] px-1 rounded-xs">
              Mangrove
            </span>
          </div>
        </div>

        {/* Slide 1: Sunset Kuakata */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Image
            src="/images/sunsetkuakata.webp"
            alt="Sunset Kuakata"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </div>

        {/* Slide 2: Sun Care */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Image
            src="/images/suncare.webp"
            alt="Sun Care Hospital"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </div>

        {/* Slide 3: DFI */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Image
            src="/images/dfi-aerial.webp"
            alt="DFI Dhaka Fantasy Island"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </div>

        {/* Slide 4: Mangrove */}
        <div className="w-full h-full flex-shrink-0 relative">
          <Image
            src="/images/Mangrove.webp"
            alt="Mangrove"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Top Right Pill Badge */}
      <div className="absolute top-2 right-2 bg-[#12406E]/85 backdrop-blur-xs text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-semibold z-10 shadow-xs pointer-events-none">
        {slides[index].title}
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-1.5 right-2 flex items-center gap-1 z-10 pointer-events-auto">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIndex(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              index === i ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const { locale, t } = useLanguage();

  const projectImages: { [slug: string]: string } = {
    "kuakata-hotel": "/images/sunsetkuakata.webp",
    "sun-care": "/images/suncare.webp",
    "dfi": "/images/dfi-aerial.webp",
    "mangrove-kuakata": "/images/Mangrove.webp",
    "super-combo": "/images/sunsetkuakata.webp",
    "the-deck": "/images/Thedeck.webp",
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

        {/* Cards Grid: 2 per row on mobile, 3 per row on tablet & desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
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
                    {proj.slug === "super-combo" ? (
                      <SuperComboMedia />
                    ) : (
                      <Image
                        src={imageSrc}
                        alt={t(proj, "name")}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    )}
                    {/* Circular dark green badge at bottom left of image */}
                    <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-900 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold border border-white z-10 pointer-events-none">
                      {badgeNum}
                    </div>

                    {/* Upcoming badge */}
                    {proj.status === "upcoming" && (
                      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 bg-amber-700/90 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs shadow-xs z-10 pointer-events-none">
                        {locale === "bn" ? "আসন্ন প্রকল্প" : "Upcoming"}
                      </div>
                    )}
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
