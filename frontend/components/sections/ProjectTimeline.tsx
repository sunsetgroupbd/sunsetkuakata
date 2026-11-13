"use client";

import React from "react";
import { TimelineEvent } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { MapPin, Hammer, Building2, Calendar, Flag } from "lucide-react";

interface ProjectTimelineProps {
  timeline: TimelineEvent[];
}

export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  const { locale, t, formatNumber } = useLanguage();

  const iconMap: { [year: string]: React.ElementType } = {
    "2023": MapPin,
    "2024": Hammer,
    "2025": Building2,
    "2027": Calendar,
    "2029": Flag,
  };

  return (
    <section id="timeline" className="bg-white py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title matching Image 1 */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
            {locale === "bn" ? "প্রকল্পের সময়রেখা" : "Project Timeline"}
          </h2>
        </div>

        {/* Horizontal Timeline Rail matching Image 1 */}
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal Track line connecting nodes on tablet/desktop */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-[2px] bg-ink/15 z-0" />

          {/* 5 Milestone Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {timeline.map((item) => {
              const Icon = iconMap[item.year] || Building2;
              const isPlanned = item.status === "planned";

              return (
                <div key={item.id} className="flex flex-col items-center text-center space-y-3">
                  {/* Circle Icon Badge matching Image 1 */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-transform ${
                      isPlanned
                        ? "bg-[#12406E] text-white border-white"
                        : "bg-green-900 text-white border-white"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Year */}
                  <div className="font-serif text-xl sm:text-2xl font-bold text-ink tabular-nums">
                    {formatNumber(item.year)}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-grey-700 leading-tight max-w-[160px]">
                    {t(item, "desc")}
                  </p>

                  {/* Planned Pill */}
                  {isPlanned && (
                    <span className="mt-1 px-3 py-0.5 rounded-full bg-[#12406E] text-white text-[10px] uppercase tracking-wider font-semibold">
                      {locale === "bn" ? "পরিকল্পিত" : "Planned"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
