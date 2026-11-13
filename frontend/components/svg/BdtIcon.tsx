import React from "react";

interface BdtIconProps {
  className?: string;
  size?: number;
}

export function BdtIcon({ className = "w-3.5 h-3.5", size }: BdtIconProps) {
  return (
    <span
      className={`inline-flex items-center justify-center font-serif font-bold leading-none select-none ${className}`}
      style={size ? { width: `${size}px`, height: `${size}px`, fontSize: `${size}px` } : undefined}
      aria-label="BDT ৳"
    >
      ৳
    </span>
  );
}

