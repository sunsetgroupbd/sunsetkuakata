"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { partnerLogos, mouSigningPhotos, familyOwnerPhotos, PartnerPhoto } from "@/data/partners";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PartnersAndFamilySection() {
  const { locale } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<PartnerPhoto | null>(null);

  // Section A: 8 photos (3 in top line, 2 in middle line around circle, 3 in bottom line)
  const mouTop = mouSigningPhotos.slice(0, 3);      // 3 images
  const mouMidLeft = mouSigningPhotos[3];           // 1 image left
  const mouMidRight = mouSigningPhotos[4];          // 1 image right
  const mouBottom = mouSigningPhotos.slice(5, 8);   // 3 images

  // Section B: 8 photos (3 in top line, 2 in middle line around circle, 3 in bottom line)
  const familyTop = familyOwnerPhotos.slice(0, 3);    // 3 images
  const familyMidLeft = familyOwnerPhotos[3];         // 1 image left
  const familyMidRight = familyOwnerPhotos[4];        // 1 image right
  const familyBottom = familyOwnerPhotos.slice(5, 8); // 3 images

  const renderPhotoCard = (photo: PartnerPhoto) => (
    <div
      key={photo.id}
      onClick={() => setSelectedPhoto(photo)}
      className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-ink/10 bg-white cursor-pointer shadow-xs sm:shadow-sm hover:border-green-900/50 hover:shadow-md transition-all duration-300"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 text-green-900 flex items-center justify-center shadow-md">
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
        </span>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-20 sm:py-28 border-b border-ink/10 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ======================================================== */}
        {/* SECTION A: OUR ESTEEMED PARTNERS                         */}
        {/* ======================================================== */}
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-semibold tracking-tight">
              {locale === "bn" ? "আমাদের সম্মানিত অংশীদারগণ" : "Our Esteemed Partners"}
            </h2>
            <p className="text-sm sm:text-base text-grey-700 max-w-lg mx-auto leading-relaxed">
              {locale === "bn"
                ? "সুদৃঢ় অংশীদারিত্বের মাধ্যমে দীর্ঘমেয়াদী ও বিশ্বস্ত সম্পর্ক গড়ে তোলা।"
                : "Building meaningful relationships through trusted partnerships."}
            </p>
          </div>

          {/* 3x3 Grid: Row 1 (3 images), Row 2 (1 img, Circle, 1 img), Row 3 (3 images) - 2 per row on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 items-center">
            {/* Row 1: 3 images in top line */}
            {mouTop.map(renderPhotoCard)}

            {/* Row 2: Left Image */}
            {mouMidLeft && renderPhotoCard(mouMidLeft)}

            {/* Row 2: Center Circle Shape (spans 2 cols on mobile, 1 on desktop) */}
            <div className="col-span-2 md:col-span-1 flex items-center justify-center py-2 md:py-0">
              <div className="w-full aspect-square max-w-[240px] sm:max-w-[280px] md:max-w-[320px] rounded-full border-2 border-green-900 bg-white p-5 sm:p-8 flex flex-col items-center justify-center text-center shadow-md">
                <p className="font-serif text-xs sm:text-base md:text-lg font-bold text-green-900 leading-snug">
                  {locale === "bn"
                    ? "সম্মানিত অংশীদারদের সাথে সমঝোতা স্মারক স্বাক্ষর করতে পেরে আমরা আনন্দিত ও গর্বিত।"
                    : "We are Honoured to sign a Memorandum of Understanding with Our Esteemed Partners."}
                </p>
              </div>
            </div>

            {/* Row 2: Right Image */}
            {mouMidRight && renderPhotoCard(mouMidRight)}

            {/* Row 3: 3 images in last line */}
            {mouBottom.map(renderPhotoCard)}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION B: THEY ARE PART OF OUR FAMILY                   */}
        {/* ======================================================== */}
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-semibold tracking-tight">
              {locale === "bn" ? "তারা আমাদের পরিবারের অংশ" : "They Are Part of Our Family"}
            </h2>
          </div>

          {/* 3x3 Grid: Row 1 (3 images), Row 2 (1 img, Circle, 1 img), Row 3 (3 images) - 2 per row on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 items-center">
            {/* Row 1: 3 images in top line */}
            {familyTop.map(renderPhotoCard)}

            {/* Row 2: Left Image */}
            {familyMidLeft && renderPhotoCard(familyMidLeft)}

            {/* Row 2: Center Circle Shape (spans 2 cols on mobile, 1 on desktop) */}
            <div className="col-span-2 md:col-span-1 flex items-center justify-center py-2 md:py-0">
              <div className="w-full aspect-square max-w-[240px] sm:max-w-[280px] md:max-w-[320px] rounded-full border-2 border-green-900 bg-white p-5 sm:p-8 flex flex-col items-center justify-center text-center shadow-md space-y-2">
                <h3 className="font-serif text-sm sm:text-lg md:text-xl font-bold text-green-900 leading-tight">
                  {locale === "bn" ? "তারা আমাদের পরিবারের অংশ।" : "They are part of our family."}
                </h3>
                <p className="text-[11px] sm:text-sm text-grey-700 leading-relaxed font-medium">
                  {locale === "bn"
                    ? "সানসেট কুয়াকাটা হোটেল & রিসোর্ট লি. ইতোমধ্যে সফলভাবে সাফ-কবালা রেজিস্ট্রেশন সম্পন্ন করেছে।"
                    : "Sunset Kuakata Hotel & Resort Ltd. has already completed the Saf Kabla registration."}
                </p>
              </div>
            </div>

            {/* Row 2: Right Image */}
            {familyMidRight && renderPhotoCard(familyMidRight)}

            {/* Row 3: 3 images in last line */}
            {familyBottom.map(renderPhotoCard)}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION C: OUR VALUED PARTNER NETWORK                    */}
        {/* ======================================================== */}
        <div className="space-y-10 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-xs uppercase font-semibold text-[#12406E] block ${locale === "bn" ? "tracking-normal" : "tracking-[0.2em]"}`}>
              {locale === "bn" ? "অংশীদারী নেটওয়ার্ক" : "Alliances & Networks"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold">
              {locale === "bn" ? "আমাদের মূল্যবান পার্টনার নেটওয়ার্ক" : "Our Valued Partner Network"}
            </h2>
            <p className="font-serif text-sm sm:text-base text-green-900 font-medium">
              {locale === "bn"
                ? "সানসেট মালিকগণ নিম্নলিখিত সংস্থাসমূহ থেকে বিশেষ সুবিধা লাভ করবেন:"
                : "Sunset owners will receive special benefits from the following companies:"}
            </p>
          </div>

          {/* Animated Sliding Logos in 2 Smooth Left-to-Right Lines */}
          <div className="relative overflow-hidden space-y-4 py-2">
            {/* Left & Right Gradient Mask Overlays for Elegant Edge Fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

            {/* Line 1: Sliding Left to Right (Logos 1-7) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-ltr flex gap-4 sm:gap-6">
                {[...partnerLogos.slice(0, 7), ...partnerLogos.slice(0, 7), ...partnerLogos.slice(0, 7)].map((partner, idx) => (
                  <div
                    key={`line1-${partner.id}-${idx}`}
                    className="w-44 sm:w-56 h-20 sm:h-24 bg-white border border-ink/10 rounded-xl p-3 sm:p-4 flex items-center justify-center flex-shrink-0 shadow-sm hover:border-green-900/50 hover:shadow-md transition-all duration-200"
                    title={partner.name}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        fill
                        sizes="224px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Line 2: Sliding Right to Left (Logos 8-14) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-rtl flex gap-4 sm:gap-6">
                {[...partnerLogos.slice(7, 14), ...partnerLogos.slice(7, 14), ...partnerLogos.slice(7, 14)].map((partner, idx) => (
                  <div
                    key={`line2-${partner.id}-${idx}`}
                    className="w-44 sm:w-56 h-20 sm:h-24 bg-white border border-ink/10 rounded-xl p-3 sm:p-4 flex items-center justify-center flex-shrink-0 shadow-sm hover:border-green-900/50 hover:shadow-md transition-all duration-200"
                    title={partner.name}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        fill
                        sizes="224px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox / Modal for High-Resolution Photo Viewing */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="p-4 sm:p-6 bg-white">
                <p className="font-serif text-base sm:text-lg font-semibold text-ink">
                  {locale === "bn" ? selectedPhoto.captionBn : selectedPhoto.captionEn}
                </p>
                <p className="text-xs text-grey-700 mt-1">{selectedPhoto.alt}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
