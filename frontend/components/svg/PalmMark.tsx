import React from "react";

interface PalmMarkProps {
  className?: string;
  size?: number;
  color?: string;
}

export function PalmMark({ className = "", size = 32, color = "#0F4D2A" }: PalmMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Palm trunk */}
      <path d="M15 30 C15.5 22 17 18 16 12" stroke={color} strokeWidth="1.5" />
      {/* Palm fronds */}
      <path d="M16 12 C13 9 7 9 4 12" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M16 12 C19 9 25 9 28 12" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M16 12 C12 7 9 3 5 4" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M16 12 C20 7 23 3 27 4" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M16 12 C16 6 16 1 16 1" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

