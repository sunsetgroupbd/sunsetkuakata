"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Globe,
  Home,
  Building2,
  PackageCheck,
  Calculator,
  TrendingUp,
  Images,
  Newspaper,
  Users,
  PhoneCall,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const pathname = usePathname();

  // Hide the public brochure website header on the internal Admin Portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const desktopNavItems = [
    { href: "/", labelEn: "Home", labelBn: "হোম" },
    { href: "/projects", labelEn: "Projects", labelBn: "প্রকল্পসমূহ" },
    { href: "/packages", labelEn: "Investment Packages", labelBn: "প্যাকেজসমূহ" },
    { href: "/profit-calculator", labelEn: "Calculator", labelBn: "ক্যালকুলেটর" },
    { href: "/about", labelEn: "Our Story", labelBn: "আমাদের কথা" },
    { href: "/contact", labelEn: "Contact", labelBn: "যোগাযোগ" },
  ];

  const mobileNavItems = [
    { href: "/", labelEn: "Home", labelBn: "হোম", icon: Home },
    { href: "/projects", labelEn: "Projects", labelBn: "প্রকল্পসমূহ", icon: Building2 },
    { href: "/packages", labelEn: "Ownership Packages", labelBn: "মালিকানা প্যাকেজসমূহ", icon: PackageCheck },
    { href: "/profit-calculator", labelEn: "Profit Calculator", labelBn: "মুনাফা ক্যালকুলেটর", icon: Calculator },
    { href: "/source-of-income", labelEn: "Source of Income", labelBn: "আয়ের উৎস ও ব্যবসায়িক মডেল", icon: TrendingUp },
    { href: "/gallery", labelEn: "Photo Gallery", labelBn: "ফটো গ্যালারি", icon: Images },
    { href: "/blogs", labelEn: "News & Insights", labelBn: "খবর ও ব্লগ", icon: Newspaper },
    { href: "/about", labelEn: "Our Story & Leadership", labelBn: "আমাদের কথা ও নেতৃত্ব", icon: Users },
    { href: "/contact", labelEn: "Contact Us", labelBn: "যোগাযোগ", icon: PhoneCall },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[80px] transition-colors duration-200 bg-white ${
          isScrolled ? "border-b border-ink/10" : "border-b border-ink/5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-36 sm:w-44 h-12">
              <Image
                src="/logo.png"
                alt="Sunset Group Logo"
                fill
                sizes="176px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav - Clean centered links matching Image 1 */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium">
            {desktopNavItems.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href.startsWith("/#")
                  ? false
                  : pathname === item.href;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`py-2 whitespace-nowrap transition-colors hover:text-green-900 relative ${
                    isActive ? "text-green-900 font-semibold" : "text-ink/80"
                  }`}
                >
                  {locale === "bn" ? item.labelBn : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-900" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language toggle + Dark Green "Get In Touch" Button */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 px-3 py-1.5 border border-ink/15 hover:border-ink rounded-lg text-xs font-medium text-ink transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-grey-700" />
              <span>{locale === "bn" ? "English" : "বাংলা"}</span>
            </button>

            <Link
              href="/contact"
              className="bg-green-900 text-white border border-green-900 hover:bg-green-600 hover:border-green-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg whitespace-nowrap transition-colors duration-200"
            >
              {locale === "bn" ? "যোগাযোগ করুন" : "Get In Touch"}
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              onClick={toggleLocale}
              className="px-2.5 py-1.5 border border-ink/20 rounded-lg text-xs font-medium text-ink hover:bg-ash transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              {locale === "bn" ? "EN" : "বাংলা"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 border border-ink/20 rounded-lg text-ink hover:bg-ash transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white text-ink flex flex-col overflow-y-auto">
          {/* Header Bar */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-ink/10 shadow-2xs">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <div className="relative w-36 sm:w-40 h-10">
                <Image
                  src="/logo.png"
                  alt="Sunset Kuakata Hotel & Resort"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-ink hover:text-green-900 border border-ink/15 hover:border-ink/40 rounded-lg transition-colors cursor-pointer bg-ash/50"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Navigation Links - All Site Options Visible */}
          <nav className="flex flex-col px-4 py-3 divide-y divide-ink/5">
            {mobileNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-xl flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-green-900/10 text-green-900 font-semibold"
                      : "text-ink/85 hover:text-green-900 hover:bg-ash/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-green-900" : "text-grey-700"}`} />
                    <span className="font-serif text-sm sm:text-base font-medium">
                      {locale === "bn" ? item.labelBn : item.labelEn}
                    </span>
                  </div>
                  <span className={`text-xs ${isActive ? "text-green-900 font-bold" : "text-grey-700/60"}`}>
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="mt-auto p-5 border-t border-ink/10 bg-ash/60 flex flex-col gap-3.5">
            {/* Primary Action Button */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-green-900 hover:bg-green-600 text-white py-3.5 font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
            >
              {locale === "bn" ? "যোগাযোগ করুন" : "Get In Touch"}
            </Link>

            {/* Hotline & Language Switcher */}
            <div className="flex items-center justify-between pt-1 text-xs text-grey-700">
              <a href="tel:+8801325074535" className="hover:text-green-900 transition-colors font-medium">
                Hotline: +8801325074535
              </a>
              <button
                onClick={toggleLocale}
                className="font-semibold text-green-900 hover:underline cursor-pointer"
              >
                {locale === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
