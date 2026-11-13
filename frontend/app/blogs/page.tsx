import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/api";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Insights | Sunset Group",
  description:
    "Articles, regulatory insights, and sector news regarding Kuakata tourism, saf-kabala registration, and Shariah-compliant hospitality.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            Insights & Regulatory Context
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            Articles & Updates
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            Verified information concerning regional master plans, legal ownership structures, and ethical hospitality developments.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="border border-ink/10 bg-white flex flex-col justify-between p-6 space-y-6"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden border border-ink/10 bg-sand">
                  <Image
                    src={blog.coverImage}
                    alt={blog.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-grey-700">
                  <Calendar className="w-3.5 h-3.5 text-green-900" />
                  <span>{blog.publishedAt}</span>
                </div>

                <h2 className="font-serif text-xl text-ink hover:text-green-900 transition-colors">
                  <Link href={`/blogs/${blog.slug}`}>{blog.titleEn}</Link>
                </h2>

                <p className="text-xs text-grey-700 line-clamp-3 leading-relaxed">
                  {blog.excerptEn}
                </p>
              </div>

              <div className="pt-4 border-t border-ink/10">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-green-900 hover:text-red transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
