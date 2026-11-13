import React from "react";

interface SunArcProps {
  className?: string;
  size?: number;
  color?: string;
}

export function SunArc({ className = "", size = 120, color = "#E5312B" }: SunArcProps) {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Semicircle sun rising above horizon */}
      <path
        d="M 10 60 A 50 50 0 0 1 110 60 Z"
        fill={color}
      />
      {/* Solid radial rays with 1.5px stroke */}
      <line x1="60" y1="5" x2="60" y2="0" stroke={color} strokeWidth="2" />
      <line x1="25" y1="18" x2="21" y2="14" stroke={color} strokeWidth="2" />
      <line x1="95" y1="18" x2="99" y2="14" stroke={color} strokeWidth="2" />
      <line x1="5" y1="45" x2="0" y2="45" stroke={color} strokeWidth="2" />
      <line x1="115" y1="45" x2="120" y2="45" stroke={color} strokeWidth="2" />
    </svg>
  );
}

