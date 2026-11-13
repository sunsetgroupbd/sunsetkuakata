import React from "react";

interface WaveBandProps {
  className?: string;
  height?: number;
}

export function WaveBand({ className = "", height = 48 }: WaveBandProps) {
  return (
    <svg
      viewBox="0 0 1440 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Layer 1: Dark Blue Strip */}
      <path
        d="M0,24 C320,10 420,38 720,24 C1020,10 1120,38 1440,24 L1440,48 L0,48 Z"
        fill="#12406E"
      />
      {/* Layer 2: Sea Blue Strip */}
      <path
        d="M0,32 C360,20 480,44 720,32 C960,20 1080,44 1440,32 L1440,48 L0,48 Z"
        fill="#2B7BB9"
      />
      {/* Layer 3: Green-900 Accent Stroke */}
      <path
        d="M0,40 C300,34 500,46 720,40 C940,34 1140,46 1440,40"
        stroke="#1B8C4D"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

