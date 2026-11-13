"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const pathname = usePathname();

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

  const navItems = [
    { href: "/", labelEn: "Home", labelBn: "হোম" },
    { href: "/projects", labelEn: "Projects", labelBn: "প্রকল্পসমূহ" },
    { href: "/packages", labelEn: "Investment Packages", labelBn: "প্যাকেজসমূহ" },
    { href: "/about", labelEn: "Our Story", labelBn: "আমাদের কথা" },
    { href: "/contact", labelEn: "Contact", labelBn: "যোগাযোগ" },
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
            {navItems.map((item, idx) => {
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
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleLocale}
              className="px-2 py-1 border border-ink/20 text-xs font-medium text-ink"
            >
              {locale === "bn" ? "EN" : "বাংলা"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 border border-ink/20 text-ink hover:bg-ash"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-green-900 text-paper flex flex-col p-6 sm:p-8 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-paper/20">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-serif text-xl text-paper tracking-wider">SUNSET GROUP</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-paper hover:text-sand border border-paper/30"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-5 py-8">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-paper hover:text-sand"
              >
                {locale === "bn" ? item.labelBn : item.labelEn}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-paper/20 flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-sand text-ink py-3 border border-sand font-semibold uppercase tracking-wider text-sm rounded-xl"
            >
              {locale === "bn" ? "যোগাযোগ করুন" : "Get In Touch"}
            </Link>
            <div className="flex items-center justify-between text-xs text-paper/70">
              <span>Hotline: +8801325074535</span>
              <button onClick={toggleLocale} className="underline">
                {locale === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
