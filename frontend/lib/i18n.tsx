"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";

export type Locale = "bn" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  t: <T extends Record<string, any>>(obj: T | undefined | null, fieldPrefix: string) => any;
  formatNumber: (n: number | string) => string;
}

const bnDigits: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (w) => bnDigits[w] || w);
}

export function formatCurrencyBDT(amount: number, locale: Locale): string {
  const formattedEn = amount.toLocaleString("en-IN");
  if (locale === "bn") {
    return `${toBengaliNumber(formattedEn)} ৳`;
  }
  return `BDT ${formattedEn}`;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "bn",
  setLocale: () => {},
  toggleLocale: () => {},
  t: () => "",
  formatNumber: (n) => String(n),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Read from cookie or localStorage
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    if (match && (match[1] === "bn" || match[1] === "en")) {
      setLocaleState(match[1] as Locale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    startTransition(() => {
      setLocaleState(newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (document.documentElement) {
        document.documentElement.lang = newLocale;
      }
    });
  };

  const toggleLocale = () => {
    setLocale(locale === "bn" ? "en" : "bn");
  };

  const t = <T extends Record<string, any>>(obj: T | undefined | null, fieldPrefix: string): any => {
    if (!obj) return "";
    const key = locale === "bn" 
      ? `${fieldPrefix}Bn` 
      : `${fieldPrefix}En`;
    
    // Fallback if missing
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }
    const altKey = locale === "bn" ? `${fieldPrefix}En` : `${fieldPrefix}Bn`;
    return obj[altKey] ?? "";
  };

  const formatNumber = (n: number | string): string => {
    if (locale === "bn") {
      return toBengaliNumber(n);
    }
    return String(n);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t, formatNumber }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

