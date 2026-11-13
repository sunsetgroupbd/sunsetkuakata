"use client";

import React from "react";
import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Card } from "@/components/ui/Card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/svg/WhatsAppIcon";

interface ContactClientProps {
  settings: SiteSettings;
  initialProject?: string;
  initialPackage?: string;
}

export function ContactClient({
  settings,
  initialProject,
  initialPackage,
}: ContactClientProps) {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className={`text-xs uppercase font-medium text-grey-700 block ${isBn ? "tracking-normal" : "tracking-[0.18em]"}`}>
            {isBn ? "সরাসরি যোগাযোগ ও প্রধান কার্যালয়" : "Direct Communications & Headquarters"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold">
            {isBn ? "সানসেট গ্রুপের সাথে যোগাযোগ" : "Contact Sunset Group"}
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            {isBn
              ? "আমাদের বিনিয়োগ পরামর্শ ডেস্কে যোগাযোগ করুন, ধানমন্ডি কার্যালয়ে আসুন অথবা প্রকল্পের প্রাতিষ্ঠানিক নথিপত্রের জন্য অনুসন্ধান পাঠান।"
              : "Reach our investment advisory desk, visit our Dhanmondi office, or submit an official inquiry for project documents."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <InquiryForm
              initialProject={initialProject || "super-combo"}
              initialPackage={initialPackage || ""}
            />
          </div>

          {/* Contact Details & Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="sand" className="space-y-6 rounded-2xl shadow-xs">
              <h3 className="font-serif text-2xl text-ink font-semibold">
                {isBn ? "প্রধান কার্যালয়" : "Head Office"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-grey-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <span>{settings.address}</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Shaptak+Square+Dhanmondi+27+Dhaka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-green-900 font-semibold hover:underline mt-1"
                    >
                      <span>{isBn ? "গুগল ম্যাপে দেখুন →" : "View on Google Maps →"}</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-green-900 flex-shrink-0" />
                  <a href={`tel:${settings.phone}`} className="hover:text-green-900 font-semibold">
                    {settings.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <WhatsAppIcon size={16} className="w-4 h-4 text-green-900 flex-shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-900 font-semibold underline"
                  >
                    {isBn
                      ? `হোয়াটসঅ্যাপে চ্যাট করুন (${settings.whatsapp})`
                      : `Chat on WhatsApp (${settings.whatsapp})`}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-green-900 flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-green-900 underline">
                    {settings.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-ink/10">
                  <Clock className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
                  <span>{settings.officeHours}</span>
                </div>
              </div>
            </Card>

            <Card variant="white" className="space-y-4 rounded-2xl shadow-xs">
              <h4 className="font-serif text-lg text-ink font-semibold">
                {isBn ? "আইনগত পরিচয়" : "Legal Identity"}
              </h4>
              <p className="text-xs text-grey-700 leading-relaxed">
                {isBn
                  ? "সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট লিমিটেড কোম্পানি আইন ১৯৯৪ দ্বারা নিবন্ধিত একটি প্রাইভেট লিমিটেড কোম্পানি। এই পোর্টালের মাধ্যমে প্রাপ্ত সমস্ত তথ্য কঠোর গোপনীয়তা এবং প্রাতিষ্ঠানিক নীতি মেনে পরিচালনা করা হয়।"
                  : "Sunset Kuakata Hotel & Resort Limited is registered under Company Act 1994. Inquiries received through this portal are treated under strict confidentiality in compliance with our corporate policies."}
              </p>
            </Card>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Interactive Google Map - Corporate Headquarters           */}
        {/* ======================================================== */}
        <div className="border border-ink/10 bg-white rounded-2xl overflow-hidden shadow-xs p-5 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ink/10">
            <div className="space-y-1.5">
              <span className={`text-[10px] sm:text-xs uppercase font-semibold text-green-900 block ${isBn ? "tracking-normal" : "tracking-wider"}`}>
                {isBn ? "কর্পোরেট প্রধান কার্যালয় অবস্থান" : "Corporate Headquarters Location"}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                {isBn ? "আমাদের ধানমন্ডি কার্যালয়ে সরাসরি আসুন" : "Visit Our Dhanmondi Office"}
              </h3>
              <p className="text-xs sm:text-sm text-grey-700">
                {settings.address}
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Shaptak+Square+Dhanmondi+27+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-900 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-all shadow-xs self-start md:self-auto group"
            >
              <MapPin className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
              <span>{isBn ? "গুগল ম্যাপে দিকনির্দেশনা দেখুন" : "Open in Google Maps"}</span>
            </a>
          </div>

          <div className="relative w-full h-[380px] sm:h-[460px] rounded-xl overflow-hidden border border-ink/10 bg-ash shadow-inner">
            <iframe
              title="Sunset Group Corporate Headquarters Map"
              src="https://maps.google.com/maps?q=Shaptak%20Square%2C%20Road%2016%2C%20Dhanmondi%2C%20Dhaka%201209&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
