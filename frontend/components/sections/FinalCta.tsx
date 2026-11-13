"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/svg/WhatsAppIcon";

export function FinalCta() {
  const { locale } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-ink/10 bg-ash p-8 sm:p-12 md:p-16 text-center space-y-8 max-w-4xl mx-auto rounded-2xl shadow-sm">
          <span className={`text-xs uppercase font-medium text-grey-700 block ${locale === "bn" ? "tracking-normal" : "tracking-[0.18em]"}`}>
            {locale === "bn" ? "সরাসরি যোগাযোগ করুন" : "Direct Engagement"}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
            {locale === "bn"
              ? "নৈতিক আতিথেয়তায় অংশীদারিত্বের জন্য যোগাযোগ করুন"
              : "Engage in Halal Luxury Hospitality"}
          </h2>

          <p className="text-base text-grey-700 max-w-2xl mx-auto leading-relaxed">
            {locale === "bn"
              ? "প্রকল্পসমূহ পরিদর্শন, মালিকানা দলিল যাচাই এবং বুকিং সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি আমাদের প্রধান কার্যালয়ে আসুন অথবা কল / হোয়াটসঅ্যাপ করুন।"
              : "Inquire about hotel ownership packages, saf-kabala registration, or schedule a formal consultation at our Dhanmondi headquarters."}
          </p>

          {/* Action Buttons: Phone & WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              href="tel:+8801325074535"
              variant="primary"
              className="text-xs sm:text-sm px-6 py-4"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span>+8801325074535</span>
            </Button>

            <Button
              href="https://wa.me/8801325074535"
              variant="secondary"
              className="text-xs sm:text-sm px-6 py-4"
            >
              <WhatsAppIcon size={16} className="w-4 h-4 mr-2" />
              <span>{locale === "bn" ? "হোয়াটসঅ্যাপে চ্যাট" : "Chat on WhatsApp"}</span>
            </Button>
          </div>

          {/* Address & Office Hours */}
          <div className="pt-8 border-t border-ink/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-grey-700 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shaptak+Square+Dhanmondi+27+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-900 transition-colors"
                title={locale === "bn" ? "গুগল ম্যাপে দেখুন" : "View on Google Maps"}
              >
                27 Shaptak Square, Lift-11 (Level-11), Plot-2 (New), Road no-16, Old Dhanmondi 27, Dhanmondi, Dhaka-1209
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
              <span>
                {locale === "bn"
                  ? "সোমবার থেকে শনিবার: সকাল ১০:০০ - সন্ধ্যা ৭:০০ (রবিবার বন্ধ)"
                  : "Monday to Saturday: 10:00 am to 7:00 pm (Sunday Closed)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

