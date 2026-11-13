"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogsClientProps {
  blogs: BlogPost[];
}

export function BlogsClient({ blogs }: BlogsClientProps) {
  const { locale, t } = useLanguage();
  const isBn = locale === "bn";

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className={`text-xs uppercase font-medium text-grey-700 block ${isBn ? "tracking-normal" : "tracking-[0.18em]"}`}>
            {isBn ? "পর্যটন ও আইনি বিশ্লেষণ" : "Insights & Regulatory Context"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold">
            {isBn ? "প্রবন্ধ ও সমসাময়িক তথ্য" : "Articles & Updates"}
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            {isBn
              ? "আঞ্চলিক মাস্টার প্ল্যান, আইনগত মালিকানা কাঠামো এবং নৈতিক আতিথেয়তার উন্নয়ন সংক্রান্ত তথ্য।"
              : "Verified information concerning regional master plans, legal ownership structures, and ethical hospitality developments."}
          </p>
        </div>

        {/* Blogs Grid: 2 columns on mobile, 3 columns on tablet/desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="border border-ink/10 bg-white rounded-xl sm:rounded-2xl flex flex-col justify-between p-2.5 sm:p-6 space-y-3 sm:space-y-6 shadow-2xs sm:shadow-xs hover:border-green-900/40 hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-2.5 sm:space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg sm:rounded-xl border border-ink/10 bg-sand">
                  <Image
                    src={blog.coverImage}
                    alt={t(blog, "title")}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-grey-700">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-900 flex-shrink-0" />
                  <span>{blog.publishedAt}</span>
                </div>

                <h2 className="font-serif text-xs sm:text-lg md:text-xl text-ink hover:text-green-900 transition-colors font-semibold leading-snug line-clamp-2">
                  <Link href={`/blogs/${blog.slug}`}>{t(blog, "title")}</Link>
                </h2>

                <p className="text-[11px] sm:text-sm text-grey-700 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {t(blog, "excerpt")}
                </p>
              </div>

              <div className="pt-2 sm:pt-4 border-t border-ink/10">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-green-900 hover:text-ink transition-colors"
                >
                  <span>{isBn ? "বিস্তারিত পড়ুন" : "Read Article"}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
