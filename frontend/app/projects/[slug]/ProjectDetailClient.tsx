"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { MapPin, Check, ArrowLeft, Shield } from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { locale, t } = useLanguage();

  const isBn = locale === "bn";

  const locationText = isBn
    ? project.location.includes("Kuakata")
      ? "কুয়াকাটা, পটুয়াখালী"
      : project.location.includes("Mohammadpur")
      ? "মোহাম্মদপুর / বসিলা, ঢাকা"
      : project.location.includes("Cox")
      ? "কক্সবাজার"
      : "কুয়াকাটা ও ঢাকা"
    : project.location;

  const title = isBn ? project.nameBn : project.nameEn;
  const summary = isBn ? project.summaryBn : project.summaryEn;
  const body = isBn ? project.bodyBn : project.bodyEn;
  const highlights = isBn ? project.highlightsBn : project.highlightsEn;
  const services = isBn ? project.servicesBn : project.servicesEn;

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className={`inline-flex items-center gap-2 text-xs uppercase text-grey-700 hover:text-green-900 transition-colors ${isBn ? "tracking-normal" : "tracking-wider"}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? "সকল প্রকল্পে ফিরে যান" : "Back to All Projects"}</span>
        </Link>

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-green-900 font-medium">
                <MapPin className="w-4 h-4" />
                <span>{locationText}</span>
              </div>
              {project.status === "upcoming" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  {isBn ? "আসন্ন প্রকল্প" : "Upcoming Project"}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight font-semibold">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-grey-700 leading-relaxed">
              {summary}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={`/contact?project=${project.slug}`} variant="primary">
                {isBn ? "মালিকানা সম্পর্কে জানুন" : "Inquire About Ownership"}
              </Button>
              <Button href="/packages" variant="outline">
                {isBn ? "প্যাকেজসমূহ দেখুন" : "View Packages"}
              </Button>
            </div>
          </div>

          {/* Media Container: 2x2 collage for Super Combo, heroImage for others */}
          {project.slug === "super-combo" ? (
            <div className="lg:col-span-5 relative aspect-[4/3] bg-ash border border-ink/10 rounded-2xl overflow-hidden shadow-xs p-1.5">
              <div className="grid grid-cols-2 grid-rows-2 gap-1.5 w-full h-full">
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-sand">
                  <Image
                    src="/images/sunsetkuakata.webp"
                    alt="Sunset Kuakata Hotel & Resort"
                    fill
                    sizes="(max-width: 1024px) 50vw, 240px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-medium">
                    {isBn ? "সানসেট কুয়াকাটা" : "Sunset Kuakata"}
                  </span>
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-sand">
                  <Image
                    src="/images/suncare.webp"
                    alt="Sun Care Hospital"
                    fill
                    sizes="(max-width: 1024px) 50vw, 240px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-medium">
                    {isBn ? "সান কেয়ার হসপিটাল" : "Sun Care Hospital"}
                  </span>
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-sand">
                  <Image
                    src="/images/dfi-aerial.webp"
                    alt="DFI Dhaka Fantasy Island"
                    fill
                    sizes="(max-width: 1024px) 50vw, 240px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-medium">
                    {isBn ? "ডিএফআই ফ্যান্টাসি আইল্যান্ড" : "DFI Fantasy Island"}
                  </span>
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-sand">
                  <Image
                    src="/images/Mangrove.webp"
                    alt="Mangrove"
                    fill
                    sizes="(max-width: 1024px) 50vw, 240px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-medium">
                    {isBn ? "ম্যানগ্রোভ" : "Mangrove"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-5 relative aspect-[4/3] bg-sand border border-ink/10 rounded-2xl overflow-hidden shadow-xs">
              <Image
                src={project.heroImage}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Detailed Body & Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-ink/10">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                {isBn ? "প্রকল্পের বিবরণ" : "Project Overview"}
              </h2>
              <p className="text-sm sm:text-base text-grey-700 leading-relaxed whitespace-pre-line">
                {body}
              </p>
            </div>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-ink/10">
                <h3 className="font-serif text-xl text-ink font-semibold">
                  {isBn ? "মূল বৈশিষ্ট্যসমূহ" : "Key Highlights"}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-grey-700">
                      <Check className="w-4 h-4 text-green-900 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clinical & Diagnostic Services (for healthcare projects) */}
            {services && services.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-ink/10">
                <h3 className="font-serif text-xl text-ink font-semibold">
                  {isBn ? "ক্লিনিক্যাল ও ডায়াগনস্টিক সেবাসমূহ" : "Clinical & Diagnostic Services"}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-grey-700">
                      <Shield className="w-4 h-4 text-green-900 mt-0.5 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project Video Presentation */}
            <div className="pt-6 border-t border-ink/10">
              <YouTubeEmbed
                videoId={
                  project.slug === "kuakata-hotel"
                    ? "6PWf8ejVec8"
                    : project.slug === "super-combo"
                    ? "y6mck3HSYIw"
                    : "BhpGrudqDOs"
                }
                title={title}
              />
            </div>
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4">
            <Card variant="sand" className="space-y-6 sticky top-28 rounded-2xl shadow-xs">
              <h3 className="font-serif text-xl text-ink font-semibold">
                {isBn ? "মালিকানা সংক্রান্ত পরামর্শ" : "Ownership Consultation"}
              </h3>
              <p className="text-xs text-grey-700 leading-relaxed">
                {isBn
                  ? `${title} এর সার্টিফাইড ডকুমেন্টেশন, সাফ-কবালা দলিলের বিবরণ এবং অংশীদারী সময়সূচী পেতে আমাদের সাথে যোগাযোগ করুন।`
                  : `Receive certified documentation, legal deed details, and partnership schedules for ${project.nameEn}.`}
              </p>
              <div className="space-y-3 pt-2">
                <Button href={`/contact?project=${project.slug}`} variant="primary" className="w-full text-xs">
                  {isBn ? "তথ্য অনুরোধ করুন" : "Request Information"}
                </Button>
                <Button href="tel:+8801325074535" variant="outline" className="w-full text-xs">
                  {isBn ? "কল করুন: +8801325074535" : "Call: +8801325074535"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
