import React from "react";

interface TowerMarkProps {
  className?: string;
  size?: number;
  color?: string;
}

export function TowerMark({ className = "", size = 32, color = "#5C6168" }: TowerMarkProps) {
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
      {/* Tower 1 */}
      <rect x="6" y="8" width="8" height="20" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="10" y1="4" x2="10" y2="8" stroke={color} strokeWidth="1.5" />
      <rect x="8" y="12" width="4" height="4" fill={color} />
      <rect x="8" y="19" width="4" height="4" fill={color} />

      {/* Tower 2 (slightly taller / stepped) */}
      <rect x="18" y="5" width="8" height="23" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="22" y1="1" x2="22" y2="5" stroke={color} strokeWidth="1.5" />
      <rect x="20" y="9" width="4" height="4" fill={color} />
      <rect x="20" y="16" width="4" height="4" fill={color} />

      {/* Foundation baseline */}
      <line x1="2" y1="28" x2="30" y2="28" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

