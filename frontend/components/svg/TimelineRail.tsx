"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineRailProps {
  itemsCount: number;
  className?: string;
}

export function TimelineRail({ itemsCount, className = "" }: TimelineRailProps) {
  return (
    <div className={`relative flex flex-col items-center ${className}`} aria-hidden="true">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-[1.5px] bg-green-900 absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
      />
      {Array.from({ length: itemsCount }).map((_, idx) => (
        <div
          key={idx}
          className="w-3 h-3 border border-green-900 bg-paper my-auto z-10 my-16 first:mt-2 last:mb-2"
        />
      ))}
    </div>
  );
}

