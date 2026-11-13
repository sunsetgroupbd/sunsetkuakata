import React from "react";

interface HorizonDividerProps {
  className?: string;
  color?: string;
}

export function HorizonDivider({ className = "", color = "#5C6168" }: HorizonDividerProps) {
  return (
    <div className={`w-full flex items-center justify-center my-8 ${className}`}>
      <div className="flex-1 h-[1px] bg-grey-700/30" />
      <svg
        width="36"
        height="18"
        viewBox="0 0 36 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-3 text-grey-700 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M 6 18 A 12 12 0 0 1 30 18 Z" fill="#E5312B" />
        <line x1="0" y1="18" x2="36" y2="18" stroke={color} strokeWidth="1.5" />
      </svg>
      <div className="flex-1 h-[1px] bg-grey-700/30" />
    </div>
  );
}

