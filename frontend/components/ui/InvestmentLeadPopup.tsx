"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { submitInquiry } from "@/lib/api";
import * as fpixel from "@/lib/fpixel";
import { detectLeadSource } from "@/lib/sourceTracker";
import {
  X,
  CheckCircle2,
  Phone,
  User,
  Mail,
  Building2,
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
  { slug: "kuakata-hotel", nameEn: "Sunset Kuakata Hotel", nameBn: "কুয়াকাটা হোটেল" },
  { slug: "sun-care", nameEn: "Sun Care Hospital", nameBn: "সান কেয়ার হসপিটাল" },
  { slug: "dfi", nameEn: "Dhaka Fantasy Island", nameBn: "ঢাকা ফ্যান্টাসি আইল্যান্ড" },
  { slug: "the-deck", nameEn: "The Deck (Cox's Bazar)", nameBn: "দ্য ডেক (কক্সবাজার)" },
  { slug: "super-combo", nameEn: "Super Combo (4-in-1)", nameBn: "সুপার কম্বো" },
];

export function InvestmentLeadPopup() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  const [isOpen, setIsOpen] = useState(false);

  // Form states - only important fields
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

    // Check if dismissed during current session
    const dismissed = sessionStorage.getItem("sunset_invest_popup_dismissed");
    if (!dismissed) {
      // Auto open when website opens (quick 800ms delay for smooth page transition)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAdmin]);

  if (isAdmin) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("sunset_invest_popup_dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Anti-spam honeypot
    if (honeypot && honeypot.length > 0) {
      handleClose();
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage(
        isBn ? "অনুগ্রহ করে আপনার নাম লিখুন।" : "Please enter your name."
      );
      return;
    }

    if (!bdPhoneRegex.test(cleanPhone)) {
      setErrorMessage(
        isBn
          ? "অনুগ্রহ করে একটি সঠিক মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)।"
          : "Please enter a valid mobile number (e.g. 017XXXXXXXX)."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedProject = PROJECT_OPTIONS.find((p) => p.slug === projectSlug);
      const source = detectLeadSource();
      const res = await submitInquiry({
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        projectSlug,
        message: `[Source: ${source}] [Investor Lead] Interested in investing in ${selectedProject?.nameEn || projectSlug}. Saf-Kabala brochure requested.`,
      });

      if (res.success) {
        setIsSuccess(true);
        fpixel.event("Lead", {
          content_name: selectedProject?.nameEn || projectSlug,
          content_category: "Investment Popup",
        });
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setErrorMessage(res.message || (isBn ? "তথ্য জমা দেওয়া সম্ভব হয়নি।" : "Failed to submit. Please try again."));
      }
    } catch {
      setErrorMessage(
        isBn
          ? "সংযোগ ত্রুটি হয়েছে। অনুগ্রহ করে সরাসরি কল করুন।"
          : "Network error. Please call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Small floating button to reopen if dismissed */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsSuccess(false);
            setErrorMessage("");
          }}
          className="fixed bottom-6 left-6 z-40 bg-white hover:bg-stone-50 text-stone-800 border border-green-900/30 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer text-xs font-semibold"
          title={isBn ? "বিনিয়োগ তথ্য" : "Investment Inquiry"}
        >
          <Building2 className="w-4 h-4 text-green-900" />
          <span>{isBn ? "বিনিয়োগে আগ্রহী?" : "Interested in Investing?"}</span>
        </button>
      )}

      {/* Simple Clean Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top brand accent bar */}
            <div className="h-1 w-full bg-green-900" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              /* Success State */
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-900/10 text-green-900 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {isBn ? "ধন্যবাদ!" : "Thank You!"}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {isBn
                    ? "আপনার তথ্য গৃহীত হয়েছে। আমাদের বিনিয়োগ প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।"
                    : "Your details have been received. Our investment team will contact you shortly."}
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-green-900 hover:bg-green-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    {isBn ? "ঠিক আছে" : "Close"}
                  </button>
                </div>
              </div>
            ) : (
              /* Simple Lead Form */
              <div className="p-6 sm:p-7 space-y-4">
                {/* Clean Simple Header */}
                <div className="pr-6 space-y-1">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    {isBn
                      ? "বিনিয়োগ করতে কি আপনি আগ্রহী?"
                      : "Interested in Investing?"}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500">
                    {isBn
                      ? "প্রকল্পের ব্রোশিওর ও বিস্তারিত তথ্য পেতে আপনার নম্বর প্রদান করুন।"
                      : "Get project brochure & ROI details directly on your phone."}
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Project Choice */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {isBn ? "প্রকল্প" : "Project"}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PROJECT_OPTIONS.map((opt) => (
                        <button
                          key={opt.slug}
                          type="button"
                          onClick={() => setProjectSlug(opt.slug)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                            projectSlug === opt.slug
                              ? "bg-green-900 text-white border-green-900 shadow-xs"
                              : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                          }`}
                        >
                          <span className="truncate block">{isBn ? opt.nameBn : opt.nameEn}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Field (Required) */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {isBn ? "নাম" : "Full Name"}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder={isBn ? "আপনার নাম" : "Your Name"}
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-green-900 focus:ring-1 focus:ring-green-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Field (Required) */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {isBn ? "মোবাইল নম্বর" : "Mobile Number"}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="017XXXXXXXX"
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-green-900 focus:ring-1 focus:ring-green-900 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Email Field (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-stone-700">
                        {isBn ? "ইমেইল" : "Email"}
                      </label>
                      <span className="text-[11px] text-stone-400">
                        {isBn ? "(ঐচ্ছিক)" : "(Optional)"}
                      </span>
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-green-900 focus:ring-1 focus:ring-green-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 bg-green-900 hover:bg-green-600 text-white font-semibold rounded-lg text-xs sm:text-sm transition-all cursor-pointer shadow-sm hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2 active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{isBn ? "পাঠানো হচ্ছে..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{isBn ? "তথ্য পাঠান" : "Submit"}</span>
                        </>
                      )}
                    </button>
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
