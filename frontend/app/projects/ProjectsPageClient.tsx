"use client";

import React from "react";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";

interface ProjectsPageClientProps {
  projects: Project[];
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-4">
          <span className={`text-xs uppercase font-medium text-grey-700 block ${isBn ? "tracking-normal" : "tracking-[0.18em]"}`}>
            {isBn ? "রিয়েল এস্টেট ও স্বাস্থ্যসেবা পোর্টফোলিও" : "Real Estate & Healthcare Portfolio"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold">
            {isBn ? "আমাদের প্রকল্পসমূহ" : "Our Projects"}
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            {isBn
              ? "কোম্পানি আইন ১৯৯৪ এবং শরীয়াহ নির্দেশিকা অনুসারে পরিচালিত বাস্তব ও হালাল বিনিয়োগ প্রকল্প।"
              : "Tangible, lawful investments developed under Company Act 1994 governance and Shariah supervision."}
          </p>
        </div>
      </div>

      <ProjectsShowcase projects={projects} />
    </div>
  );
}
