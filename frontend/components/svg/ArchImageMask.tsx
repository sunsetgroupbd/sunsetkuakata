import React from "react";
import Image from "next/image";

interface ArchImageMaskProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ArchImageMask({
  src,
  alt,
  width = 480,
  height = 640,
  className = "",
  priority = false,
}: ArchImageMaskProps) {
  return (
    <div
      className={`relative overflow-hidden border border-ink/10 bg-sand ${className}`}
      style={{
        borderTopLeftRadius: "9999px",
        borderTopRightRadius: "9999px",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
        />
      </div>
      {/* 1px hairline inner rim */}
      <div
        className="pointer-events-none absolute inset-0 border border-ink/15"
        style={{
          borderTopLeftRadius: "9999px",
          borderTopRightRadius: "9999px",
        }}
      />
    </div>
  );
}

