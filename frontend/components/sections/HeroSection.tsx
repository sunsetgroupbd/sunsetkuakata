"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, Building2, Handshake, Users, Leaf } from "lucide-react";

export function HeroSection() {
  const { locale } = useLanguage();

  const heroSlides = [
    {
      src: "/images/hero1.webp",
      alt: "Sunrise with traditional fishing boats along Kuakata coastal beach",
    },
    {
      src: "/images/hero2.webp",
      alt: "Golden hour sunset reflection over fishing fleet in Kuakata",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative bg-white pt-[80px]">
      {/* Hero Visual Banner Container - Clear, unobstructed photography */}
      <div className="relative w-full h-[620px] sm:h-[680px] lg:h-[740px] overflow-hidden bg-ink">
        {/* Cross-fade Image Slides */}
        <AnimatePresence initial={false}>
          <motion.div
            key={heroSlides[currentSlide].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={heroSlides[currentSlide].src}
              alt={heroSlides[currentSlide].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Natural subtle darkened tone across image strictly for text contrast, NO solid or white box */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content Container - Centered in middle, in white color only */}
        <div className="relative max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <div className="max-w-3xl lg:max-w-4xl space-y-6 text-white flex flex-col items-center">
            {/* Headline - Centered, White color only, without dash */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.2] tracking-tight">
              {locale === "bn" ? (
                <>
                  সানসেট কুয়াকাটা হোটেল এবং রিসোর্ট <br />
                  <span className="text-white font-medium">যেখানে আরাম মিলে প্রকৃতির সান্নিধ্যে!</span>
                </>
              ) : (
                <>
                  Sunset Kuakata Hotel and Resort <br />
                  <span className="text-white font-medium">Where Comfort Meets Nature!</span>
                </>
              )}
            </h1>

            {/* Sub-copy - Centered, White color only, using "and" / "এবং" */}
            <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed max-w-2xl font-normal mx-auto">
              {locale === "bn"
                ? "সমুদ্রের ঢেউ আর সূর্যাস্তের অপরূপ সৌন্দর্যের সাথে কাটান আপনার স্বপ্নের সময়। আধুনিক সুযোগ-সুবিধা আর প্রাকৃতিক পরিবেশের সমন্বয়ে তৈরি সানসেট কুয়াকাটা হোটেল এবং রিসোর্ট হবে আপনার শান্তি ও বিলাসিতার সেরা ঠিকানা।"
                : "Spend your dream moments embraced by sea waves and mesmerizing sunsets. Blending modern amenities with serene natural beauty, Sunset Kuakata Hotel and Resort is your premier destination for tranquility and luxury."}
            </p>

            {/* Action Buttons - Outline only, no background, white text */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white hover:bg-white/10 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors duration-200"
              >
                <span>{locale === "bn" ? "প্রকল্পসমূহ দেখুন" : "Explore Our Projects"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white hover:bg-white/10 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors duration-200"
              >
                <span>{locale === "bn" ? "প্যাকেজসমূহ দেখুন" : "View Packages"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 4-Feature Card Strip in Whitish-Ash with Rounded Corners */}
      <div className="relative -mt-10 sm:-mt-14 z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-white border border-ink/10 rounded-2xl p-4 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {/* Feature 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5 p-3 sm:p-0 rounded-xl bg-ash/40 sm:bg-transparent">
              <div className="w-10 h-10 sm:w-11 sm:h-11 border border-green-900/20 bg-white sm:bg-ash rounded-xl flex items-center justify-center text-green-900 flex-shrink-0 shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-base text-ink font-semibold">
                  {locale === "bn" ? "প্রিমিয়াম প্রকল্প" : "Premium Projects"}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-grey-700 mt-0.5">
                  {locale === "bn" ? "কুয়াকাটা ও ঢাকায় অবস্থান" : "Kuakata and Dhaka"}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5 p-3 sm:p-0 rounded-xl bg-ash/40 sm:bg-transparent">
              <div className="w-10 h-10 sm:w-11 sm:h-11 border border-[#12406E]/20 bg-white sm:bg-ash rounded-xl flex items-center justify-center text-[#12406E] flex-shrink-0 shadow-xs">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-base text-ink font-semibold">
                  {locale === "bn" ? "নৈতিক বিনিয়োগ" : "Ethical Investment"}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-grey-700 mt-0.5">
                  {locale === "bn" ? "কোম্পানি আইন ১৯৯৪" : "Company Act 1994"}
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5 p-3 sm:p-0 rounded-xl bg-ash/40 sm:bg-transparent">
              <div className="w-10 h-10 sm:w-11 sm:h-11 border border-green-900/20 bg-white sm:bg-ash rounded-xl flex items-center justify-center text-green-900 flex-shrink-0 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-base text-ink font-semibold">
                  {locale === "bn" ? "শরীয়াহ তদারকি" : "Shariah Oversight"}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-grey-700 mt-0.5">
                  {locale === "bn" ? "হালাল আয়ের বিকল্প" : "Supervisory committee"}
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5 p-3 sm:p-0 rounded-xl bg-ash/40 sm:bg-transparent">
              <div className="w-10 h-10 sm:w-11 sm:h-11 border border-[#12406E]/20 bg-white sm:bg-ash rounded-xl flex items-center justify-center text-[#12406E] flex-shrink-0 shadow-xs">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-base text-ink font-semibold">
                  {locale === "bn" ? "টেকসই ভবিষ্যৎ" : "Sustainable Future"}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-grey-700 mt-0.5">
                  {locale === "bn" ? "সাফ-কবালা মালিকানা" : "Saf-kabala title"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
