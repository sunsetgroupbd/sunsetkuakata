"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitInquiry } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required (minimum 2 characters)"),
  phone: z
    .string()
    .regex(
      bdPhoneRegex,
      "Please enter a valid Bangladeshi phone number (e.g., 01325074535 or +8801325074535)"
    ),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  projectSlug: z.string().min(1, "Please select a project"),
  packageSlug: z.string().optional(),
  message: z.string().optional(),
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")), // honeypot
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  initialProject?: string;
  initialPackage?: string;
}

export function InquiryForm({ initialProject = "kuakata-hotel", initialPackage = "" }: InquiryFormProps) {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      projectSlug: initialProject,
      packageSlug: initialPackage,
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    // If honeypot is filled, abort silently
    if (data.website && data.website.length > 0) {
      return;
    }

    setSubmitStatus("submitting");
    setFeedbackMessage("");

    try {
      const res = await submitInquiry({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || undefined,
        projectSlug: data.projectSlug,
        packageSlug: data.packageSlug || undefined,
        message: data.message || undefined,
      });

      if (res.success) {
        setSubmitStatus("success");
        setFeedbackMessage(
          res.message ||
            (isBn
              ? "ধন্যবাদ। আপনার অনুসন্ধান সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।"
              : "Thank you. Your inquiry has been received. Our team will contact you shortly.")
        );
        reset();
      } else {
        setSubmitStatus("error");
        setFeedbackMessage(
          res.message ||
            (isBn
              ? "অনুসন্ধান জমা দেওয়া সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন বা সরাসরি আমাদের হটলাইনে কল করুন।"
              : "Failed to submit inquiry. Please try again or call us directly.")
        );
      }
    } catch {
      setSubmitStatus("error");
      setFeedbackMessage(
        isBn
          ? "একটি নেটওয়ার্ক ত্রুটি ঘটেছে। দয়া করে ফোন বা হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করুন।"
          : "A network error occurred. Please contact us via phone or WhatsApp."
      );
    }
  };

  return (
    <div className="border border-ink/10 bg-white p-6 sm:p-10 relative rounded-2xl shadow-xs">
      <h3 className="font-serif text-2xl text-ink mb-6 font-semibold">
        {isBn ? "বিনিয়োগ ও মালিকানা সংক্রান্ত তথ্য ফরম" : "Investment & Ownership Inquiry"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Honeypot field (hidden from real users) */}
        <input
          type="text"
          {...register("website")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-1.5">
            {isBn ? "পূর্ণ নাম" : "Full Name"} <span className="text-red">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            disabled={isSubmitting}
            placeholder={isBn ? "যেমন: মো: তারিকুল ইসলাম" : "e.g. Md. Tariqul Islam"}
            {...register("fullName")}
            className="w-full border border-ink/20 px-3.5 py-2.5 bg-paper text-ink text-sm rounded-xl focus:border-green-900 focus:outline-none disabled:opacity-60"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-red text-xs mt-1" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-1.5">
            {isBn ? "বাংলাদেশি মোবাইল নম্বর" : "Bangladeshi Phone Number"} <span className="text-red">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            disabled={isSubmitting}
            placeholder="01XXXXXXXXX"
            {...register("phone")}
            className="w-full border border-ink/20 px-3.5 py-2.5 bg-paper text-ink text-sm rounded-xl focus:border-green-900 focus:outline-none disabled:opacity-60"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-red text-xs mt-1" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-1.5">
            {isBn ? "ইমেইল ঠিকানা (ঐচ্ছিক)" : "Email Address (Optional)"}
          </label>
          <input
            id="email"
            type="email"
            disabled={isSubmitting}
            placeholder="name@example.com"
            {...register("email")}
            className="w-full border border-ink/20 px-3.5 py-2.5 bg-paper text-ink text-sm rounded-xl focus:border-green-900 focus:outline-none disabled:opacity-60"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red text-xs mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Project Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="projectSlug" className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-1.5">
              {isBn ? "প্রকল্প নির্বাচন করুন" : "Select Project"} <span className="text-red">*</span>
            </label>
            <select
              id="projectSlug"
              disabled={isSubmitting}
              {...register("projectSlug")}
              className="w-full border border-ink/20 px-3 py-2.5 bg-paper text-ink text-sm rounded-xl focus:border-green-900 focus:outline-none disabled:opacity-60 cursor-pointer"
            >
              <option value="kuakata-hotel">
                {isBn ? "সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট" : "Sunset Kuakata Hotel & Resort"}
              </option>
              <option value="sun-care">
                {isBn ? "সান কেয়ার হসপিটাল অ্যান্ড ডায়াগনস্টিক" : "Sun Care Hospital & Diagnostic"}
              </option>
              <option value="dfi">
                {isBn ? "ডিএফআই (ঢাকা ফ্যান্টাসি আইল্যান্ড)" : "DFI (Dhaka Fantasy Island)"}
              </option>
              <option value="mangrove-kuakata">
                {isBn ? "ম্যানগ্রোভ" : "Mangrove"}
              </option>
              <option value="super-combo">
                {isBn ? "সুপার কম্বো ইনভেস্টমেন্ট" : "Super Combo Investment"}
              </option>
              <option value="the-deck">
                {isBn ? "দ্য ডেক (কক্সবাজার - আসন্ন প্রকল্প)" : "The Deck (Cox's Bazar - Upcoming)"}
              </option>
            </select>
            {errors.projectSlug && (
              <p className="text-red text-xs mt-1" role="alert">
                {errors.projectSlug.message}
              </p>
            )}
          </div>

          {/* Package Selector */}
          <div>
            <label htmlFor="packageSlug" className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-1.5">
              {isBn ? "মালিকানা প্যাকেজ (ঐচ্ছিক)" : "Ownership Package (Optional)"}
            </label>
            <select
              id="packageSlug"
              disabled={isSubmitting}
              {...register("packageSlug")}
              className="w-full border border-ink/20 px-3 py-2.5 bg-paper text-ink text-sm rounded-xl focus:border-green-900 focus:outline-none disabled:opacity-60 cursor-pointer"
            >
              <option value="">{isBn ? "কোনটিই নয় / সাধারণ জিজ্ঞাসা" : "None / General Inquiry"}</option>
              <option value="platinum">
                {isBn ? "প্লাটিনাম প্যাকেজ (৩৬,০০,০০০ টাকা)" : "Platinum Package (36,00,000 BDT)"}
              </option>
              <option value="gold">
                {isBn ? "গোল্ড প্যাকেজ (১৮,৫০,০০০ টাকা)" : "Gold Package (18,50,000 BDT)"}
              </option>
              <option value="silver">
                {isBn ? "সিলভার প্যাকেজ (১১,৫০,০০০ টাকা)" : "Silver Package (11,50,000 BDT)"}
              </option>
              <option value="bronze">
                {isBn ? "ব্রোঞ্জ প্যাকেজ (৪,০০,০০০ টাকা)" : "Bronze Package (4,00,000 BDT)"}
              </option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs uppercase tracking-wider text-grey-700 font-medium mb-1.5">
            {isBn ? "আপনার বার্তা বা প্রশ্ন (ঐচ্ছিক)" : "Your Query / Message (Optional)"}
          </label>
          <textarea
            id="message"
            rows={3}
            disabled={isSubmitting}
            placeholder={
              isBn
                ? "আপনার কোনো নির্দিষ্ট প্রশ্ন বা পরামর্শের জন্য পছন্দের সময় লিখুন..."
                : "Describe your query or preferred time for a consultation..."
            }
            {...register("message")}
            className="w-full border border-ink/20 px-3.5 py-2.5 bg-paper text-ink text-sm rounded-xl focus:border-green-900 focus:outline-none disabled:opacity-60"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {isBn ? "জমা দেওয়া হচ্ছে..." : "Submitting Inquiry..."}
              </span>
            ) : (
              isBn ? "তথ্য জমা দিন" : "Submit Official Inquiry"
            )}
          </Button>
        </div>

        {/* Animated Feedback Notification */}
        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-green-900 bg-sand p-4 flex items-start gap-3 rounded-xl"
            >
              <CheckCircle2 className="w-5 h-5 text-green-900 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-ink leading-relaxed">
                <p className="font-semibold text-green-900">
                  {isBn ? "অনুসন্ধান সফলভাবে গৃহীত হয়েছে" : "Inquiry Submitted Successfully"}
                </p>
                <p>{feedbackMessage}</p>
              </div>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-red bg-paper p-4 flex items-start gap-3 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 text-red flex-shrink-0 mt-0.5" />
              <div className="text-xs text-ink leading-relaxed">
                <p className="font-semibold text-red">
                  {isBn ? "জমা দেওয়ার ব্যর্থ হয়েছে" : "Submission Failed"}
                </p>
                <p>{feedbackMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

