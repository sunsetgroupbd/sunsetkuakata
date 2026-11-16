"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { submitInquiry } from "@/lib/api";
import {
  X,
  CheckCircle2,
  Phone,
  User,
  Mail,
  Building2,
  Sparkles,
  ShieldCheck,
  Send,
  Loader2,
} from "lucide-react";

const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

interface ProjectOption {
  slug: string;
  nameEn: string;
  nameBn: string;
}

const PROJECT_OPTIONS: ProjectOption[] = [
  { slug: "kuakata-hotel", nameEn: "Sunset Kuakata Hotel", nameBn: "সানসেট কুয়াকাটা হোটেল" },
  { slug: "sun-care", nameEn: "Sun Care Hospital", nameBn: "সান কেয়ার হসপিটাল" },
  { slug: "dfi", nameEn: "Dhaka Fantasy Island", nameBn: "ঢাকা ফ্যান্টাসি আইল্যান্ড" },
  { slug: "super-combo", nameEn: "Super Combo (4-in-1)", nameBn: "সুপার কম্বো" },
];

export function InvestmentLeadPopup() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectSlug, setProjectSlug] = useState("kuakata-hotel");
  const [honeypot, setHoneypot] = useState("");

  // Submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Do not show popup on admin panel
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;

    // Check if dismissed in this session
    const dismissedTime = sessionStorage.getItem("sunset_popup_dismissed");
    if (dismissedTime) {
      setHasDismissed(true);
      return;
    }

    // Auto-open popup after 6 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isAdmin]);

  if (isAdmin) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    sessionStorage.setItem("sunset_popup_dismissed", Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot check
    if (honeypot && honeypot.length > 0) {
      handleClose();
      return;
    }

    // Validation
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage(
        isBn ? "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।" : "Please enter your full name (minimum 2 characters)."
      );
      return;
    }

    if (!bdPhoneRegex.test(cleanPhone)) {
      setErrorMessage(
        isBn
          ? "অনুগ্রহ করে একটি সঠিক মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX বা 013XXXXXXXX)।"
          : "Please enter a valid Bangladeshi phone number (e.g. 017XXXXXXXX)."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedProject = PROJECT_OPTIONS.find((p) => p.slug === projectSlug);
      const res = await submitInquiry({
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        projectSlug,
        message: `[Investor Popup Lead] Interested in investing in ${selectedProject?.nameEn || projectSlug}. Saf-Kabala brochure requested.`,
      });

      if (res.success) {
        setIsSuccess(true);
        // Automatically close after 3.5 seconds
        setTimeout(() => {
          handleClose();
        }, 3500);
      } else {
        setErrorMessage(res.message || (isBn ? "দুঃখিত, তথ্য জমা দেওয়া যায়নি।" : "Failed to submit inquiry."));
      }
    } catch {
      setErrorMessage(
        isBn
          ? "সংযোগ বিঘ্নিত হয়েছে। অনুগ্রহ করে সরাসরি কল বা হোয়াটসঅ্যাপে যোগাযোগ করুন।"
          : "Network error. Please call or WhatsApp us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Prompt Pill (Bottom-left trigger to reopen if dismissed) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsSuccess(false);
            setErrorMessage("");
          }}
          className="fixed bottom-6 left-6 z-40 bg-white/95 hover:bg-white text-green-900 border border-green-900/30 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer backdrop-blur-md active:scale-95"
          title={isBn ? "বিনিয়োগ পরামর্শের জন্য ক্লিক করুন" : "Click for Investment Consultation"}
        >
          <div className="w-6 h-6 rounded-full bg-green-900/10 text-green-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-green-900" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            {isBn ? "বিনিয়োগে আগ্রহী?" : "Interested in Investing?"}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
        </button>
      )}

      {/* Main Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-ink/10 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-green-900 via-emerald-600 to-amber-500" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-grey-400 hover:text-ink hover:bg-ash/70 transition-colors cursor-pointer z-10"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              /* Success Confirmation Card */
              <div className="p-8 sm:p-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner animate-in zoom-in duration-300">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                    {isBn ? "ধন্যবাদ! তথ্য গৃহীত হয়েছে" : "Thank You! Inquiry Received"}
                  </h3>
                  <p className="text-xs sm:text-sm text-grey-600 max-w-sm mx-auto leading-relaxed">
                    {isBn
                      ? `প্রিয় ${fullName}, সানসেট গ্রুপে আপনার বিনিয়োগ আগ্রহ সফলভাবে নথিভুক্ত হয়েছে। আমাদের সিনিয়র বিনিয়োগ প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।`
                      : `Dear ${fullName}, your investment inquiry has been registered. Our senior investment director will contact you shortly with the verified saf-kabala brochure.`}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                  >
                    {isBn ? "বন্ধ করুন" : "Close Window"}
                  </button>
                </div>
              </div>
            ) : (
              /* Inquiry Form Card */
              <div className="p-5 sm:p-7 space-y-5">
                {/* Header Section */}
                <div className="space-y-1.5 pr-6">
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-green-900 bg-green-900/10 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>{isBn ? "বিনিয়োগ সুযোগ ও ব্রোশিওর" : "Investor Opportunity"}</span>
                  </div>
                  <h2 className="font-serif text-lg sm:text-2xl font-bold text-ink leading-snug">
                    {isBn
                      ? "সানসেট গ্রুপে বিনিয়োগ করতে আপনি কি আগ্রহী?"
                      : "Are you interested in investing with Sunset Group?"}
                  </h2>
                  <p className="text-xs text-grey-600 leading-relaxed">
                    {isBn
                      ? "সাফ-কাবালা রেজিস্ট্রেশনসহ পাঁচতারকা মানসম্পন্ন রিসোর্ট ও স্বাস্থ্যসেবা অবকাঠামোর বৈধ মালিকানা পেতে আপনার তথ্য প্রদান করুন।"
                      : "Own verified Saf-Kabala luxury hotel suites and healthcare infrastructure with ethical returns. Leave your contact details below."}
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <X className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Honeypot field for anti-spam */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Project Selector Pills */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-grey-700 mb-1.5">
                      {isBn ? "আগ্রহের প্রকল্প বেছে নিন" : "Interested Project"}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PROJECT_OPTIONS.map((opt) => (
                        <button
                          key={opt.slug}
                          type="button"
                          onClick={() => setProjectSlug(opt.slug)}
                          className={`px-2.5 py-2 rounded-xl text-[11px] font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                            projectSlug === opt.slug
                              ? "bg-green-900 text-white border-green-900 shadow-xs"
                              : "bg-paper hover:bg-ash/70 text-ink border-ink/15"
                          }`}
                        >
                          <span className="truncate">{isBn ? opt.nameBn : opt.nameEn}</span>
                          {projectSlug === opt.slug && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 ml-1" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full Name (Important / Required) */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-grey-700 mb-1">
                      {isBn ? "আপনার নাম" : "Full Name"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-grey-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder={isBn ? "যেমন: ড. রফিকুল ইসলাম" : "e.g. Dr. Rafiqul Islam"}
                        className="w-full pl-9 pr-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number (Important / Required) */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-grey-700 mb-1">
                      {isBn ? "মোবাইল নম্বর" : "Phone Number"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-grey-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder={isBn ? "যেমন: 017XXXXXXXX" : "e.g. 017XXXXXXXX"}
                        className="w-full pl-9 pr-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-grey-500 mt-0.5 block">
                      {isBn ? "আমাদের প্রতিনিধি এই নম্বরে ব্রোশিওর শেয়ার করবেন।" : "Our executive will contact you on this number."}
                    </span>
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-grey-700">
                        {isBn ? "ইমেইল ঠিকানা" : "Email Address"}
                      </label>
                      <span className="text-[10px] text-grey-400 font-medium">
                        {isBn ? "(ঐচ্ছিক)" : "(Optional)"}
                      </span>
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-grey-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="investor@example.com"
                        className="w-full pl-9 pr-3 py-2 bg-paper border border-ink/20 rounded-xl text-xs sm:text-sm focus:border-green-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button & Trust Note */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 sm:py-3 bg-green-900 hover:bg-green-800 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{isBn ? "জমা হচ্ছে..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{isBn ? "বিনিয়োগ তথ্য গ্রহণ করুন" : "Get Investment Brochure"}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-grey-500 text-center">
                      <ShieldCheck className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                      <span>
                        {isBn
                          ? "কোম্পানি আইন ১৯৯৪ ও শরীয়াহ তদারকি পরিষদের নীতিমালায় সুরক্ষিত।"
                          : "Governed under Company Act 1994. 100% confidential."}
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default InvestmentLeadPopup;
