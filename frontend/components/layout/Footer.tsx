"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/svg/WhatsAppIcon";
import { FacebookIcon, InstagramIcon, YouTubeIcon, LinkedInIcon } from "@/components/svg/SocialIcons";
import { useLanguage } from "@/lib/i18n";
import { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const { locale } = useLanguage();

  return (
    <footer className="bg-white text-ink border-t border-ink/10 mt-auto">
      {/* Upper Footer matching Image 1 */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="relative w-44 h-12">
              <Image
                src="/logo.png"
                alt="Sunset Group Logo"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs sm:text-sm text-grey-700 leading-relaxed max-w-sm">
              {locale === "bn"
                ? "সানসেট কুয়াকাটা হোটেল এন্ড রিসোর্ট লিমিটেড “কোম্পানি আইন ১৯৯৪” দ্বারা নিবন্ধিত ও পরিচালিত একটি প্রাইভেট লিমিটেড কোম্পানি। বাংলাদেশে ট্যুরিজমের অন্যতম প্রাণ কেন্দ্র সাগরকন্যা কুয়াকাটায় আন্তর্জাতিক মানের হোটেল এবং রিসোর্টের স্বপ্ন নিয়ে আমাদের পথচলা।"
                : "Sunset Kuakata Hotel & Resort Limited is a private limited company registered and governed under the Company Act 1994. Our journey begins with the vision of developing international standard hotels and resorts in Kuakata, the daughter of the sea and the vibrant heart of Bangladesh tourism."}
            </p>
          </div>

          {/* Col 2: Contact Us (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-base font-semibold text-ink">
              {locale === "bn" ? "যোগাযোগ" : "Contact Us"}
            </h3>
            <ul className="space-y-3 text-xs text-grey-700">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-green-900 flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-green-900 transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon size={15} className="w-3.5 h-3.5 text-green-900 flex-shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-900 transition-colors"
                >
                  {settings.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-green-900 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-green-900 transition-colors truncate">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base font-semibold text-ink">
              {locale === "bn" ? "কার্যালয়" : "Office"}
            </h3>
            <div className="space-y-3 text-xs text-grey-700 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-ink/5">
                <Clock className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
                <span>{settings.officeHours}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Follow Us (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base font-semibold text-ink">
              {locale === "bn" ? "সামাজিক মাধ্যম" : "Follow Us"}
            </h3>
            <ul className="space-y-2.5 text-xs text-grey-700">
              {settings.socials.facebook && (
                <li>
                  <a
                    href={settings.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 hover:text-green-900 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-sand/70 flex items-center justify-center text-green-900 group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-200">
                      <FacebookIcon size={13} />
                    </span>
                    <span>facebook.com/sunsetkuakatahotel</span>
                  </a>
                </li>
              )}
              {settings.socials.instagram && (
                <li>
                  <a
                    href={settings.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 hover:text-green-900 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-sand/70 flex items-center justify-center text-green-900 group-hover:bg-[#E4405F] group-hover:text-white transition-colors duration-200">
                      <InstagramIcon size={13} />
                    </span>
                    <span>instagram.com/sunsetkuakatahotel</span>
                  </a>
                </li>
              )}
              {settings.socials.youtube && (
                <li>
                  <a
                    href={settings.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 hover:text-green-900 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-sand/70 flex items-center justify-center text-green-900 group-hover:bg-[#FF0000] group-hover:text-white transition-colors duration-200">
                      <YouTubeIcon size={13} />
                    </span>
                    <span>youtube.com/@sunsetkuakatahotel</span>
                  </a>
                </li>
              )}
              {settings.socials.linkedin && (
                <li>
                  <a
                    href={settings.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 hover:text-green-900 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-sand/70 flex items-center justify-center text-green-900 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors duration-200">
                      <LinkedInIcon size={13} />
                    </span>
                    <span>bd.linkedin.com/in/sunsetkuakatahotel</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching Image 1 */}
      <div className="border-t border-ink/10 py-5 bg-ash text-xs text-grey-700">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>&copy; 2026 Sunset Group. All rights reserved.</div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-green-900 transition-colors">
              {locale === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-green-900 transition-colors">
              {locale === "bn" ? "শর্তাবলী" : "Terms & Conditions"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
