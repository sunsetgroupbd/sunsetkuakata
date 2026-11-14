"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/svg/WhatsAppIcon";

export function FloatingWhatsApp({ phone = "8801325074535" }: { phone?: string }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return (
    <a
      href={`https://wa.me/${cleanPhone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] hover:scale-105 transition-all duration-200"
    >
      <WhatsAppIcon size={30} className="w-7 h-7 text-white" />
    </a>
  );
}


