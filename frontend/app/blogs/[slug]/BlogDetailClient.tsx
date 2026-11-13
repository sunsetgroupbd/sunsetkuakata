"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { ArrowLeft, Calendar } from "lucide-react";

interface BlogDetailClientProps {
  blog: BlogPost;
}

export function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  const title = isBn ? blog.titleBn : blog.titleEn;
  const excerpt = isBn ? blog.excerptBn : blog.excerptEn;
  const body = isBn ? blog.bodyBn : blog.bodyEn;

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/blogs"
          className={`inline-flex items-center gap-2 text-xs uppercase text-grey-700 hover:text-green-900 transition-colors ${isBn ? "tracking-normal" : "tracking-wider"}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? "সকল প্রবন্ধে ফিরে যান" : "Back to All Articles"}</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-green-900 font-medium">
            <Calendar className="w-4 h-4" />
            <span>{isBn ? `প্রকাশিত: ${blog.publishedAt}` : `Published ${blog.publishedAt}`}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight font-semibold">
            {title}
          </h1>
        </div>

        <div className="relative aspect-[16/9] w-full border border-ink/10 rounded-2xl bg-sand overflow-hidden shadow-xs">
          <Image
            src={blog.coverImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 840px) 100vw, 840px"
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none space-y-6 pt-6 border-t border-ink/10 text-grey-700 leading-relaxed text-base sm:text-lg">
          <p className="font-medium text-ink">{excerpt}</p>
          <p className="whitespace-pre-line">{body}</p>
        </div>
      </div>
    </div>
  );
}
