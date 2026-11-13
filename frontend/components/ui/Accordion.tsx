"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`divide-y divide-ink/10 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4 first:pt-0 last:pb-0">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left py-2 font-serif text-base sm:text-lg md:text-xl text-ink hover:text-green-900 transition-colors cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="pr-4 font-semibold">{item.title}</span>
              <div className="w-8 h-8 rounded-full bg-ash border border-ink/10 flex items-center justify-center flex-shrink-0 group-hover:border-green-900/40 transition-colors">
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 text-grey-700 ${
                    isOpen ? "rotate-180 text-green-900" : ""
                  }`}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-2 pb-4 text-grey-700 text-sm md:text-base leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

