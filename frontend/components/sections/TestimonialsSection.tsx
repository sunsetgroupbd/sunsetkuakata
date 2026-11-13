"use client";

import React from "react";
import { Testimonial } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { locale, t } = useLanguage();

  // Seamless duplication for infinite sliding carousel
  const slidingTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="bg-ash py-16 sm:py-24 border-b border-ink/10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14 space-y-3">
          <span className={`text-xs uppercase font-semibold text-green-900 block ${locale === "bn" ? "tracking-normal" : "tracking-[0.2em]"}`}>
            {locale === "bn" ? "মালিক ও অংশীদারদের অভিজ্ঞতা" : "Owner & Partner Testimonials"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            {locale === "bn" ? "মানুষের মতামত ও পর্যালোচনা" : "What People Say"}
          </h2>
        </div>
      </div>

      {/* Animated Sliding Cardview Carousel */}
      <div className="relative overflow-hidden py-4">
        {/* Left & Right Gradient Mask Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-ash via-ash/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-ash via-ash/80 to-transparent z-10" />

        {/* Sliding Row - Continuously Moving Left to Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-testimonials flex gap-4 sm:gap-6 px-4">
            {slidingTestimonials.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[280px] sm:w-[360px] md:w-[420px] flex-shrink-0 border border-ink/10 bg-white rounded-2xl p-5 sm:p-7 flex flex-col justify-between space-y-4 hover:border-green-900/40 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  {/* Silhouette avatar circle with initials */}
                  <div className="w-11 h-11 rounded-full bg-ash border border-ink/10 flex items-center justify-center text-green-900 font-serif font-bold text-sm">
                    {item.name
                      .split(" ")
                      .filter((p) => !p.includes("."))
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  {/* Quote icon */}
                  <Quote className="w-6 h-6 text-green-900/20" />
                </div>

                <blockquote className="text-xs sm:text-sm text-grey-700 leading-relaxed italic">
                  &ldquo;{t(item, "quote")}&rdquo;
                </blockquote>

                <div className="pt-3 border-t border-ink/10">
                  <div className="font-serif text-sm sm:text-base font-semibold text-ink">
                    {item.name}
                  </div>
                  <div className="text-[11px] sm:text-xs text-green-900 font-medium mt-0.5">
                    {t(item, "role")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
