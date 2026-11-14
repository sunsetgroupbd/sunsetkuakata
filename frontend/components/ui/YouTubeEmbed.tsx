"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
  aspectRatio?: string;
  autoPlayOnClick?: boolean;
}

export function YouTubeEmbed({
  videoId,
  title,
  className = "",
  aspectRatio = "aspect-video",
  autoPlayOnClick = true,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // High-res YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (isPlaying) {
    return (
      <div className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-md border border-ink/10 ${aspectRatio} ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className={`group relative w-full overflow-hidden rounded-2xl bg-black/90 shadow-md border border-ink/10 cursor-pointer ${aspectRatio} ${className}`}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:from-black/70 transition-colors" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-900/95 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-green-800 transition-all duration-300">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-white" />
        </div>
      </div>

      {/* Video title overlay at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
        <p className="font-serif text-xs sm:text-sm font-medium line-clamp-1 drop-shadow-sm">
          {title}
        </p>
      </div>
    </div>
  );
}

